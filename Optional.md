# Optional Not confirmed.

## breadA#3012

```js
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

const roles = ["member"];

const channelId = "867660187871215616";

client.on("message", (message) => {
  const { guild, content, member } = message;

  if (member.user.bot) {
    return;
  }

  const hasRole = member.roles.cache.find((role) => {
    return roles.includes(role.name);
  });

  if (hasRole) {
    const channel = guild.channels.cache.get(channelId);
    channel.send(`<@${member.id}> said this:
      
"${content}"`);
  }
});
```
