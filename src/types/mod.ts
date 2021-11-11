export type ActionType = "push" | "pull_request" | "issue";

export type ActionsItem = { on: ActionType; command: string | string[] };

export type ActionsRecord = Record<"actions", ActionsItem[]>;

export type GithubEvent =
  | "PushEvent"
  | "IssueEvent"
  | "PullRequestEvent";

export interface ActionsModel {
  getActionFromGithubEvent: (event: GithubEvent) => string | string[];
  getAction: (ty: ActionType) => string | string[];
}
