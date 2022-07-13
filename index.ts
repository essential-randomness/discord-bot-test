require("dotenv").config();

import { Client, Collection, CommandInteraction, Intents } from "discord.js";

import { BuiltSlashCommand } from "./types";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { commands } from "./commands";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const allCommands = new Map<
  string,
  {
    builder: BuiltSlashCommand;
    execute: (interaction: CommandInteraction) => Promise<void>;
  }
>(commands.map((command) => [command.builder.name, command]));

const rest = new REST({ version: "9" }).setToken(
  process.env.DISCORD_BOT_TOKEN!
);

// Register all commands
// TODO: should be done only when commands change
rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID!), {
  body: commands.map((command) => command.builder.toJSON()),
});

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction);
  if (!interaction.isCommand()) return;

  const command = allCommands.get(interaction.commandName);
  if (!command) {
    return await interaction.reply({
      content: "Sorry, the command you send does not exist!",
      ephemeral: true,
    });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
