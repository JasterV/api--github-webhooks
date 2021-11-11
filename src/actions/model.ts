import {
  parse as yamlParse,
} from "https://deno.land/std@0.82.0/encoding/yaml.ts";
import {
  ActionsModel,
  ActionsRecord,
  ActionType,
  GithubEvent,
} from "../types/mod.ts";
import validator from "./validator.ts";

const eventToActionType: { [key in GithubEvent]: ActionType } = {
  PushEvent: "push",
  IssueEvent: "issue",
  PullRequestEvent: "pull_request",
};

export default async (path: string): Promise<ActionsModel> => {
  const fileString = await Deno.readTextFile(path);
  const record = yamlParse(fileString) as ActionsRecord;
  await validator.validateActionsSchema(record);

  console.log("Actions file loaded", { content: record });

  return {
    getActionFromGithubEvent: (event: GithubEvent) => {
      const action = eventToActionType[event];
      if (!action) return [];
      return record.actions.find((a) => a.on == action)!.command;
    },
    getAction: (ty: ActionType) =>
      record.actions.find((a) => a.on == ty)!.command,
  };
};
