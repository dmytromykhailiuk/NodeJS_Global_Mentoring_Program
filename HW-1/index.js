import * as tasks from "./tasks";

tasks[`task${process.env.TASK_NUMBER}`]();
