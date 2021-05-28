import { Express } from 'express';
import morgan from 'morgan';

export const morganLoader = (expressApp: Express): void => {
  expressApp.use(morgan('tiny'));
};
