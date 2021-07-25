// CONSTS
// made by breadA#3012 (breadA)
const Discord = require("discord.js");
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const client = new Discord.Client();
const config = require("./config.json");
const util = require('minecraft-server-util');

// ready (for only 1 time)

client.once("ready", () => {
  console.log("The bot is ready to be used. https://b0t.divy.work");

  client.user.setActivity(`♠︎ Prefix $`, {
    name: "$botty",
    type: "STREAMING",
    url: "https://www.twitch.tv/breadoonline",
  });
});
// ready fully

// Commands FOR THE B.O.T.
// AKA Command handler
// basic command handler starts here |

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix.p) || message.author.bot) return;

  const args = message.content.slice(config.prefix.p.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const handler = client.commands.get(command);
  if (handler) {
    handler.execute(message, args);
  }
});

// basic command end

const usersMap = new Map();
const LIMIT = 5;
const TIME = 7000;
const DIFF = 3000;

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

client.on("messageDelete", async (message) => {
  if (!message.guild) return;
  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: "MESSAGE_DELETE",
  });
  const deletionLog = fetchedLogs.entries.first();
  const deleteLog = client.channels.cache.find(
    (channel) => channel.id === "867660187871215616"
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

client.on("message", (message) => {
  if (message.content === config.prefix.p) {
    message.reply("Invalid Command.");
    message.delete({ timeout: 2000 });
  }
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  // Old message may be undefined
  if (!oldMessage.author) return;
  const MessageLog = client.channels.cache.find(
    (channel) => channel.name === "logs"
  );
  const embed = new Discord.MessageEmbed()
    .setAuthor(newMessage.author.username)
    .setTimestamp()
    .setColor("#392B47")
    .addFields(
      { name: "original:", value: oldMessage },
      { name: "edit:", value: newMessage }
    );
  MessageLog.send(embed);
});

/**const roles = ['member']

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
**/

// THIS IS WELCOME AND LEAVE NON-COMMANDS

// welcome:
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

client.on("message", async (message) => {
  const { guild, member, content } = message;

  // discord.gg/23RAN4

  const code = content.split("discord.gg/")[1];
  if (code && isInvite(guild, code)) {
    message.channel.send("please dont advertise!");
  }
});

client.login("ODY2MzU3NTk4MjkwOTY4NjI3.YPRYYw.jzGolqyltUxqG5HZ50Vbyb6TeyU");

app.listen(8000);
