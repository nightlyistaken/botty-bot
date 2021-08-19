// CONSTS

// made by breadA#3012 (breadA)
const Discord = require("discord.js");
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const client = new Discord.Client();
const config = require("./config.json");
const util = require("minecraft-server-util");
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(":memory:");

const disbut = require("discord.js-buttons")(client);
// ready (for only 1 time)

client.once("ready", () => {
  // This will console log
  console.log("The bot is ready to be used. https://b0t.divy.work");
  // This will Set Activity of the bot
  client.user.setActivity(`♠︎ Prefix ${config.prefix.p}`, {
    name: "botty",
    type: "STREAMING",
    url: "https://www.twitch.tv/breadoonline",
  });
});

// ----------------------------------------------------------------------------
// AKA Command handler
// basic command handler starts here |
// ---------------------------------------------------------------------------
client.commands = new Discord.Collection();
// This gets the fs const from the const section
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // This sets the command name to command
  client.commands.set(command.name, command);
}
// If the command starts with prefix in the config, it will message the bot and the
// command will run as per user
client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix.p) || message.author.bot)
    return;

  const args = message.content.slice(config.prefix.p.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const handler = client.commands.get(command);
  if (handler) {
    handler.execute(message, args, disbut, paginationEmbed, Discord);
  }
});

// Anti-Spam is done
// -------------------------------------------------------------------------------
// LOGS
// -------------------------------------------------------------------------------
client.on("messageDelete", async (message) => {
  if (!message.guild) return;
  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: "MESSAGE_DELETE",
  });
  const deletionLog = fetchedLogs.entries.first();
  const deleteLog = client.channels.cache.find(
    (channel) => channel.name === "logs"
  );
  if (!deletionLog)
    return deleteLog.send(
      `A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`
    );

  const { executor, target } = deletionLog;

  if (target.id === message.author.id) {
    deleteLog.send(
      `A message by ${message.author.tag} was deleted by ${executor.tag}.`
    );
  } else {
    deleteLog.send(
      `A message by ${message.author.tag} was deleted, but we don't know by who.`
    );
  }
});

// -------------------------------------------------------------------------------

// THIS IS WELCOME AND LEAVE NON-COMMANDS

// Welcome:
client.on("guildMemberAdd", (member) => {
  console.log("Someone joined");
  const memberWelcomeRole = member.guild.roles.cache.find(
    (role) => role.name === "Member"
  );
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );
  if (!memberWelcomeRole) {
    member.guild.roles.create({
      data: {
        name: "Member",
        color: "GRAY",
        permissions: [
          "VIEW_CHANNEL",
          "SEND_MESSAGES",
          "READ_MESSAGE_HISTORY",
          "CREATE_INSTANT_INVITE",
          "CHANGE_NICKNAME",
          "ATTACH_FILES",
          "EMBED_LINKS",
          "ADD_REACTIONS",
          "USE_EXTERNAL_EMOJIS",
          "MENTION_EVERYONE",
          "USE_VAD",
          "CONNECT",
          "SPEAK",
        ],
      },
      reason: "we needed a role for members? yes",
    });
  }
  if (memberWelcomeRole) {
    member.roles.add(memberWelcomeRole);
    const target = member;
    const targetMember = member.guild.members.cache.get(target.id);

    targetMember
      .send(`Welcome to the server ${targetMember}! `)
      .catch(function () {
        console.log("Promise Rejected");
      });
    if (!channel) return;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Welcome to the server!`)
      .setColor(0xff0000)
      .setDescription(`Welcome ${member} , have a great time! `);
    embed.setTimestamp();

    channel.send(embed);
  }
});

// Leave :

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
  embed.setTimestamp();

  channel.send(embed);
});
// -----------------------------------------------------------------------------------------
// WEBSITE
// -----------------------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/getChannels/:guild", function (req, res) {
  const guildId = req.params.guild;
  const server = client.guilds.cache.find((g) => g.id == guildId);
  if (server) {
    const channels = server.channels.cache.array();
    5;
    res.status(200).json({ channels });
  } else {
    res.status(404).send("Not found");
  }
});

app.post("/msg", function (req, res) {
  const body = req.body;
  const message = body.msg;
  const GuildId = body.guild; // GUILD NAME
  const GuildChannel = body.channelName; // CHANNEL NAME
  // general or server_name
  console.log(body);
  const channel = client.channels.cache.find((c) => c.id == GuildChannel);
  const server = client.guilds.cache.find((g) => g.id == GuildId);

  var array = [];

  try {
    let channels = client.channels.cache.array();
    for (const channel of channels) {
      array.push(channel.id);
      console.log(channel.id);
    }
  } catch (err) {
    console.log("array error");
    console.log(err);
  }
  // <#${item}>
  if (channel) {
    channel.send(`${server} , ${channel} , SAID "${message}"`);
  }
  res.redirect("/");
});
// -----------------------------------------------------------------------------------------

const isInvite = async (guild, code) => {
  return await new Promise((resolve) => {
    guild.fetchInvites().then((invites) => {
      for (const invite of invites) {
        if (code === invite[0]) {
          resolve(true);
          return;
        }
      }
      resolve(false);
    });
  });
};
// Anti advertisment ===

client.on("message", async (message) => {
  const { guild, member, content } = message;
  const code = content.split("discord.gg/")[1];
  if (code && isInvite(guild, code)) {
    message
      .reply("Please don't advertise in this channel.")
      .then((msg) => msg.delete({ timeout: 10000 }));
    message.delete();
  }
});
// Client login ==
client.login(config.prefix.token);

// Express JS Listen to Web.
app.listen(8000);
