import { readdir } from "fs";
import { resolve } from "path";
import { inputDir, isCSVFile, createOuputDir } from "./helpers";
import { createTXTFileFromCSV } from "./createTXTFileFromCSV";

export default () =>
  createOuputDir(() =>
    readdir(resolve(__dirname, inputDir), (error, files) =>
      error
        ? console.error(`Unable to scan ${inputDir} directory: ` + error)
        : files.filter(isCSVFile).forEach(createTXTFileFromCSV)
    )
  );
