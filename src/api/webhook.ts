import { ActionsModel, ActionType } from "../types/mod.ts";
import { execute, executeN } from "../lib/commands.ts";
import { Middleware } from "../deps/oak.ts";

const GITHUB_EVENT = "x-github-event"

export default (actionsModel: ActionsModel): Middleware =>
  async ({request, response}) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { message: "Bad request" };
      return;
    }
    const body = await request.body().value
    const headers = request.headers

    console.log("Got request", { payload: body, headers });
    try {
      // Get commands from github event
      const event = request.headers.get(GITHUB_EVENT);
      const commands = actionsModel.getCommands(event as ActionType);
      // Execute commands. If some command fails we log the error and reply back to github
      if (commands && Array.isArray(commands)) await executeN(commands);
      else if (commands) await execute(commands);
      else console.error(`Event not found: ${event}`)
      // prepare already a success message
      response.body = { message: "SUCCESS" };
    } catch (error) {
      console.error(`Command failed: ${error.message}`)
      response.status = 500
      response.body = { message: error.message }
    }
  };
