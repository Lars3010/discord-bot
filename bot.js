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
    let eventDates = new Array();

    //this works but it can be done cleaner.
    let dt = new Date();
    console.log(dt);
    let currentDay = dt.getDay();
    console.log(currentDay);
    let diff = 6 - currentDay;
    console.log(diff);
    let saturdayDate = new Date(dt);
    saturdayDate.setDate(dt.getDate() + diff);
    saturdayDate.setUTCHours(18);
    saturdayDate.setUTCMinutes(00);
    saturdayDate.setUTCSeconds(00);
    let sundayDate = new Date(saturdayDate);
    sundayDate.setDate(dt.getDate() + diff + 1);
    console.log(sundayDate);

    eventDates.push(saturdayDate, sundayDate);
    console.log(eventDates);

    function getDates(dt)
    {
        dt = new Date(dt);
        console.log(dt);
         
    }

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    let job = schedule.scheduleJob('*/10 * * * * *', () => {
        //announcementChannel.send(`please ${agree_emoji} or ${disagree_emoji} if you will be able to make it to the next OP on Saturday the 23rd. please change your emoji depending on your availability.`);
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