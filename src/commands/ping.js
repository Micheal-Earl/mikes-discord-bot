const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong"),
  async execute(interactions) {
    await interactions.reply("Pong");
  },
};
