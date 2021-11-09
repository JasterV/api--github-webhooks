import app from "./src/server.ts";
import config from "./src/config/mod.ts";

try {
  config.validate();
  const port = parseInt(config.get("port"));
  await app.listen({ port });
} catch (error) {
  console.error(error);
}
