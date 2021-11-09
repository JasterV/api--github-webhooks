export type ActionsRecord = Record<"actions", Record<string, string>>

export type GithubEvent = 'push' | 'pull_request' 