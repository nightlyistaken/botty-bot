module.exports = {
  name: "help-moderation",
  description: "this is a help mod.",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const prefix = "$";

    embed
      .setTitle("Help Command for Mods")
      .setColor("#848285")
      .setDescription(`Hey! ${tag} `)
      .addFields(
        {
          name: `${prefix}mute [time] , ${prefix}unmute`,
          value: "Mute or unmute user.",
          inline: true,
        },
        {
          name: `${prefix}kick [reason]`,
          value: "Command to kick users",
          inline: true,
        },
        {
          name: `${prefix}clear`,
          value: "Clears the channel you are present in.",
          inline: true,
        },
        {
          name: `${prefix}ban [reason]`,
          value: "Command to ban users",
          inline: true,
        }
      );
    message.channel.send(embed);
  },
};
