require("dotenv").config();

import { Client, Intents } from "discord.js";

console.log("here");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready3!");
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);
