const Discord = require("discord.js");
module.exports = {
  name: "avatar",
  description: "Get the avatar URL of the tagged user(s), or your own avatar.",
  aliases: ["av", "a"],
  usage: "[commandname]",
  cooldown: 10,
  execute(message) {
    if (!message.mentions.users.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(message.author.username)
        .setColor(0x00ffff)
        .setImage(message.author.displayAvatarURL({ format: "png" }));
      return message.channel.send(embed);
    }

    const mention = message.mentions.members.first();
    const Embed = new Discord.MessageEmbed()
      .setTitle(message.mentions.users.first().username)
      .setColor(0x00ffff)
      .setImage(mention.user.displayAvatarURL({ format: "png" }));
    return message.channel.send(Embed);
  },
};
