import { Context, isHttpError } from "../deps.ts";

export default {
  handle(err: Error, ctx?: Context) {
    console.error("Error occurred", { message: err.message });
    let statusCode = 500;
    if (isHttpError(err)) {
      statusCode = err.status;
      return ctx?.throw(statusCode, err.message);
    }
    // If an unexpected error occurs, just exit gracefully
    // We previous log an the error so we can leave
    Deno.exit(0);
  },
};
