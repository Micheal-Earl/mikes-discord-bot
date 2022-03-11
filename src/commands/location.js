const { SlashCommandBuilder } = require("@discordjs/builders");
const { Models } = require("../db/database.js");

const Grid = require("../grid.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("location")
    .setDescription("Draws a map and shows your location on it"),
  async execute(interactions) {
    try {
      const result = await Models.User.findAll({
        raw: true,
        where: {
          userID: interactions.user.id,
        },
      });
      await interactions.reply(Grid.stringify(result[0].posX, result[0].posY));
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        await interactions.reply(`Your account has already been registered!`);
      } else {
        await interactions.reply(`Error: ${error}`);
      }
    }
  },
};
