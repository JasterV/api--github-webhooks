import { Middleware } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { ActionsModel, ActionType } from "../types/mod.ts";
import { execute, executeN } from "../lib/commands.ts";

export default (actionsModel: ActionsModel): Middleware =>
  async ({request, response}) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { message: "Bad request" };
      return;
    }
    const body = await request.body()
    const headers = request.headers
    
    console.log("Got request", { payload: body.value, headers });
    try {
      // Get commands from github event
      const event = request.headers.get("x-github-event") || "";
      const commands = actionsModel.getCommands(event as ActionType);
      // Execute commands. If some command fails we log the error and reply back to github
      if (commands && Array.isArray(commands)) await executeN(commands);
      else if (commands) await execute(commands);
      // prepare already a success message
      response.body = { message: "SUCCESS" };
    } catch (error) {
      console.error(`Command failed: ${error.message}`)
      response.status = 500
      response.body = { message: error.message }
    }
  };
