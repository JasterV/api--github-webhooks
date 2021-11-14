FROM denoland/deno:1.16.1

ENV PORT=5004

# The port that your application listens to.
EXPOSE ${PORT}

WORKDIR /app

# Prefer not to run as root.
USER deno

COPY deps.ts .
COPY app.ts .
COPY src ./src
COPY config ./config

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in app.ts
RUN deno cache deps.ts
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache app.ts

CMD ["run", "--allow-read", "--allow-env", "--allow-write", "--allow-run", "--allow-net", "app.ts"]