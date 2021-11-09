import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import router from "./routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
