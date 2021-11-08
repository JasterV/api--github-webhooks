# Deno github webhook server

An API Rest built with Deno to catch github events

## Run

```sh
deno run --allow-read --allow-env --allow-net src/app.ts
```

## Github webhook secret

When creating a github webhook from the repository webhooks UI, we need to provide a secret token.

Github is going to hash this token using a Hmac algorithm and send it to us using the 'X-Hub-Signature-256' header.

In order to secure our endpoint, we must set a middleware that signs our secret using the same Hmac algorithm and checks if it matches with the received hash.

Example:

```typescript
    const hash = request.headers.get("X-Hub-Signature-256")
    const signature = "sha256=" + hmac("sha256", secret, JSON.stringify(req.body)).hex()
    if (hash !== signature) {
      // Return an unauthorized error
    }
    await next();
```

## Webhook handler

The goal of this project is to execute a command when a certain event is received from Github.
In our case we are only listening for `push` events so we can execute a pull in our computer.

```typescript
// We get the github events that triggered the webhook
const events: string[] = req.body.hook.events
if(!events.includes(PUSH_EVENT)) {
    // We are just looking for push events so if there is no push event just leave
    return
}
// Execute the pull command or whatever we want to do
```
