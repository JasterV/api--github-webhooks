import { Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { webhook } from "./handlers/mod.ts";
import { auth } from "./middlewares/mod.ts";

const router = new Router();

router.post("/webhook", auth(), webhook);

export default router;
