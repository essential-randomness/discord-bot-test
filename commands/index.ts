import { BuiltSlashCommand } from "../types";
import { CommandInteraction } from "discord.js";
import fs from "fs";
import path from "path";

const commandFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith(".ts") && !file.endsWith("index.ts"));

export const commands: {
  builder: BuiltSlashCommand;
  execute: (interaction: CommandInteraction) => Promise<void>;
}[] = commandFiles.map((file) => {
  const filePath = path.join(__dirname, file);
  const commandModule = require(filePath);
  return {
    builder: commandModule.builder,
    execute: commandModule.execute,
  };
});
