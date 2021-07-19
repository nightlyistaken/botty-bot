module.exports = {
  name: "clear",
  description: "this is a clear command!",
  execute(message, args) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
    }
  },
};
