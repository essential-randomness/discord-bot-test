require("dotenv").config();

import { Client, Collection, CommandInteraction, Intents } from "discord.js";
import { command, execute } from "./commands/ping";

import { BuiltSlashCommand } from "./types";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = new Collection<
  string,
  {
    builder: BuiltSlashCommand;
    execute: (interaction: CommandInteraction) => Promise<void>;
  }
>().set(command.name, { builder: command, execute });

const rest = new REST({ version: "9" }).setToken(
  process.env.DISCORD_BOT_TOKEN!
);
rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID!), {
  body: commands.map((command) => command.builder.toJSON()),
});

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("interactionCreate", async (interaction) => {
  console.log(interaction);
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);
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
