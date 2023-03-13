import mongoose, { ConnectOptions } from "mongoose";
import logger from "utils/logger";
import { DATABASE_URI } from "utils/constants";

mongoose.set("strictQuery", true);

const db = mongoose.connection;

let attempts = 1;

const connect = async () => {
  try {
    await mongoose.connect(
      DATABASE_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    logger.info("Succesfully connected to database");
  } catch (error) {
    logger.error(error);
  }
};

db.on("error", async () => {
  if (attempts < 5) {
    attempts += 1;

    logger.warn(`${attempts} attempts to reconnect to database`);

    await connect();
  }
});

export default connect;
