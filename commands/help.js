module.exports = {
  name: "help",
  description: "this is a ping command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const config = require("../config.json");

    embed
      .setTitle("Commands for the bot")
      .setColor("#848285")
      .setURL("https://bit.ly/3irL6AH")
      .setDescription(`Hello ${tag} My prefix is ${config.prefix.p}`)
      .addFields(
        {
          name: `${config.prefix.p}help-moderation`,
          value: "This command is for mods.",
          inline: true,
        },
        {
          name: `${config.prefix.p}help-all`,
          value: "This Command is for everyone.",
          inline: true,
        }
      );
    message.channel.send(embed);
  },
};
