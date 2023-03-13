import dotenv from "dotenv";

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

import { PORT_API, PUBLIC_API } from "utils/constants";
import connect from "./database/connect";
import logger from "utils/logger";

import app from "app";
import { runServices } from "services";

const AppCompilationStartedAt = Date.now();

logger.info("Application is starting...");

app.use((req, res, next) => {
  logger.info({
    flat: true,
    gray: "=>",
    white: `${req.method} ${req.originalUrl}`,
  });

  next();
});

runServices();

(async () => {
  // Connect to the database
  await connect();

  app.use(() => {
    console.log("toto");
  });

  app.listen(PORT_API, () => {
    logger.info(`Server is running at ${PUBLIC_API}:${PORT_API}`);

    const AppCompilationFinishedAt = Date.now();

    logger.info(
      `Application compiled in ${
        AppCompilationFinishedAt - AppCompilationStartedAt
      }ms`
    );
  });
})();
