module.exports = {
  name: "todo_author",
  description: "todo cmd",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const config = require("../config.json");

    embed.setTitle("Todo").setDescription("Author todos").addFields(
      {
        name: "Add `Every command help` *AKA* `$___ info` command",
        value: "Pending",
      },
      { name: "Add INFO", value: "Pending" }
    );

    message.channel.send(embed);
  },
};
