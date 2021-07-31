module.exports = {
  name: "unmute",
  description: "this is a unmute command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const { member, mentions } = message;
    const target = message.mentions.users.first();
    const embed = new Discord.MessageEmbed();
    const tag = `<@${member.id}>`;
    let moderator = message.member.roles.cache.find(
      (r) => r.name === "Moderators"
    );
    let admin = message.member.roles.cache.find((r) => r.name === "Owner");
    if (moderator || admin) {
      if (target) {
        let mainRole = message.guild.roles.cache.find(
          (role) => role.name === "Member"
        );
        let muteRole = message.guild.roles.cache.find(
          (role) => role.name === "muted"
        );
        let memberTarget = message.guild.members.cache.get(target.id);

        if (!mainRole) {
          message.guild.roles.create({
            data: {
              name: "Member",
              color: "GRAY",
              permissions: [
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "READ_MESSAGE_HISTORY",
                "CREATE_INSTANT_INVITE",
                "CHANGE_NICKNAME",
                "ATTACH_FILES",
                "EMBED_LINKS",
                "ADD_REACTIONS",
                "USE_EXTERNAL_EMOJIS",
                "MENTION_EVERYONE",
                "USE_VAD",
                "CONNECT",
                "SPEAK",
              ],
            },
            reason: "we needed a role for members? yes",
          });
        }
        if (!muteRole) {
          message.guild.roles.create({
            data: {
              name: "muted",
              color: "GRAY",
              permissions: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
            },
            reason: "we needed a role for members? yes",
          });
        }
        if (mainRole || muteRole) {
          memberTarget.roles.remove(muteRole.id);
          memberTarget.roles.add(mainRole.id);
          embed
            .setTitle("Unmuted")
            .setDescription(
              `${tag}, You have unmuted <@${memberTarget.user.id}>`
            );

          message.channel.send(embed);
        } else {
          message.channel.send(`${tag} , Can't find that member in this guild`);
        }
      }
    }
  },
};
