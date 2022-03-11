const { SlashCommandBuilder } = require("@discordjs/builders");
const { Models } = require("../db/database.js");

const Grid = require("../grid.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("go")
    .setDescription("Draws a map and shows your location on it")
    .addStringOption((option) =>
      option
        .setName("direction")
        .setDescription("Enter up, down, left, or right.")
        .setRequired(true)
    ),
  async execute(interactions) {
    try {
      if (interactions.options.getString("direction") === "up") {
        await Models.User.increment(
          { posX: -1 },
          {
            where: {
              userID: interactions.user.id,
            },
          }
        );
      } else if (interactions.options.getString("direction") === "down") {
        await Models.User.increment(
          { posX: 1 },
          {
            where: {
              userID: interactions.user.id,
            },
          }
        );
      } else if (interactions.options.getString("direction") === "left") {
        await Models.User.increment(
          { posY: -1 },
          {
            where: {
              userID: interactions.user.id,
            },
          }
        );
      } else if (interactions.options.getString("direction") === "right") {
        await Models.User.increment(
          { posY: 1 },
          {
            where: {
              userID: interactions.user.id,
            },
          }
        );
      }
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
