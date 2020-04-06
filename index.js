const converter = require("./converter");
const mkdir = require("./mkdir");
const pushS3Directory = require("./pushS3Directory");
const storeUrl = require("./storeUrl");
const db = require("./dbConn");

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
    await db.init();
    console.log("db connection initialized");
    let directory = converterCommands.output.split("/");
    directory = directory.splice(0, directory.length - 1).join("/");
    await mkdir(directory, { recursive: true });
    console.log(`Directory created ${directory}`)
    await converter(converterCommands);
    console.log("returning");
    // console.log("conversions done");
    await pushS3Directory(directory);
    await storeUrl({ url: converterCommands.output });
  } catch (error) {
    console.error(error);
    return;
  }
})();