const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "$";
const fs = require("fs");

// CONSTS

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter((file) =>
  file.endsWith(".js")
);
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

// THIS IS WELCOME AND LEAVE NON-COMMANDS

client.on("guildMemberAdd", (member) => {
  console.log("Someone joined");
  const channel = member.guild.channels.cache.find((ch) =>
    ch.name === "welcome"
  );

  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(`Welcome to the server!`)
    .setColor(0xff0000)
    .setDescription(`Welcome ${member} , have a great time! `);

  channel.send(embed);
});

client.on("guildMemberRemove", (member) => {
  console.log("Someone left");
  const channel = member.guild.channels.cache.find((ch) => ch.name === "leave");

  if (!channel) {
    console.log("leave channel not found.");
    return;
  }

  const embed = new Discord.MessageEmbed()
    .setTitle(`Someone left...`)
    .setColor(0xff0000)
    .setDescription(` ${member} has left the server :weary: `);

  channel.send(embed);
});
// ready (for only 1 time)
client.once("ready", () => {
  console.log("The bot is ready to be used. name (botty) ");

  client.user.setActivity(`Exams`, {
    name: "with depression",
    type: "STREAMING",
    url: "https://www.twitch.tv/breadoonline",
  });
});

// Commands FOR THE B.O.T.
// AKA handler

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const handler = client.commands.get(command);
  if (handler) {
    handler.execute(message, args);
  }
});

client.login("ODY2MzU3NTk4MjkwOTY4NjI3.YPRYYw.jzGolqyltUxqG5HZ50Vbyb6TeyU");
