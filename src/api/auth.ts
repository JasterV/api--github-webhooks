import { Middleware } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { hmac } from "https://deno.land/x/god_crypto@v1.4.10/mod.ts";

export default (secret: string): Middleware =>
  async (ctx, next) => {
    const payload = await ctx.request.body().value;
    const hash = ctx.request.headers.get("X-Hub-Signature-256");
    const signature = "sha256=" +
      hmac("sha256", secret, JSON.stringify(payload || "")).hex();
    console.log("Signature", signature);
    if (hash !== signature) {
      console.log("Unauthorized");
      ctx.response.status = 403;
      ctx.response.body = { message: "UNAUTHORIZED" };
      return;
    }
    await next();
  };
