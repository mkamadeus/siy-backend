import { Express } from "express";
import morgan from "morgan";

export const morganLoader = (expressApp: Express) => {
  expressApp.use(morgan("tiny"));
};
