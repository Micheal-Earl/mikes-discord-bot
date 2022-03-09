const { Client, Intents } = require('discord.js');
const ENV = require('dotenv').config().parsed;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
		console.log('Ready!');
});

client.login(ENV.API_KEY_SECRET);
