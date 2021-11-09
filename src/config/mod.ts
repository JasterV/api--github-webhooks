import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

const { PORT, SECRET } = config({ safe: true });

const cnf = {
  port: PORT || "3000",
  secret: SECRET,
};

export default {
  get: (key: "port" | "secret") => cnf[key],
  validate: () => {
    if (!SECRET) throw new Error("SECRET required but not found");
  },
};
