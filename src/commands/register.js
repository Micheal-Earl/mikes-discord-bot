const { SlashCommandBuilder } = require("@discordjs/builders");
const { Models } = require("../db/database.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register your Discord ID as a player in the game"),
  async execute(interactions) {
    try {
      const user = await Models.User.create({
        userID: interactions.user.id,
        posX: 2,
        posY: 2,
      });
      await interactions.reply(
        `You have been registered ${interactions.user} \n use /location and /go to play.`
      );
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        await interactions.reply(`Your account has already been registered!`);
      } else {
        await interactions.reply(`Error: ${error}`);
      }
    }
  },
};
