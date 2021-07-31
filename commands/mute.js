module.exports = {
  name: "mute",
  description: "this is a mute command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const ms = require("ms");
    const { member, mentions } = message;
    const target = message.mentions.users.first();
    const embed = new Discord.MessageEmbed();
    const tag = `<@${member.id}>`;
    const mod = message.member.roles.cache.find((r) => r.name === "Mod");

    if (target) {
      let mainRole = message.guild.roles.cache.find(
        (role) => role.name === "Member"
      );
      let muteRole = message.guild.roles.cache.find(
        (role) => role.name === "muted"
      );

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
        if (member.hasPermission("ADMINISTRATOR")) {
          let memberTarget = message.guild.members.cache.get(target.id);
          let userID = `<@${memberTarget.user.id}>`;
          if (!args[1]) {
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            embed
              .setTitle("Muted")
              .setDescription(
                `${tag}, You have muted <@${memberTarget.user.id}>`
              );

            message.channel.send(embed);
            return;
          }
          memberTarget.roles.remove(mainRole.id);
          memberTarget.roles.add(muteRole.id);
          message.channel.send(
            `${userID} has been muted for ${ms(ms(args[1]))}`
          );

          setTimeout(function () {
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
          }, ms(args[1]));
        } else {
          message.reply("Cant find that member!");
        }
      }
    }
  },
};
