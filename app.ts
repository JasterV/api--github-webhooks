import errorHandler from "./src/errorHandler.ts";
import config from "./config/mod.ts";
import App from "./src/server.ts";

try {
  config.validate();
  const port = parseInt(config.get("port") as string);

  const app = await App();

  app.use(async (ctx, next) => {
    console.log("Request received", {Request: ctx.request})
    await next()
  })

  app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(
      `Listening on: ${secure ? "https://" : "http://"}${
        hostname ?? "localhost"
      }:${port}`,
    );
  });

  await app.listen({ port });
} catch (error) {
  errorHandler.handle(error);
}
