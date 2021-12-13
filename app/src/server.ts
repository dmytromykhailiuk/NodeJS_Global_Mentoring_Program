import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userRouter } from './user';
import { groupRouter } from './group';
import { APPLICATION_API as API, sequelize, logger } from './config';
import { DEFAULT_PORT } from './common';

(async () => {
  const PORT = process.env.PORT || DEFAULT_PORT;

  const app: Application = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(`/${API.user}`, userRouter);
  app.use(`/${API.group}`, groupRouter);

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT || DEFAULT_PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (e) {
    logger.error(`500 - Creating server failed: ${e}`);
  }
})();

process.on('uncaughtException', (err, origin) => {
  logger.error(`500 - Creating server failed: ${err}, ${origin}`);
});
