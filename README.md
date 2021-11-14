# Deno github webhook server

An API Rest built with Deno to catch github events

## Run

```sh
make start
```

## Github webhook secret

When creating a github webhook from the repository webhooks UI, we need to
provide a secret token.

Github is going to hash this token using a Hmac algorithm and send it to us
using the 'X-Hub-Signature-256' header.

In order to secure our endpoint, we must set a middleware that signs our secret
using the same Hmac algorithm and checks if it matches with the received hash.

Example:

```typescript
const hash = request.headers.get("X-Hub-Signature-256");
const signature = "sha256=" +
  hmac("sha256", secret, JSON.stringify(req.body)).hex();
if (hash !== signature) {
  // Return an unauthorized error
}
next();
```

## Get the github event

We can get the github event from the `x-github-event` header. Then, to get more
data about this event we can look at the payload received in the body of the
request.

## Actions file

The actions file defines which commands to execute when a certain event is
received.

Example:

```yaml
actions:
  - on: push
    command: "echo 'Hello World'"
  - on: pull_request
    command: 
      - "mkdir ./patata"
      - "rmdir ./patata"
      - "touch patata/mypatata.txt"
      - "tree patata"
```

Right now it only supports push, pull requests and issues, and does not support
specifying a branch. But it will be implemented on demand (For sure I want to be
able to trigger the push event only when it happens on a certain branch).
