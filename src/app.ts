import "reflect-metadata";
import { Express } from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { mainLoader } from "@/loaders";
import { Container } from "typedi";

useContainer(Container);

const app = createExpressServer({
  controllers: [__dirname + "/controllers/*.ts"],
  cors: true,
}) as Express;

mainLoader(app)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Live on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
