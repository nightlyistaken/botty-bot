module.exports = {
  name: "thanks",
  description: "this is a thanks command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;

    embed
      .setTitle("You're most welcome!")
      .setDescription(`Welcome ${tag} homie 😊`)
      .setColor("#FFFFFF");

    message.channel.send(embed);
  },
};
