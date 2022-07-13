import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.reply("Pong!");
};
