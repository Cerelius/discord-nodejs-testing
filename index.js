const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

// Commands all start with this character.
const prefix = "!";

client.on("message", function(message) 
{   
    // Ignore messages sent from bots.
    if (message.author.bot) return;
    
    // Ignore messages that don't start with an exclamation point.
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    

});

client.login(config.BOT_TOKEN);