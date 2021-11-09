import { Middleware } from "https://deno.land/x/oak@v9.0.1/mod.ts";

export default (): Middleware =>
  async (ctx) => {
    if (!ctx.request.hasBody) {
      ctx.response.status = 400;
      ctx.response.body = { message: "Bad request" };
      return;
    }
    const _payload = await ctx.request.body().value;
    // TODO: Get github event and map it to action type
    // TODO: Get commands to execute from actions and execute it
    ctx.response.body = { message: "SUCCESS" };
  };
