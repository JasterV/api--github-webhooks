import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { ActionsModel } from "../types/mod.ts";
import webhook from "./webhook.ts";
import auth from "./auth.ts";

export default (
  { secret, actionsModel }: { secret: string; actionsModel: ActionsModel },
) => {
  const router = new Router();
  router.post(`/webhook/${secret}`, auth(secret), webhook(actionsModel));
  return router;
};
