module.exports = {
  name: "botty",
  description: "send a new msg.",
  execute(message, args) {
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed();
    const client = new Discord.Client();
    const config = require("../config.json");

    embed.setTitle("Hello!");
    embed.setDescription(`My Prefix is ${config.prefix.p} `);
    embed.addFields({
      name: `Yes? if you need help do ${config.prefix.p}help`,
      value: "visit https://b0t.divy.work",
    });

    message.channel.send(embed);
  },
};
