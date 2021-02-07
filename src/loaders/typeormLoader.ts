import "reflect-metadata";
import { createConnection } from "typeorm";

export const typeormLoader = async () => {
  await createConnection().then(async (connection) => {
    return await connection.synchronize();
  });
};
