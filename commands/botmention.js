module.exports = {
  name: "botty",
  description: "send a new msg.",
  execute(message, args) {
    const Discord = require("discord.js");
    const embed = new Discord.MessageEmbed();
    const client = new Discord.Client();
    const prefix = "$";

         embed.setTitle("Hello!")
         embed.setDescription(`My Prefix is ${prefix} `);
         embed.addFields({

          name: `Yes? if you need help do $help`,
          value: "visit https://b0t.divy.work",

        });

    message.channel.send(embed);
  },
};
