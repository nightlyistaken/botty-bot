module.exports = {
    name: 'play',
    description: 'Joins and plays a video from youtube',
    async execute(message, args) {
        const ytdl = require('ytdl-core');
        const ytSearch = require('yt-search');
        const voiceChannel = message.member.voice.channel;
        const permissions = voiceChannel.permissionsFor(message.client.user);

 
        if (!voiceChannel) {
            message.channel.send('You need to be in a channel to execute this command!');  
            message.delete({ timeout: 10000 })
        }   
        if (!permissions.has('CONNECT')) {
            message.reply('You dont have the correct permissions').then(msg => msg.delete({timeout: 10000}));

            message.delete({ timeout: 2000 });
        } 
        if (!permissions.has('SPEAK')) {
            message.reply('You dont have the correct permissions').then(msg => msg.delete({timeout: 10000}));
            message.delete({ timeout: 2000 });
        } 
        if (!args.length) {
            message.reply('You need to send the second argument!').then(msg => msg.delete({timeout: 10000}));
            message.delete({ timeout: 2000 });
        } 
 
        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
    
        if(validURL(args[0])){
 
            const  connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('leaving channel');
            });
 
            await message.reply(`:thumbsup: Now Playing ***Your Link!***`)
 
            return
        }
    
    if (args.length) {
        
        const connection = await voiceChannel.join();
 
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
 
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
 
        }
 
        const video = await videoFinder(args.join(' '));
 
        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
 
            await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
        } else {
            message.channel.send('No video results found');
        }
    }
    }
}