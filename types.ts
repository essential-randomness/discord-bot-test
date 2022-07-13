import type { SlashCommandBuilder } from "@discordjs/builders";

export type BuiltSlashCommand =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
