
const processor = require("./processor");

const mapGenerator = () => "-map 0:v:0 -map 0:a\?:0 ";

const scaleBandwidthMap = {
  "480:360": "350k",
  "858:480": "1000k",
  "1280:720": "3000k",
  "1920:1080": "4000k",
}
const scaleGenerator =
  ({ scaleNo = "0", vidFilter = "libx264", scale = "480:360" }) =>
    `-b:v:${scaleNo} ${scaleBandwidthMap[scale]} -c:v:${scaleNo} ${vidFilter} -filter:v:${scaleNo} "scale=${scale}" `;

const optsGenerator =
  ({ opts = "" }) =>
    `${opts} -use_timeline 1 -use_template 1 -adaptation_sets "id=0,streams=v  id=1,streams=a" `;

const baseCommand = ({ input, output, maps, scales, options }) =>
  `ffmpeg -y -r 24 -re -i ${input} \
  ${ maps} \
  ${ scales} \
  ${ options} \
  -f dash ${output}
  `;

// const converterScript = `ffmpeg - i sample.mp4 \
// -map 0: v: 0 - map 0: a\?: 0 - map 0: v: 0 - map 0: a\?: 0 - map 0: v: 0 - map 0: a\?: 0 - map 0: v: 0 - map 0: a\?: 0 \
// -b: v: 0 350k - c: v: 0 libx264 - filter: v: 0 "scale=480:360"  \
// -b: v: 1 1000k - c: v: 1 libx264 - filter: v: 1 "scale=858:480"  \
// -b: v: 2 3000k - c: v: 2 libx264 - filter: v: 2 "scale=1280:720" \
// -b: v: 3 4000k - c: v: 3 libx264 - filter: v: 2 "scale=1920:1080" \
// -use_timeline 1 - use_template 1 - adaptation_sets "id=0,streams=v  id=1,streams=a" \
// -f dash output / output.mpd`

const converter = ({ input = "", output = "", options = "", scales = [] }) => {
  let scalesOps = "";
  let mapsOps = "";
  const opts = optsGenerator({ opts: options });
  let index = 0;

  for (let scale of scales) {
    console.log("index", index, scale);
    scalesOps += scaleGenerator({ scaleNo: index, scale: scale });
    mapsOps += mapGenerator();
    index++;
  }

  const conversionCommand = baseCommand({ input: input, output: output, options: opts, maps: mapsOps, scales: scalesOps });
  return processor({command: conversionCommand})
}

module.exports = converter