import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import router from "./routes.ts";
import logger from "https://deno.land/x/oak_logger@1.0.0/mod.ts";

const app = new Application();

app.use(logger.logger);
app.use(logger.responseTime);

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
