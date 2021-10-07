import { inputFileType } from "./constants";

export const isCSVFile = (fileString) => {
  const chanks = fileString.split(".");
  return chanks[chanks.length - 1] === inputFileType;
};
