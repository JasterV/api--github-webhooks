import app from "./src/api/mod.ts";
import config from "./src/config/mod.ts";

try {
  config.validate();
  const port = parseInt(config.get("port"));
  await app.listen({ port });
} catch (error) {
  console.error(error);
}
