module.exports = {
  name: "mcserver",
  description: "get information about a minecraft server",
  execute(message, args) {
    const util = require("minecraft-server-util");
    const config = require("../config.json");

    util.status("mc.hypixel.net").then((response) => {
      const Discord = require("discord.js");
      const client = new Discord.Client();
      const embed = new Discord.MessageEmbed();
      const { member, mentions } = message;
      const tag = `<@${member.id}>`;

      embed
        .setColor("#BFCDEB")
        .setTitle("Mc server status")
        .addFields(
          { name: "Server IP", value: response.host },
          { name: "Online Players", value: response.onlinePlayers },
          { name: "Max Players", value: response.maxPlayers },
          { name: "Version", value: response.version }
        );

      message.channel.send(embed);
    });
  },
};
