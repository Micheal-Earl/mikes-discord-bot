const { DB, Models } = require("./database.js");

async function buildDatabase() {
  try {
    await DB.authenticate()
      .then(await DB.drop())
      .then(Models.User.sync());
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

buildDatabase();
