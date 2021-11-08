import { RouterContext } from "https://deno.land/x/oak@v9.0.1/mod.ts";

export const auth = () => async (
    { response, request }: RouterContext,
    next: () => Promise<unknown>
  ) => {
    const authHeader: string | null = request.headers.get("authorization");

    if (!authHeader) {
      response.status = 403;
      response.body = { success: false, msg: "Unauthorized" };
      return;
    }

    await next();
  };
