export type ActionType = "push" | "pull_request" | "issues";

export type ActionsItem = { on: ActionType; command: string | string[] };

export type ActionsRecord = Record<"actions", ActionsItem[]>;

export interface ActionsModel {
  getAction: (ty: ActionType) => string | string[];
}
