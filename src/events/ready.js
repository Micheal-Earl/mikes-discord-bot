module.exports = {
  type: "ready",
  once: true,
  execute(client) {
    console.log(`Bot Initialized - Logged in as ${client.user.tag}`);
  },
};
