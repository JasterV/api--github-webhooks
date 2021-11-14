import { Middleware } from '../deps/oak.ts';
import { hmac } from "../deps/crypto.ts";

const SIGNATURE_HEADER = "X-Hub-Signature-256"

export default (secret: string): Middleware =>
  async (ctx, next) => {
    const payload = await ctx.request.body().value;
    const hash = ctx.request.headers.get(SIGNATURE_HEADER);
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
