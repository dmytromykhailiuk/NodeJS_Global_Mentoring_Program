import { Transform } from "stream";
import { reverseChankString } from "./reverseChankString";

export const reverseStringStream = new Transform({
  transform(chank, _, callback) {
    callback(null, reverseChankString(chank.toString()));
  },
});
