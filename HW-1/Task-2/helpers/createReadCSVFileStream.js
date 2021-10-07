import { createReadStream } from "fs";
import { resolve } from "path";
import { inputDir, highWaterMark } from "./constants";

export const createReadCSVFileStream = (file) =>
  createReadStream(resolve(__dirname, "../", inputDir, file), {
    highWaterMark,
  }).on("error", (error) =>
    console.error(`There are some problems with ${file} file reading: ${error}`)
  );
