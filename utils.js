const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const typing = async (chat) => {
      await delay(2000);
      await chat.sendStateTyping();
      await delay(2000);
    };

    const acao = (mensagem) => {
  return async (from, chat, client) => {
    await typing(chat);
    await client.sendMessage(from, mensagem);
  };
};
module.exports = {
  typing,
  acao
};