import {
  parse as yamlParse,
} from "https://deno.land/std@0.82.0/encoding/yaml.ts";
import {ActionsRecord} from '../types/mod.ts'

export default async (path: string) => {
  const fileString = await Deno.readTextFile(path);
  const record = yamlParse(fileString) as ActionsRecord;

  return {
    validate: () => {},
    getActions: (event: string) => record?.actions[event],
  };
};
