module.exports = {
  name: "kick",
  description: "this is a kick command to kick users!",
  execute(message, args) {
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    let reason = message.content.split(" ")[2];
    let moderator = message.member.roles.cache.find(
      (r) => r.name === "Moderators"
    );
    let admin = message.member.roles.cache.find((r) => r.name === "Admin");
    if (moderator || admin) {
      const target = mentions.users.first();
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id);

        targetMember
          .send(
            `You have been kicked from the server ${targetMember} for ${reason}`
          )
          .catch(function () {
            console.log("Promise Rejected");
          });

        embed
          .setThumbnail("https://avatars.githubusercontent.com/u/62501544?v=4")
          .setAuthor(message.author.username)
          .setTimestamp()
          .setTitle("A User has been kicked from this server.")
          .setDescription(`${tag} Kicked ${targetMember} for ${reason}`);

        message.channel.send(embed).then(() => targetMember.kick(reason));
      } else {
        message.channel.send(`Who do you want to kick ${tag} ?`);
      }
    } else {
      message.channel.send(`${tag} You do not have the permission to do that.`);
    }
  },
};
