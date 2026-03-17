const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const fluxos = require("./fluxos");
const { typing } = require("./utils");
const { userState, getUserState, resetUserState, tentativasInvalidas } = require("./states");

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",
    ],
  },
});

client.on("qr", (qr) => {
  console.log("📲 Escaneie o QR Code abaixo:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ WhatsApp conectado.");
});

client.on("disconnected", (reason) => {
  console.log("⚠️ Desconectado:", reason);
});

client.initialize();

//função para tratamento de mensagens inválidas

function incrementarTentativa(from) {
  const estado = getUserState(from);

  if (!estado.tentativasInvalidas) {
    estado.tentativasInvalidas = 0;
  }

  estado.tentativasInvalidas++;

  return estado.tentativasInvalidas;
}

// ínicio do motor

async function processarFluxo(from, chat, fluxoId, perguntaIndex = 0) {

  const fluxo = fluxos[fluxoId];

  if (!fluxo) {
    console.error("Fluxo não encontrado:", fluxoId);
    return;
  }

  // MENU COM OPÇÕES
  if (fluxo.mensagem && fluxo.opcoes) {

    userState[from] = {
      fluxoAtual: fluxoId,
      aguardandoOpcao: true,
      opcoes: fluxo.opcoes
    };

    await typing(chat);
    await client.sendMessage(from, fluxo.mensagem);
    return;
  }

  // PERGUNTAS SEQUENCIAIS
  if (fluxo.perguntas) {

    const pergunta = fluxo.perguntas[perguntaIndex];

    if (!pergunta) return;

    userState[from] = {
      fluxoAtual: fluxoId,
      perguntaIndex: perguntaIndex,
      totalPerguntas: fluxo.perguntas.length,
      aguardandoResposta: true,
      opcoes: pergunta.opcoes
    };

    if (pergunta.pergunta) {
      await typing(chat);
      await client.sendMessage(from, pergunta.pergunta);
    }

    if (pergunta.acao) {
      await pergunta.acao(from, chat, client);
    }
  }

  // REDIRECIONAMENTO
  if (fluxo.redirecionar) {
    await processarFluxo(from, chat, fluxo.redirecionar);
  }

}


// ========================
// AÇÕES FINAIS
// ========================

async function encerrarAtendimento(from, chat) {

  await typing(chat);

  await client.sendMessage(
    from,
    "✅ Atendimento encerrado.\n\nDigite *menu* para iniciar novamente."
  );

  resetUserState(from);
}



// HANDLER PRINCIPAL


client.on("message", async (msg) => {

  const from = msg.from;
  if (!from || from.endsWith("@g.us")) return;

    console.log("mensagem de:", from)

  if(from === "status@broadcast" ) return;

  const chat = await msg.getChat();
  if (chat.isGroup) return;

  const texto = msg.body ? msg.body.trim() : "";

  const estado = getUserState(from);

  try {

    // ========================
    // COMANDO MENU
    // ========================

    const gatilhosMenu = [
      "menu",
      "oi",
      "ola",
      "olá",
      "bom dia",
      "boa tarde",
      "boa noite",
      "ajuda"
    ];

    const textoLower = texto.toLowerCase();

    if (gatilhosMenu.some(g => textoLower.includes(g))){
       resetUserState(from);

      await typing(chat);

      await client.sendMessage(
        from,
`exemplo de mensagem: bla bla bla`
      );

      const estado = getUserState(from);
      estado.step = 0;

     

      return;
    }

    const estado = getUserState(from);

    // FLUXO ATIVO
    

    if (estado.fluxoAtual && estado.aguardandoResposta) {

      const fluxo = fluxos[estado.fluxoAtual];
      const perguntaAtual = fluxo.perguntas[estado.perguntaIndex];

      if (perguntaAtual.proximo !== undefined){

        if (texto === "1"){
          await processarFluxo(
            from,
            chat,
            estado.fluxoAtual,
            estado.perguntaIndex + 1
          );
          return;
        }
      }

      if (perguntaAtual.opcoes) {

        const destino = perguntaAtual.opcoes[texto];

        if (destino === "encerrar") {
          await encerrarAtendimento(from, chat);
          return;
        }

        if (destino) {

          if (estado.perguntaIndex + 1 < estado.totalPerguntas) {

            await processarFluxo(
              from,
              chat,
              estado.fluxoAtual,
              estado.perguntaIndex + 1
            );

          } else if (fluxos[destino]) {

            await processarFluxo(from, chat, destino);

          }

          return;
        }
      }
    }


    
    // MENU DE OPÇÕES
    
    if (estado.aguardandoOpcao && estado.opcoes) {

      const proximoFluxo = estado.opcoes[texto];

      if (proximoFluxo) {
        await processarFluxo(from, chat, proximoFluxo);
        return;
      }
    }


    
    // MENU INICIAL
    

    if (estado.step === 0) {

      if (texto === "1" || texto === "2" || texto === "3") {

        userState[from].step = 1;

        await processarFluxo(from, chat, "menuProblemas");

        return;
      }

const tentativas = incrementarTentativa(from);

if (tentativas >= 3) {
  await client.sendMessage(
    from,
    "⚠️ Não consegui entender.\nDigite uma opção válida"
  );

  resetUserState(from);
}
      
    }

    
  } catch (error) {

    console.error("❌ Erro:", error);

  }

});

