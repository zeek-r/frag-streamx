const { spawn } = require("child_process");


const processor = ({command = "" }) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, {
      shell: true
    });
    process.stdout.on("data",(data) => {
      console.log(data.toString())
    });
    process.stderr.on("data", (err) => {
      console.error(err.toString())
      reject(err)
    });
    process.on('close', (code) => {
      resolve(code)
    });
  })
}

module.exports = processor