const AWS = require("aws-sdk");
const config = require("./config");
const fs = require("fs");

const pushS3Directory = async(directory) => {
  try {
    AWS.config.update({
      accessKeyId: config.s3AccessKey,
      secretAccessKey: config.s3SecretKey,
      region: config.s3Region
    });
  
    const s3 = new AWS.S3();
    
    const files = await fs.promises.readdir(`./${directory}`);
    
    let promises = [];
    let fileStreams = 0;
    
    for(let file of files) {
      fileStreams++;
      const stream = fs.createReadStream(`./${directory}/${file}`);
      const key = `${directory}/${file}`;
      const s3Params = {
        Key: key,
        Bucket: config.bucket,
        Body: stream
      };
      promises.push(s3.upload(s3Params).promise());
      if(fileStreams === config.parallelStreams) {
        const result = await Promise.all(promises);
        console.log(result);
      }
    }
    return;
  } catch (error) {
    console.error(error);
  }
}
module.exports = pushS3Directory