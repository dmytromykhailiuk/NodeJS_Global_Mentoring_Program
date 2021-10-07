import csv from "csvtojson";
import {
  createReadCSVFileStream,
  createWriteTXTFileStream,
  outputFileType,
} from "./helpers";

export const createTXTFileFromCSV = (file) => {
  const fileName = file.split(".").slice(0, -1).join(".");
  createReadCSVFileStream(file)
    .pipe(csv())
    .pipe(createWriteTXTFileStream(fileName))
    .on("finish", () =>
      console.log(`File ${fileName}.${outputFileType} was created!`)
    )
    .on("error", console.error);
};
