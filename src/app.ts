import app from "./api/server.ts";
import config from "./config/mod.ts";

try {
  config.validate();
  const port = parseInt(config.get("port"));
  await app.listen({ port });
} catch (error) {
  console.error(error);
}
