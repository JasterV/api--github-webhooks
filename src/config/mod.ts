import { config } from "../deps/dotenv.ts";

const { PORT = "3000", SECRET, ACTIONS_FILE_PATH = './actions.yaml' } = config({ safe: true });

const cnf = { port: PORT, secret: SECRET, actionsFilePath: ACTIONS_FILE_PATH };

export default {
  get: (key: "port" | "secret" | 'actionsFilePath') => cnf[key],
  validate: () => {
    if (!SECRET) throw new Error("SECRET required but not found");
  },
};
