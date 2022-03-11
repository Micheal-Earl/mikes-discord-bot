const fs = require("node:fs");
const {
  Client,
  Collection,
  Intents,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { API_KEY } = require("../config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Commands ---------------------------------------------------
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("src/commands")
  .filter((file) => file.endsWith(".js"));

console.log("Command Files");
console.log(commandFiles);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Events ------------------------------------------------------
const eventFiles = fs
  .readdirSync("src/events")
  .filter((file) => file.endsWith(".js"));

console.log("Event Files");
console.log(eventFiles);

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.type, (...args) => event.execute(...args));
  } else {
    client.on(event.type, (...args) => event.execute(...args));
  }
}

// Execute Command Interactions --------------------------------
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: `There was an error while executing this command!`,
      ephemeral: true,
    });
  }
});

// Execute Command Interactions --------------------------------
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
});

client.login(API_KEY);
