module.exports = {
  name: "clear",
  description: "this is a clear command!",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const config = require("../config.json");
    if (
      member.hasPermission("ADMINISTRATOR") ||
      message.member.roles.cache.find((r) => r.name === "Moderators")
    ) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
    }
  },
};
