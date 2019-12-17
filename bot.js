const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
const schedule = require('node-schedule');

function getEmoji(emojiName, backupName)
{
    let selectedEmoji = client.emojis.find(emoji => emoji.name === emojiName)
    selectedEmoji = (selectedEmoji === null) ? backupName : selectedEmoji;
    return selectedEmoji;
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
    const announcementChannel = client.channels.find(channel => channel.name === 'dev-channel');
    const agree_emoji = getEmoji('Agree', ':white_check_mark:');
    const disagree_emoji = getEmoji('Disagree', ':no_entry:');

    let dt = new Date();
    let day = dt.getDay()
    

    let job = schedule.scheduleJob('*/10 * * * * *', () => {
        announcementChannel.send(`please ${agree_emoji} or ${disagree_emoji} if you will be able to make it to the next OP on Saturday the 23rd. please change your emoji depending on your availability.`);
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