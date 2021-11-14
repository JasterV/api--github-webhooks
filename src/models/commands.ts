export async function execute(cmd: string) {
  console.log(`Executing ${cmd}`);
  const process = Deno.run({
    cmd: cmd.split(" "),
    stdout: "piped",
    stderr: "piped",
  });
  const output = await process.output(); // "piped" must be set
  const error = await process.stderrOutput();
  const outStr = new TextDecoder().decode(output);
  const errorStr = new TextDecoder().decode(error);
  process.close();
  if (errorStr.trim().length > 0) throw new Error(errorStr);
  console.log(`Output: ${outStr}`)
  return outStr;
}

export async function executeN(cmds: string[]) {
  const outputs: string[] = [];
  await cmds.reduce(async (prev, cmd) => {
    await prev;
    outputs.push(await execute(cmd));
  }, Promise.resolve());
  return outputs;
}
