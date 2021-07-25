module.exports = {
  name: "author",
  description: "`this is a author command!`",
  execute(message, args) {
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const config = require("../config.json");
    const embed = new Discord.MessageEmbed();
    embed.setTitle(`About my author ${tag}:`).addFields(
      {
        name: "Name",
        value: `${config.personinfo.name}`,
      },
      {
        name: "Hobby",
        value: `${config.personinfo.hobby}`,
      },
      {
        name: "Favorite food",
        value: `${config.personinfo.food}`,
      }
    );
    message.channel.send(embed);
  },
};
