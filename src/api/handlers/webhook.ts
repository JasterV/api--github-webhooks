import { Middleware } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {PUSH_EVENT} from "../constants.ts"

export const webhook = (): Middleware => async (ctx) => {
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = { message: "Bad request" };
    return;
  }
  const payload = await ctx.request.body().value
  // We get the github events that triggered the webhook
  const events: string[] = payload.hook.events
  // We prepare the response body, from now on we want to return
  // a success response no matter what
  ctx.response.body = { message: "SUCCESS" };
  console.log("webhook:called", "events", {events})
  if(!events.includes(PUSH_EVENT)) {
    // We are just looking for push events so if there is no push event just leave
    console.log("webhook", "no push event")
    return
  }
  // TODO: Get command to execute from env variable and execute it
  console.log("webhook", "done", "success")
};

