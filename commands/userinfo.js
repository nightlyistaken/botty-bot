module.exports = {
  name: "userinfo",
  description: "myinfo cmd!",
  execute(message, args) {
    const Discord = require("discord.js");
    const { guild, channel } = message;
    const user = message.mentions.users.first() || message.member.user;
    const member = guild.members.cache.get(user.id);
    const { MessageEmbed } = require("discord.js");
    const embed = new MessageEmbed()
      .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
      .setColor("#b34h6d")
      .addFields(
        {
          name: "Username and tag",
          value: user.tag,
        },
        {
          name: "Is the user bot",
          value: user.bot,
        },
        {
          name: "Nickname of the user",
          value: member.nickname || "No nickname set",
        },
        {
          name: "User Joined this Server at",
          value: new Date(member.joinedTimestamp).toLocaleDateString(),
        },
        {
          name: "User Joined Discord at",
          value: new Date(user.createdTimestamp).toLocaleDateString(),
        },
        {
          name: "Number of roles user has",
          value: member.roles.cache.size - 1,
        }
      );
    embed.setTimestamp();
    channel.send(embed);
  },
};
