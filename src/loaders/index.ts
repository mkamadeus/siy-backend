import { Express } from 'express';
import { morganLoader } from './morganLoader';
import { redocLoader } from './redocLoader';
import logger from '@/logger';
import chalk from 'chalk';

export const mainLoader = async (expressApp: Express): Promise<void> => {
  try {
    morganLoader(expressApp);
    logger.info(`🌵 ${chalk.yellow('Morgan')} logger loaded successfully!`);
    redocLoader(expressApp);
    logger.info(
      `🌵 ${chalk.yellow('Redoc')} documentation loaded successfully!`
    );
  } catch (err) {
    logger.trace(`❌ Error at loaders: ${chalk.red(err)}`);
  }
};
