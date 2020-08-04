const Discord = require("discord.js");
const config = require("./config.json");
const botPackageInformation = require("./package.json");

const client = new Discord.Client();

// Commands all start with this character.
const prefix = "!";

// Post a message to the console when the bot connects succesfully.
client.on(`ready`, () => {
  console.log(
    `${botPackageInformation.name} version ${botPackageInformation.version} connected with user id: ${client.user.tag}`
  );
});

client.on(`message`, function (message) {
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
  } else if (command === "avatar") {
    // Send a URL linking to the user's avatar
    message.reply(message.author.displayAvatarURL());
  } else if (command === "jaedong") {
    // Send a attached image of Jaedong encouraging you.
    // Create an attachment using MessageAttachment.
    const attachment = new Discord.MessageAttachment(
      "https://i.imgur.com/X60kh.jpg"
    );
    // Send the attachment in the message channel.
    message.channel.send(attachment);
  }
});

// Create an event listener for new guild members
client.on("guildMemberAdd", (member) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "bot-testing-text"
  );
  // Do nothing if the channel name wasn't found on the server.
  if (!channel) return;
  // Send the message, metioning the member that joined.
  channel.send("Welcome to the server, ${member}");
});

client.login(config.BOT_TOKEN);
