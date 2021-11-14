import { ActionsModel, ActionsRecord, ActionType } from "../../types/mod.ts";
import { yamlParse } from "../../../deps.ts";
import validator from "./validator.ts";

export default async (path: string): Promise<ActionsModel> => {
  const fileString = await Deno.readTextFile(path);
  const record = yamlParse(fileString) as ActionsRecord;
  await validator.validateActionsSchema(record);

  console.log("Actions file loaded", { content: record });

  return {
    getCommands: (ty: ActionType) =>
      record.actions.find((a) => a.on == ty)?.command,
  };
};
