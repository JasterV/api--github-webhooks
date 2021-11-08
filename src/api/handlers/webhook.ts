import { RouterContext } from "https://deno.land/x/oak@v7.7.0/mod.ts";

export const webhook = () => async ({ response, request }: RouterContext) => {
  const body = await request.body();

  console.log("Request body", body)

  if (!request.hasBody) {
    response.status = 400;
    response.body = { success: false, data: "Empty body" };
    return;
  }

  response.body = { success: true, data: "SUCCESS" };
};

