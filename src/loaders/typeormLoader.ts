import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';

export const typeormLoader = async () => {
  const config = await getConnectionOptions(
    process.env.NODE_ENV === 'test' ? 'test' : 'default'
  );
  return await createConnection(config).then(async (connection) => {
    await connection.synchronize();
    return connection;
  });
};
