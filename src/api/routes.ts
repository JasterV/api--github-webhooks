import { ActionsModel } from "../types/mod.ts";
import { Router } from "../../deps.ts";
import webhook from "./webhook.ts";
import auth from "./auth.ts";

export default (
  { secret, actionsModel }: { secret: string; actionsModel: ActionsModel },
) => {
  const router = new Router();
  router.post(`/webhooks/${secret}`, auth(secret), webhook(actionsModel));
  return router;
};
