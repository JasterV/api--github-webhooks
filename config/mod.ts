import { config } from "../deps.ts";

const { PORT, SECRET, ACTIONS_FILE_PATH } = config();

const cnf = { 
  port: PORT || Deno.env.get('PORT'), 
  secret: SECRET || Deno.env.get('SECRET'),
  actionsFilePath: ACTIONS_FILE_PATH || Deno.env.get('ACTIONS_FILE_PATH') || '/actions.yaml'
};

console.log("Loaded config", cnf)

export default {
  get: (key: "port" | "secret" | "actionsFilePath") => cnf[key] || null,
  validate: () => {
    if (!cnf.secret) throw new Error("SECRET required but not found");
    if (!cnf.port) throw new Error("PORT required but not found");
  },
};
