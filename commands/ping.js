module.exports = {
  name: "ping",
  description: "this is a ping command!",
  execute(message, args) {
    message.reply(
      `Pong ! Your ping: ${Date.now() - message.createdTimestamp} ms `
    );
  },
};
