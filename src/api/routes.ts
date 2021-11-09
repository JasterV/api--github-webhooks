import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import webhook from "./webhook.ts";
import auth from "./auth.ts";
import config from "../config/mod.ts";

const GITHUB_SECRET = config.get("secret");

const router = new Router();

router.post(`/webhook/${GITHUB_SECRET}`, auth(GITHUB_SECRET), webhook());

export default router;
