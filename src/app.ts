import 'reflect-metadata';
import { Express } from 'express';
import { Action, createExpressServer, useContainer } from 'routing-controllers';
import { mainLoader } from '@/loaders';
import { Container } from 'typedi';
import { AuthService } from './services/AuthService';
import logger from '@/logger';
import chalk from 'chalk';

useContainer(Container);

const app = createExpressServer({
  authorizationChecker: async (action: Action, roles: string[]) => {
    try {
      const token = action.request.headers['authorization'].split(' ')[1];
      const user = await Container.get(AuthService).getUserByToken(token);

      if (roles.some((role) => role === user.role)) {
        return true;
      }
      return false;
    } catch (_) {
      return false;
    }
  },
  controllers: [__dirname + '/controllers/*.ts'],
  cors: true,
}) as Express;

mainLoader(app)
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(`⭐ Live on port ${chalk.bold.yellow(process.env.PORT)}`);
    });
  })
  .catch((err) => {
    logger.info(err.message);
  });
