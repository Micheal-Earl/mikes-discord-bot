module.exports = {
  type: "interactionCreate",
  once: false,
  execute(interaction) {
    console.log(
      `\x1b[36m%s\x1b[0m`,
      `${interaction.user.tag} in #${interaction.channel.name} executed /${interaction.commandName}`
    );
  },
};
