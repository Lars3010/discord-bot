const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
});

//ping pong
client.on('message', msg => {
    if(msg.content === "!ping")
    {
        msg.channel.send('pong');
    }
})

// login to Discord with your app's token
client.login(auth.token);