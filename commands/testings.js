module.exports = {
  name: "button",
  description: "nope.",
  execute(message, args ,disbut,  Discord) {
    let button = new disbut.MessageButton();
    const { MessageEmbed } = require('discord.js');


    const embed1 = new MessageEmbed();
    const embed2 = new MessageEmbed();
 


    button.setStyle("red"); //default: blurple
    button.setLabel("My First Button!"); //default: NO_LABEL_PROVIDED
    button.setID("click_to_function"); //note: if you use the style "url" you must provide url using .setURL('https://example.com')
   //disables the button | default: false

   embed1.setTitle("yo!")
   embed2.setTitle("im 2 page!!!!!")
   const pages = [
    embed1,
    embed2
];
   const paginationEmbed = require('discord.js-pagination');
  paginationEmbed("hi", pages, emojiList, timeout);
    message.channel.send(
        "button",
      button,

        );
  },
};
