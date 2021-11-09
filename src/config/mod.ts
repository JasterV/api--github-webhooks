import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

const { PORT = "3000", SECRET } = config({ safe: true });

const cnf = { port: PORT, secret: SECRET };

export default {
  get: (key: "port" | "secret") => cnf[key],
  validate: () => {
    if (!SECRET) throw new Error("SECRET required but not found");
  },
};
