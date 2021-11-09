import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { webhook } from "./handlers/mod.ts";
import { auth } from "./middlewares/mod.ts";
import config from "../config/mod.ts";

const GITHUB_SECRET = config.get("secret");

const router = new Router();

router.post("/webhook", auth(GITHUB_SECRET), webhook());

export default router;
