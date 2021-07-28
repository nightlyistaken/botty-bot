module.exports = {
  name: "image",
  description: "img cmd!",
  execute(message, args) {
  	 const Discord = require("discord.js");
	 const embed = new Discord.MessageEmbed();
     const { Picsum } = require("picsum-photos");
  embed
     .setTitle("Random image:")
     .setDescription("Picsum.")
     .setImage(`${Picsum.url()}`)
     .setColor("#51c7c9")

     message.channel.send(embed);

  },
};
