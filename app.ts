import App from "./src/server.ts";
import config from "./src/config/mod.ts";
import errorHandler from "./src/errorHandler.ts";

try {
  config.validate();
  const port = parseInt(config.get("port"));

  const app = await App();

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
