const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

// Commands all start with this character.
const prefix = "!";

client.on("message", function (message) {
  // Ignore messages sent from bots.
  if (message.author.bot) return;

  // Ignore messages that don't start with an exclamation point.
  if (!message.content.startsWith(prefix)) return;

  // Any messages still being processed should be commands from users.
  // Identify the command body by removing the prefix defined above.
  const commandBody = message.content.slice(prefix.length);
  // Split the arguments in the command into array elements by splitting on the space characters.
  const args = commandBody.split(" ");
  // Assign the first argument in the args array as the command.  This will always be the first
  // argument in the list of command arguments.  Also change it to lower case for easier processing.
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`${timeTaken}ms.`);
  } else if (command === "hello") {
    message.reply(`Hello World!`);
  } else if (command === "sum") {
    const numArgs = args.map((x) => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => (counter += x));
    message.reply(`Sum = ${sum}`);
  }
});

client.login(config.BOT_TOKEN);
