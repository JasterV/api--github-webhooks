import { Middleware } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {PUSH_EVENT} from "../constants.ts"

export const webhook = (): Middleware => async (ctx) => {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = { success: false, data: "Empty body" };
    return;
  }
  const payload = await ctx.request.body().value

  const events: string[] = payload.hook.events

  ctx.response.body = { success: true, data: "SUCCESS" };
  console.log("webhook:called", "events", {events})
  if(!events.includes(PUSH_EVENT)) {
    console.log("webhook", "no push event")
    return
  }

  // TODO: Get command to execute from env variable and execute it
  console.log("webhook", "done", "success")
};

