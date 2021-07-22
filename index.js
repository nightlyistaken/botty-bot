const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "$";
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");

// CONSTS

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('messageDelete', async message => {
  if (!message.guild) return;
  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: 'MESSAGE_DELETE',
  });
  const deletionLog = fetchedLogs.entries.first();

  if (!deletionLog) return message.channel.send(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`)

  const { executor, target } = deletionLog;

  if (target.id === message.author.id) {
    message.channel.send(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
  } else {
    message.channel.send(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
  }
});

const roles = ['member']

  const channelId = '867660187871215616'

  client.on('message', (message) => {
    const { guild, content, member } = message

    if (member.user.bot) {
      return
    }

    const hasRole = member.roles.cache.find((role) => {
      return roles.includes(role.name)
    })

    if (hasRole) {
      const channel = guild.channels.cache.get(channelId)
      channel.send(`<@${member.id}> said this:
      
"${content}"`)
    }
  });

// THIS IS WELCOME AND LEAVE NON-COMMANDS

// welcome:
client.on("guildMemberAdd", (member) => {
  console.log("Someone joined");
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );

  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(`Welcome to the server!`)
    .setColor(0xff0000)
    .setDescription(`Welcome ${member} , have a great time! `);

  channel.send(embed);
});

// bye bye :

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
  console.log("The bot is ready to be used. https://b0t.divy.work");

  client.user.setActivity(`♠︎ Exams`, {
    name: "STREAMING",
    type: "STREAMING",
    url: "https://www.twitch.tv/breadoonline",
  });
});

// Commands FOR THE B.O.T.
// AKA Command handler

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const handler = client.commands.get(command);
  if (handler) {
    handler.execute(message, args);
  }
});

// web
app.use(express.static(path.join(__dirname, "./static")));

app.post("/msg", function (req, res) {
  const channel = client.channels.cache.find(
    (c) => c.id == "866527256510857217"
  );
  channel.send("hello");
});

client.login("ODY2MzU3NTk4MjkwOTY4NjI3.YPRYYw.jzGolqyltUxqG5HZ50Vbyb6TeyU");

app.listen(8000);
