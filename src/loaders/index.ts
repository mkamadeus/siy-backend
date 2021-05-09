import { Express } from 'express';
import { morganLoader } from './morganLoader';
import { redocLoader } from './redocLoader';
import { Logger } from 'tslog';
import chalk from 'chalk';

export const mainLoader = async (expressApp: Express): Promise<void> => {
  const log: Logger = new Logger();
  try {
    morganLoader(expressApp);
    log.info(`🌵 ${chalk.yellow('Morgan')} logger loaded successfully!`);
    redocLoader(expressApp);
    log.info(`🌵 ${chalk.yellow('Redoc')} documentation loaded successfully!`);
  } catch (err) {
    log.trace(`❌ Error at loaders: ${chalk.red(err)}`);
  }
};
