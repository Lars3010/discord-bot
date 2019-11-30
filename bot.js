const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
const schedule = require('node-schedule');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
    const announcementChannel = client.channels.find(channel => channel.name === 'announcement-channel');

    let job = schedule.scheduleJob('*/10 * * * * *', () => {
        console.log('tick');
        announcementChannel.send(`Time: ${Date()}`);
    })
});

//ping pong
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const arguments = message.content.slice(prefix.length).split(/ +/);
    const command = arguments.shift().toLowerCase();
});

// login to Discord with your app's token
client.login(token);