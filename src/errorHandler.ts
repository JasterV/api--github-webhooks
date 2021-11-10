import { Context } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { isHttpError } from "https://deno.land/x/oak@v9.0.1/mod.ts";

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
