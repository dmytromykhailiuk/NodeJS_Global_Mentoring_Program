import { createWriteStream } from "fs";
import { resolve } from "path";
import { outputFileType, outputDir, highWaterMark } from "./constants";

export const createWriteTXTFileStream = (fileName) =>
  createWriteStream(
    resolve(__dirname, "../", outputDir, `${fileName}.${outputFileType}`),
    {
      highWaterMark,
    }
  ).on("error", (error) =>
    console.error(
      `There are some problems with ${fileName}.${outputFileType} file writing: ${error}`
    )
  );
