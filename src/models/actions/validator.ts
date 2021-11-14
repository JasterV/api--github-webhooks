import { FastestValidator } from "../../../deps.ts";

const v = new FastestValidator();

const check = v.compile({
  actions: {
    type: "array",
    items: {
      type: "object",
      props: {
        on: {
          type: "string",
          enum: ["push", "pull_request", "issues"],
        },
        command: [
          "string",
          {
            type: "array",
            items: "string",
          },
        ],
      },
    },
  },
});

export default {
  async validateActionsSchema(schema: any): Promise<void> {
    const valid = await check(schema);
    if (valid !== true) {
      throw new Error("Invalid actions file format");
    }
  },
};
