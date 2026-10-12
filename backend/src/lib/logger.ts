import { env } from "../config/env.js";
import { InternalServerException } from "../config/http-exceptions.js";

export const logger = {
  error(message: string, error?: unknown) {
    if (env.isDevelopment) {
      console.error(message, error);
    } else {
      throw new InternalServerException(
        "Some error occured. Please try again later.",
      );
    }
  },

  info(message: string) {
    if (env.isDevelopment) {
      console.info(message);
    }
  },
};
