module.exports = {
  name: "help-all",
  description: "this is a  help-all  command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const prefix = "$";

    embed
      .setTitle("Help Command for all")
      .setColor("#848285")
      .setDescription(`Hey! ${tag} `)
      .addFields(
        {
          name: `${prefix}ping`,
          value: "Tells your ping is ms.",
          inline: true,
        },
        {
          name: `${prefix}serverinfo`,
          value: "Tells you the server information.",
          inline: true,
        },
        {
          name: `${prefix}help`,
          value: "the command if you need help",
          inline: true,
        },
        {
          name: `${prefix}botty`,
          value: "The bot info.",
          inline: true,
        }
      );
    message.channel.send(embed);
  },
};
