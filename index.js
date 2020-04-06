const converter = require("./converter");
const mkdir = require("./mkdir");
const pushS3Directory = require("./pushS3Directory");

const parser = {
  "--input": (command) => {
    return { input: command.split("=")[1] };
  },
  "--output": (command) => {
    return { output: command.split("=")[1] };
  },
  "--scales": (command) => {
    return { scales: command.split("=")[1].split(",") };
  },
  "--opts": (command) => {
    return { opts: command.split("=")[1] };
  },
};

(async () => {
  const cliOps = process.argv.slice(2);
  let converterCommands = {};

  for (let ops of cliOps) {
    console.log(ops);
    const flag = ops.split("=")[0];
    if (parser[flag]) {
      converterCommands = { ...converterCommands, ...parser[flag](ops) }
    }
  }
  try {
    let directory = converterCommands.output.split("/");
    directory = directory.splice(0, directory.length - 1).join("/");
    await mkdir(directory, { recursive: true });
    await converter(converterCommands);
    await pushS3Directory(directory);

  } catch (error) {
    console.error(error);
  }
})();