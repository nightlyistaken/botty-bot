module.exports = {
  name: "deleteallroles",
  description: "deletes all roles (warning do it on your own risk)",
  execute(message, args) {
    const Discord = require("discord.js");
    const { member, mentions } = message;
    const target = message.mentions.users.first();
    const embed = new Discord.MessageEmbed();
    const tag = `<@${member.id}>`;
    let moderator = message.member.roles.cache.find(
      (r) => r.name === "Moderators"
    );
    let admin = message.member.roles.cache.find((r) => r.name === "Admin");
    if (moderator || admin) {
      message.guild.roles.cache.forEach((roles) => {
        roles
          .delete()
          .then((deleted) => console.log(`Deleted role ${deleted.name}`))
          .catch(console.error);
      });

      message.channel.send(`${tag} You deleted All roles but... why did you?`);
    } else {
      message.channel.send("Invalid Permmisions");
    }
  },
};
