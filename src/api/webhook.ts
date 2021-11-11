import { Middleware } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { ActionsModel } from "../types/mod.ts";

export default (actionsModel: ActionsModel): Middleware =>
  async (ctx) => {
    if (!ctx.request.hasBody) {
      ctx.response.status = 400;
      ctx.response.body = { message: "Bad request" };
      return;
    }
    const payload = await ctx.request.body().value;
    const headers = ctx.request.headers
    const event = ctx.request.headers.get('x-github-event')
    console.log("Got request", { payload, headers });
    // TODO: Get github event and map it to action type
    // TODO: Get commands to execute from actions and execute it
    ctx.response.body = { message: "SUCCESS" };
  };
