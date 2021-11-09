export type ActionType = "push" | "pull_request" | "issue" | "comment";
export type ActionsRecord = Record<"actions", Record<ActionType, string>>;
export type GithubEvent =
  | "PushEvent"
  | "CommitCommentEvent"
  | "IssueEvent"
  | "PullRequestEvent";
