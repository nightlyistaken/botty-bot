module.exports = {
  name: "rr",
  description: "Sets up a reaction role message!",
  async execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const channel = "868805348797059098";
    const yellowTeamRole = message.guild.roles.cache.find(
      (role) => role.name === "All-Developers"
    );
    const blueTeamRole = message.guild.roles.cache.find(
      (role) => role.name === "All-games"
    );

    const yellowTeamEmoji = "⌨️";
    const blueTeamEmoji = "🎮";

    let embed = new Discord.MessageEmbed()
      .setColor("#e42643")
      .setTitle("Choose a team to play on!")
      .setDescription(
        "Choosing a team will allow you to interact with your teammates!\n\n" +
          `${yellowTeamEmoji} for yellow team\n` +
          `${blueTeamEmoji} for blue team`
      );

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(yellowTeamEmoji);
    messageEmbed.react(blueTeamEmoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === yellowTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(yellowTeamRole);
        }
        if (reaction.emoji.name === blueTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(blueTeamRole);
        }
      } else {
        return;
      }
    });

    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === yellowTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(yellowTeamRole);
        }
        if (reaction.emoji.name === blueTeamEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(blueTeamRole);
        }
      } else {
        return;
      }
    });
  },
};
