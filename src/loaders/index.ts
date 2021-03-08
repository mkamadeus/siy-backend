import { Express } from "express";
import { typeormLoader } from "./typeormLoader";
import { morganLoader } from "./morganLoader";
import { redocLoader } from "./redocLoader";
import chalk from "chalk";

export const mainLoader = async (expressApp: Express) => {
  try {
    // Load TypeORM
    await typeormLoader();
    console.info(`🍞 ${chalk.yellow("TypeORM")} loaded successfully!`);

    morganLoader(expressApp);
    console.info(`🍞 ${chalk.yellow("Morgan")} logger loaded successfully!`);

    redocLoader(expressApp);
    console.info(
      `🍞 ${chalk.yellow("Redoc")} documentation loaded successfully!`
    );
  } catch (err) {
    console.info(`❌ Error at loaders: ${chalk.red(err)}`);
  }
};
