module.exports = {
  name: "help-all",
  description: "this is a  help-all  command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const config = require("../config.json");

    embed
      .setTitle("Help Command for all")
      .setColor("#848285")
      .setDescription(`Hey! ${tag} My Prefix is ${config.prefix.p} `)
      .addFields(
        {
          name: `${config.prefix.p}ping`,
          value: "Tells your ping is ms.",
          inline: true,
        },
        {
          name: `${config.prefix.p}serverinfo`,
          value: "Tells you the server information.",
          inline: true,
        },
        {
          name: `${config.prefix.p}help`,
          value: "The command is for help",
          inline: false,
        },
        {
          name: `${config.prefix.p}botty`,
          value: "The bot info.",
          inline: true,
        },{
          name: `${config.prefix.p}author`,
          value: "Gives you the info about my creator",
          inline: true,
        },{
          name: `${config.prefix.p}hello-world`,
          value: "Obvious command",
          inline: false,
        }, {
          name: `${config.prefix.p}t (thanks)`,
          value: "Thank someone [reason to thank]",
          inline: true,
        }, {
          name: `${config.prefix.p}mcserver`,
          value: "Tells info about `hypixel.net`",
          inline: true,
        },
      );
    message.channel.send(embed);
  },
};
