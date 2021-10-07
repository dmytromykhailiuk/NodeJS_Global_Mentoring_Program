import { resolve } from "path";
import { mkdir } from "fs";
import { outputDir } from "./constants";

export const createOuputDir = (callback) =>
  mkdir(resolve(__dirname, "../", outputDir), (error) =>
    error
      ? console.error(`Directory wasn't created: ${error}`)
      : console.log(`Directory ${outputDir} was created!`) || callback()
  );
