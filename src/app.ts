import "reflect-metadata";
import { Express } from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { mainLoader } from "@/loaders";
import { Container } from "typedi";
import chalk from "chalk";

useContainer(Container);

const app = createExpressServer({
  controllers: [__dirname + "/controllers/*.ts"],
  cors: true,
}) as Express;

mainLoader(app)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.info(`⭐ Live on port ${chalk.bold.yellow(process.env.PORT)}`);
    });
  })
  .catch((err) => {
    console.info(err.message);
  });
