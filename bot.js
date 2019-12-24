const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
const schedule = require('node-schedule');

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

//get emoji and unicode backup based on the name and return it
function getEmoji(emojiName, backupName)
{
    let selectedEmoji = client.emojis.find(emoji => emoji.name === emojiName)
    selectedEmoji = (selectedEmoji === null) ? backupName : selectedEmoji;
    return selectedEmoji;
}

//get suffix for the written day
function setOrdinalSuffix(day)
    {
        x = day % 10;
        y = day % 100;
        if(x == 1 && y != 11)
        {
            return `${day}st`;
        }
        if(x == 2 && y != 12)
        {
            return `${day}nd`;
        }
        if(x == 3 && y != 13)
        {
            return `${day}rd`
        }
        return `${day}th`;
    }

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
    const announcementChannel = client.channels.find(channel => channel.name === 'dev-channel');
    const agree_emoji = getEmoji('Agree', ':white_check_mark:');
    const disagree_emoji = getEmoji('Disagree', ':no_entry:');
    let eventDates = new Array();

    //get weekend event dates and push to eventDates array;
    function getEventDate(dt)
    {
        let x = 6;
        dt = new Date(dt);
        for(i=0;i < 2;i++)
        {
            let day = dt.getDay();
            let diff = x - day;
            let eventDate = new Date(dt);
            eventDate.setDate(dt.getDate() + diff);
            eventDate.setUTCHours(18);
            eventDate.setUTCMinutes(00);
            eventDate.setUTCSeconds(00);
            eventDate.setUTCMilliseconds(00);
            eventDates.push(eventDate);
            x++;
        }
    }

    getEventDate(new Date());

    //weekly monday message
    let mondayAnnouncement = schedule.scheduleJob('*/10 * * * * *', () => {
        for(i=0; i < eventDates.length; i++)
        {
            announcementChannel.send(`Please ${agree_emoji} or ${disagree_emoji} if you will be able to make it to the next OP on ${days[eventDates[i].getDay()]} the ${setOrdinalSuffix(eventDates[i].getDate() )}. Please change your emoji depending on your availability.`);
        }
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