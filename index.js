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
    handler.execute(message, args);
  }
});


//  ----------------------------------------------------------------------------

// This is the auto mute command which mutes the person when the LIMIT is crossed
// -----------------------------------------------------------------------------

// CONSTS
const usersMap = new Map();
const LIMIT = 5;
const TIME = 70000;
const DIFF = 3000;
// If the message  crosses the variable "LIMIT" it will mute the user for variable
// - "TIME" which is in Milliseconds 
// If the variable "LIMIT" is send between variable "DIFF" The bot will mute the user.

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;
    console.log(difference);

    if (difference > DIFF) {
      clearTimeout(timer);
      console.log("Cleared Timeout");
      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);
        console.log("Removed from map.");
      }, TIME);
      usersMap.set(message.author.id, userData);
    } else {
      ++msgCount;
      if (parseInt(msgCount) === LIMIT) {
        let muterole = message.guild.roles.cache.find(
          (role) => role.name === "muted"
        );
        let memberRole = message.guild.roles.cache.find(
          (role) => role.name === "Member"
        );
        if (!muterole) {
          // This is if the "muted" role does not exist
          try {
            muterole = await message.guild.roles.create({
              name: "muted",
              permissions: [],
            });
            message.guild.channels.cache.forEach(async (channel, id) => {
              await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
          } catch (e) {
            console.log(e);
          }
        }
        // Where the muting and unmuting starts ===

        message.member.roles.add(muterole);
        message.member.roles.remove(memberRole);
        const { member, mentions } = message;
        message.channel
          .send(`You have been muted <@${member.id}> for spamming`)
          .then((msg) => {
            msg.delete({ timeout: 2000 });
          });

        setTimeout(() => {
          message.member.roles.remove(muterole);
          message.member.roles.add(memberRole);
          message.channel.send("You have been unmuted!").then((msg) => {
            msg.delete({ timeout: 2000 });
          });
        }, TIME);
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }
    }
  } else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
      console.log("Removed from map.");
    }, TIME);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn,
    });
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

  member.roles.add(memberWelcomeRole);

  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(`Welcome to the server!`)
    .setColor(0xff0000)
    .setDescription(`Welcome ${member} , have a great time! `);

  channel.send(embed);
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

  channel.send(embed);
});

// website
app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/msg", function (req, res) {
  const body = req.body;
  const message = body.msg;
  const channel = client.channels.cache.find((c) => c.name == "broadcast");
  console.log(body);
  if (channel && message) {
    channel.send(message);
  }
  res.redirect("/");
});

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
    message.channel.send("please dont advertise!");
  }
});
// Client login == 
client.login(config.prefix.token);

// Express JS Listen to Web.
app.listen(8000);
