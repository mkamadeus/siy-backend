import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`
  ),
});

export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  // db: {
  //   type: process.env.DB_TYPE as 'postgres',
  //   host: process.env.DB_HOST,
  //   port: parseInt(process.env.DB_PORT),
  //   name: process.env.DB_NAME,
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   synchronize: process.env.DB_SYNC === 'true',
  // },
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  databaseUrl:
    'postgresql://postgres:friskiemprut@localhost:5432/siy_test?schema=public',
};
