module.exports = {
  name: "broadcast",
  description: "broadcast command!",
  execute(message, args) {
     const { member, mentions } = message;
        const Discord = require("discord.js");
        const client = new Discord.Client();
        const channel = message.guild.channels.cache.find(c => c.name === 'broadcast');

    if (member.hasPermission("ADMINISTRATOR")) {
     
        let messageArgs = args.join(' ');

        channel.send(messageArgs);

      } else {
      message.channel.send(`You dont have the permissions to do that`)
   }
}}
