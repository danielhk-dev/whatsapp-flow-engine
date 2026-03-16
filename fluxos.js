const { acao } = require("./utils");

const fluxos = {
  menuProblemas: {
    mensagem: "Qual é o tipo de problema?\n\n1- Equipamento\n2- Conectividade\n3- Dispositivo\n4- Sistema de registro\n5- Sistema automático",
    opcoes: {
      "1": "fluxoEquipamento",
      "2": "fluxoConectividade",
      "3": "fluxoDispositivo",
      "4": "fluxoSistemaRegistro",
      "5": "fluxoSistemaAutomatico"
    }
  },

  // FLUXO - EQUIPAMENTO
  fluxoEquipamento: {
    mensagem: "O que está acontecendo com o equipamento?\n\n1- Não liga\n2- Tela não liga\n3- Está lento\n4- Sem conexão",
    opcoes: {
      "1": "fluxoEquipamentoNaoLiga",
      "2": "fluxoTelaNaoLiga",
      "3": "fluxoEquipamentoLento",
      "4": "fluxoEquipamentoSemConexao"
    }
  },

  fluxoEquipamentoNaoLiga: {
    perguntas: [
      {
        acao: acao(`Vamos verificar algumas coisas:

* O equipamento está conectado à energia?
* A tomada está funcionando?
* Existe algum filtro de energia ligado?
* Existe algum botão traseiro ou chave de energia ativada?

Após verificar tudo, digite 1 para continuar.`),
        proximo: 1
      },
      {
        acao: acao(`Agora, desligue o equipamento da energia por 30 segundos e ligue novamente.

Digite 1 quando fizer isso.`),
        proximo: 2
      },
      {
        pergunta: "Após religar, o equipamento voltou a funcionar?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoTelaNaoLiga: {
    perguntas: [
      {
        acao: acao(`Vamos verificar o dispositivo de exibição:

* Está conectado à energia?
* Algum indicador luminoso acende?
* Os cabos de conexão estão bem conectados?
* Testou em outra tomada?
* Tentou segurar o botão de energia por alguns segundos?

Digite 1 após verificar tudo.`),
        proximo: 1
      },
      {
        pergunta: "Após as verificações, o dispositivo funcionou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoEquipamentoLento: {
    perguntas: [
      {
        acao: acao(`Recomendamos:

* Reiniciar o equipamento
* Fechar aplicações não utilizadas
* Verificar espaço disponível

Digite 1 após tentar essas soluções.`),
        proximo: 1
      },
      {
        pergunta: "O equipamento apresentou melhora no desempenho?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoEquipamentoSemConexao: {
    mensagem: "Este problema será direcionado para o fluxo de conectividade.\n\nRedirecionando...",
    redirecionar: "fluxoConectividade"
  },

  // FLUXO - CONECTIVIDADE
  fluxoConectividade: {
    mensagem: "O problema afeta todo o ambiente?\n\n1- Sim\n2- Não (apenas um equipamento)",
    opcoes: {
      "1": "fluxoConectividadeGeral",
      "2": "fluxoConectividadeLocal"
    }
  },

  fluxoConectividadeGeral: {
    perguntas: [
      {
        acao: acao(`Verifique:

* O equipamento de rede está ligado?
* Existem indicadores de erro?

Desligue o equipamento da energia por 1 minuto e ligue novamente.
Aguarde alguns minutos após ligar.

Digite 1 quando fizer isso.`),
        proximo: 1
      },
      {
        pergunta: "Após aguardar, a conexão voltou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoConectividadeLocal: {
    perguntas: [
      {
        acao: acao(`Verifique:

* A conexão sem fio está ativada?
* Reinicie o equipamento
* Aproxime-se do ponto de acesso

Digite 1 após tentar essas soluções.`),
        proximo: 1
      },
      {
        pergunta: "A conexão funcionou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  // FLUXO - DISPOSITIVO
  fluxoDispositivo: {
    mensagem: "Qual o problema com o dispositivo?\n\n1- Não executa a função\n2- Obstrução no mecanismo\n3- Não liga",
    opcoes: {
      "1": "fluxoDispositivoNaoFunciona",
      "2": "fluxoDispositivoObstrucao",
      "3": "fluxoDispositivoNaoLiga"
    }
  },

  fluxoDispositivoNaoFunciona: {
    perguntas: [
      {
        acao: acao(`Verifique:

* O dispositivo está ligado?
* Existem recursos disponíveis para funcionamento?
* Aparece alguma mensagem de erro?

Digite 1 após verificar.`),
        proximo: 1
      },
      {
        pergunta: "Funcionou após a verificação?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoDispositivoObstrucao: {
    perguntas: [
      {
        acao: acao(`⚠️ ATENÇÃO:

* Desligue o dispositivo
* Abra a tampa com cuidado
* Remova qualquer objeto preso com delicadeza
* Não utilize força excessiva

Digite 1 quando terminar.`),
        proximo: 1
      },
      {
        pergunta: "Conseguiu resolver o problema com facilidade?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "fluxoTesteDispositivo",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoTesteDispositivo: {
    perguntas: [
      {
        pergunta: "Realize um teste de funcionamento.\n\nFuncionou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoDispositivoNaoLiga: {
    perguntas: [
      {
        acao: acao(`Verifique:

* Está conectado à energia?
* A tomada está funcionando?
* Existe algum filtro de energia ligado?

Digite 1 após verificar.`),
        proximo: 1
      },
      {
        pergunta: "Funcionou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  // FLUXO - SISTEMA DE REGISTRO
  fluxoSistemaRegistro: {
    mensagem: "Qual o problema com o sistema?\n\n1- Não liga\n2- Não reconhece entrada\n3- Horário incorreto",
    opcoes: {
      "1": "fluxoSistemaNaoLiga",
      "2": "fluxoSistemaNaoReconhece",
      "3": "fluxoSistemaHorario"
    }
  },

  fluxoSistemaNaoLiga: {
    perguntas: [
      {
        acao: acao(`Verifique:

* O equipamento está conectado à energia?
* Testou em outra tomada?
* Houve queda de energia recente?

Digite 1 após verificar.`),
        proximo: 1
      },
      {
        pergunta: "Funcionou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoSistemaNaoReconhece: {
    perguntas: [
      {
        acao: acao(`Verifique:

* Limpe o sensor ou área de leitura
* O ambiente está bem iluminado?
* Posicione corretamente o item de identificação
* Reinicie o equipamento

Digite 1 após tentar.`),
        proximo: 1
      },
      {
        pergunta: "Funcionou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoSistemaHorario: {
    perguntas: [
      {
        acao: acao(`Procedimentos:

* Reinicie o equipamento
* Verifique se existe conexão com a rede

Digite 1 após reiniciar.`),
        proximo: 1
      },
      {
        pergunta: "O horário normalizou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  // FLUXO - SISTEMA AUTOMÁTICO
  fluxoSistemaAutomatico: {
    mensagem: "Qual o problema com o sistema automático?\n\n1- Não executa\n2- Executa em horário incorreto",
    opcoes: {
      "1": "fluxoSistemaNaoExecuta",
      "2": "fluxoSistemaHorarioIncorreto"
    }
  },

  fluxoSistemaNaoExecuta: {
    perguntas: [
      {
        acao: acao(`Verifique:

* Houve queda de energia?
* O sistema está ligado?
* Reinicie o equipamento

Digite 1 após verificar.`),
        proximo: 1
      },
      {
        pergunta: "Funcionou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  },

  fluxoSistemaHorarioIncorreto: {
    perguntas: [
      {
        acao: acao(`Verifique:

* Se houve queda de energia
* Se o horário do sistema está correto

Digite 1 após verificar.`),
        proximo: 1
      },
      {
        pergunta: "O funcionamento normalizou?\n\n1- Sim\n2- Não",
        opcoes: {
          "1": "encerrar",
          "2": "abrirChamado"
        }
      }
    ]
  }
};

module.exports = fluxos;

