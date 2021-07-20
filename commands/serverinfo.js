module.exports = {
  name: "serverinfo",
  description: "this is a server info command to see info!",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;

    embed
      .setTitle("Server Info")
      .setColor("#a772c4")
      .setDescription(` ${tag} Here is the server info :`)
      .addFields(
        {
          name: "Member Count",
          value: `${message.guild.memberCount}`,
        },
        {
          name: "Server Name:",
          value: `${message.guild.name}`,
        }
      );

    message.channel.send(embed);
  },
};
