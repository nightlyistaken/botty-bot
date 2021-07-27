module.exports = {
  name: "ping",
  description: "this is a ping command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed();

    embed
      .setTitle("Pong! 🧦 ")
      .setColor("#37E42d")
      .setDescription(`Your ping: ${Date.now() - message.createdTimestamp} ms`);
    message.reply(embed);
  },
};
