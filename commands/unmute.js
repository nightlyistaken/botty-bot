module.exports = {
  name: "unmute",
  description: "this is a unmute command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const { member, mentions } = message;
    const target = message.mentions.users.first();
    const embed = new Discord.MessageEmbed();
    const tag = `<@${member.id}>`;

    if (target) {
      let mainRole = message.guild.roles.cache.find(
        (role) => role.name === "member"
      );
      let muteRole = message.guild.roles.cache.find(
        (role) => role.name === "muted"
      );
      let memberTarget = message.guild.members.cache.get(target.id);

      memberTarget.roles.remove(muteRole.id);
      memberTarget.roles.add(mainRole.id);
      embed
        .setTitle("Unmuted")
        .setDescription(`${tag}, You have unmuted <@${memberTarget.user.id}>`);

      message.channel.send(embed);
    } else {
      message.channel.send(`${tag} , Can't find that member in this guild`);
    }
  },
};
