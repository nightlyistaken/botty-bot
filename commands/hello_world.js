module.exports = {
  name: "hello-world",
  description: "hellow world command",
  execute(message, args) {
    message.channel.send("hello  👋   !");
  },
};
