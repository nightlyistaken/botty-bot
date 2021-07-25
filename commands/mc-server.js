module.exports = {
    name: 'mcserver',
    description: 'get information about a minecraft server',
    execute(message, args){
        const util = require('minecraft-server-util');
        const config = require("../config.json");

        util.status('TheEveSMPSeas2.aternos.me')
        .then((response) => {
        console.log(response);
                const Discord = require("discord.js");
        const client = new Discord.Client();
        const embed = new Discord.MessageEmbed();
        const { member, mentions } = message;
        const tag = `<@${member.id}>`;

    embed
        .setTitle("You're most welcome!")
        .setDescription(`Welcome ${tag} homie 😊`)
        .setColor("#FFFFFF");


        embed
            .setColor('#BFCDEB')
            .setTitle('Mc server status')
            .addFields(
                {name: 'Server IP', value: response.host},
                {name: 'Online Players', value: response.onlinePlayers},
                {name: 'Max Players', value: response.maxPlayers},
                {name: 'Version', value: response.version}
            )
            .setFooter('helo')
 
            message.channel.send(embed);
             })

    }
}