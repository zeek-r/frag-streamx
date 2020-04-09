# About
---
```
This is a simple node based libray for:
- Generating different bitrate mpeg-dash streaming files using ffmpeg.
- Pushing the generated files to s3.
- Storing the s3 key to a mysql db.
```
## Building the library
---
- Clone this library
- Install ffmpeg library for your system
> sudo apt install ffmpeg
- cd into the directory
- Install dependencies
> npm i
---
- Use config below, only if pushing to s3.
- Copy config.json.example to config.json
> cp config.json.example config.json
- Config breakdown
  - "s3AccessKey": "access key for s3, only if files to be stored in s3",
  - "s3SecretKey": "secret key for s3",
  - "s3Region": "region for s3",
  - "bucket": "bucket name",
  - "parallelStreams": 3, Increase this value to push multiple files in parallel to s3
  - "mysqlHost": "mysql host",
  - "mysqlPort": "mysql port",
  - "mysqlUser": "mysql user",
  - "mysqlPassword": "mysql password",
  - "mysqlDb": "mysql database name",
  - "mysqlTable": "mysql table name to push details to",
  - "apiEndpoint": "api endpoint to append to s3 key for generating .mpd link, pass s3 bucket link if public bucket"

## Usage
> node index.js --input=[file].[ext] --output=[outputDir/[output].[ext] --scales=[wxh] db[optional] s3[optional]

### Usage breakdown
- --input=[file].[ext],
  - file, filename of the single input video file
  - ext, extension of the file
  - example: sample.mp4
- --output=[outputDir]/[output].[ext],
  - outputDir, the output directory for fragments as well as manifest files generated
  - output, the manifest file that stores segment details
  - ext, this should be .mpd
  - example: output/stream.mpd
- --scales=[wxh]
  - There should be no space between scales, only comma.
  - The first value is width, and second is height.
  - Pass as many scales required.
  - example: --scales=480:360,1280:720,1920:1080
- s3[optional]
  - Pass this option, only if the generated files are to be pushed to s3. 
  - The directory structured specified in --output= will be followed.
- db[optional]
  - pass db, only if you want to save the s3 key to mysql db.