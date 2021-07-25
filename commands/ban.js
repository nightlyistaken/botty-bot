module.exports = {
  name: "ban",
  description: "this is a ban command to kick users!",
  execute(message, args) {
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    let reason = message.content.split(" ")[2];

    if (
      member.hasPermission("ADMINISTRATOR") ||
      member.hasPermission("BAN_MEMBERS")
    ) {
      const target = mentions.users.first();
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id);
        targetMember.ban();
        embed
          .setTitle("A User has been Banned from this server.")
          .setDescription(`${tag} banned ${target} for ${reason}`)
          .setThumbnail("https://avatars.githubusercontent.com/u/62501544?v=4")
          .setAuthor(message.author.username)
          .setTimestamp();

        message.channel.send(embed);
      } else {
        message.channel.send(`Who do you want to ban ${tag} ? `);
      }
    } else {
      message.channel.send(`${tag} You dont have the permissions to do that`);
    }
  },
};
