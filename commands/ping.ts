import { BuiltSlashCommand } from "../types";
import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const NAME_OPTION = "with_name";

export const builder: BuiltSlashCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!")
  .addBooleanOption((option) =>
    option
      .setName(NAME_OPTION)
      .setDescription("Can I call you by your name?")
      .setRequired(true)
  );

export const execute = async (interaction: CommandInteraction) => {
  await interaction.reply(
    `Pong${
      interaction.options.getBoolean(NAME_OPTION)
        ? `, ${interaction.user.username}`
        : ""
    }!`
  );
};
