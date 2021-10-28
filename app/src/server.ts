import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './user';
import { APPLICATION_API as API } from './config';
import { DEFAULT_PORT } from './common';

const app: Application = express();

app.use(bodyParser.json());

app.use(`/${API.user}`, userRouter);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server running on port ${DEFAULT_PORT}`);
});
