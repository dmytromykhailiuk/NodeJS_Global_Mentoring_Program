import { reverseStringStream } from "./helpers";

export default () =>
  process.stdin.pipe(reverseStringStream).pipe(process.stdout);
