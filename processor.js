const { spawn } = require("child_process");


const processor = ({command = "" }) => {
  return new Promise((resolve, reject) => {
    const ps = spawn(command,{
      stdio: "inherit",
      shell: true
    });
    ps.on('close', (code) => {
      console.log("Exit code", code);
      resolve()
    });
    ps.on('exit', (code) => {
      console.log("Exit code", code);
      resolve();
    })
  })
}

module.exports = processor