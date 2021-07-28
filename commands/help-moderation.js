module.exports = {
  name: "help-moderation",
  description: "this is a help mod.",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const config = require("../config.json");
    if (
      member.hasPermission("ADMINISTRATOR") ||
      message.member.roles.cache.find((r) => r.name === "Moderators")
    ) {
      embed
        .setTitle("Help Command for Mods")
        .setColor("#848285")
        .setDescription(`Hey! ${tag} My prefix is ${config.prefix.p} `)
        .addFields(
          {
            name: `${config.prefix.p}mute [time] , ${config.prefix.p}unmute`,
            value: "Mute or unmute user.",
            inline: true,
          },
          {
            name: `${config.prefix.p}kick [reason]`,
            value: "Command to kick users",
            inline: true,
          },
          {
            name: `${config.prefix.p}clear`,
            value: "Clears the channel you are present in.",
            inline: false,
          },
          {
            name: `${config.prefix.p}ban [reason]`,
            value: "Command to ban users",
            inline: true,
          }
        );
      message.channel.send(embed);
    }
  },
};
