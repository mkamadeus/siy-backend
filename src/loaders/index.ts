import { Express } from "express";
import { typeormLoader } from "./typeormLoader";
import { morganLoader } from "./morganLoader";
import { redocLoader } from "./redocLoader";

export const mainLoader = async (expressApp: Express) => {
  try {
    await typeormLoader();
    morganLoader(expressApp);
    redocLoader(expressApp);
  } catch (err) {
    console.log(err);
  }
};
