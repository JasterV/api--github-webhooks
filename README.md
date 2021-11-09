# Deno github webhook server

An API Rest built with Deno to catch github events

## Run

```sh
deno run --allow-read --allow-env --allow-net app.ts
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
