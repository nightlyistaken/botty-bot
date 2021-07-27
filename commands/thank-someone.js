module.exports = {
  name: "t",
  description: "thanks someone",
  execute(message, args) {
    let thankedNote = message.content.split(" ")[2];
    const { member, mentions } = message;
    const tag = `<@${member.id}>`;
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const embed = new Discord.MessageEmbed();
    const target = mentions.users.first();
    const embedCreatedat = message.createdAt;

    if (thankedNote === "@egg_me" || tag === target) {
      message.reply("You found A easter EGG!");
    } else
      embed
        .setTitle("Thank you so much!")
        .setDescription(`Thanks! ${target} for ${thankedNote}`)
        .setColor("#234h4")
        .addFields({
          name: `Thanks note:`,
          value: `${tag}has thanked ${target}`,
        })
        .setFooter(`${embedCreatedat}`);

    message.channel.send(embed);
    message.delete({ timeout: 2000 });
  },
};
