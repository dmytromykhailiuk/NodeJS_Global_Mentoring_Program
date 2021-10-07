import { readdir } from "fs";
import { resolve } from "path";
import { inputDir, isCSVFile } from "./helpers";
import { createTXTFileFromCSV } from "./createTXTFileFromCSV";

export default () =>
  readdir(resolve(__dirname, inputDir), (error, files) =>
    error
      ? console.error(`Unable to scan ${inputDir} directory: ` + error)
      : files.filter(isCSVFile).forEach(createTXTFileFromCSV)
  );
