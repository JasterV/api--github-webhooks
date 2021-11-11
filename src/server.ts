import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import WebhookRouter from "./api/routes.ts";
import errorHandler from "./errorHandler.ts";
import { ActionsModelImpl } from "./lib/actions/mod.ts";
import config from "./config/mod.ts";

const ACTIONS_FILE_PATH = "./actions.yaml";
const GITHUB_SECRET = config.get("secret");

export default async () => {
  const actionsModel = await ActionsModelImpl(ACTIONS_FILE_PATH);
  const router = WebhookRouter({ secret: GITHUB_SECRET, actionsModel });
  const app = new Application();

  // Error handling
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      errorHandler.handle(err, ctx);
    }
  });

  // Handle Uncaught errors
  app.addEventListener("error", (evt) => errorHandler.handle(evt.error));

  // Add routes
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
};
