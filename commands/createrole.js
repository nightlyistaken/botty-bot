module.exports = {
  name: "createrole",
  description: "creates a role!",
  execute(message, args) {
    const Discord = require("discord.js");
    const { member, mentions } = message;
    const target = message.mentions.users.first();
    const embed = new Discord.MessageEmbed();
    const tag = `<@${member.id}>`;
    const parts = message.content.split(" ");
    let Role = parts[1];
    let Color = parts[2];
    let Type = parts[3];

    if (!Role) {
      message.reply("Please type the type of the role you want.");
    }
    if (Color === "LOL_HI_EGG") {
      message.channel.send("easter egg :) EXTRA EPIC!");
    }
    if (Type === "moderator") {
      message.guild.roles.create({
        data: {
          name: Role,
          color: Color,
          hoist: true,
          permissions: [
            "VIEW_CHANNEL",
            "VIEW_AUDIT_LOG",
            "CHANGE_NICKNAME",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS",
            "BAN_MEMBERS",
            "SEND_MESSAGES",
            "EMBED_LINKS",
            "ATTACH_FILES",
            "ADD_REACTIONS",
            "USE_EXTERNAL_EMOJIS",
            "CREATE_INSTANT_INVITE",
            "MENTION_EVERYONE",
            "MANAGE_MESSAGES",
            "READ_MESSAGE_HISTORY",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "SPEAK",
            "CONNECT",
            "PRIORITY_SPEAKER",
            "MOVE_MEMBERS",
            "USE_VAD",
          ],
        },
      });
    }
    if (Type === "owner") {
      message.guild.roles.create({
        data: {
          name: Role,
          color: Color,
          hoist: true,
          permissions: ["ADMINISTRATOR"],
        },
      });
    }

    if (Type === "custom") {
      message.guild.roles.create({
        data: {
          name: Role,
          color: Color,
          hoist: true,
          permissions: [
            "VIEW_CHANNEL",
            "READ_MESSAGE_HISTORY",
            "SEND_MESSAGES",
          ],
        },
      });
    }
    if (Type) {
      const embed = new Discord.MessageEmbed();

      embed.setTitle("A Role has been created ");
      embed.setColor("#37E42d");
      embed.setDescription(`${tag} has created a role`);
      embed.addFields({ name: "Role Name", value: `"${Role}"` });
      embed.addFields({ name: "Role Color", value: `"${Color}"` });
      embed.setTimestamp();

      message.channel.send(embed);
    }
  },
};
