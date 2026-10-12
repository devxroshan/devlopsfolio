import { InternalServerException } from "../config/http-exceptions.js";

const isDevelopment = process.env.NODE_ENV === "dev";

export const logger = {
  error(message: string, error?: unknown) {
    if (isDevelopment) {
      console.error(message, error);
    } else {
      throw new InternalServerException(
        "Some error occured. Please try again later.",
      );
    }
  },

  info(message: string) {
    if (isDevelopment) {
      console.info(message);
    }
  },
};
