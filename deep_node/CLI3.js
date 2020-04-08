"use strict";
const path = require("path"); //Includes the path internal module
const fs = require("fs");
const zlib = require("zlib"); //a module used for compression and decompression
const Transform = require("stream").Transform; //Helps transform a stream
//minimist is a remote module that helps retrieve arguments passed via a CLI
const args = require("minimist")(process.argv.slice(2), {
  boolean: ["help", "out", "compress", "uncompress"],
  string: ["file"],
});

var BASE_PATH = process.env.BASE_PATH || __dirname; //Configures the base path to be set as an environment variable

if (args.help) {
  printHelp(); // shows the help when --help is passed as the argument
} else if (args.file) {
  let filePath = path.join(BASE_PATH, args.file); //gets the file path by joining the file name with the base url
  let stream = fs.createReadStream(filePath);
  processFile(stream)
    .then(function () {
      console.log("Completed Successfully");
    })
    .catch(error(error));
} else {
  error("Incorect Usage", true); //shows an error message and suggested help incase of an error
}
//console.log(args.hello);

function error(msg, includeHelp = false) {
  console.log(msg); //function to  handle errors in the CLI
  if (includeHelp) {
    console.log("");
    printHelp();
  }
}

//Function to offer help on how to use the CLI
function printHelp() {
  console.log("ex3 usage");
  console.log("  ex3.js --help");
  console.log("ex1 --file={FILENAME}");
  console.log("");
  console.log("--help                   print this help");
  console.log("--file={FILENAME}        process the file");
  console.log("--in, -                  process stdin file");
  console.log("--out                    print file to stdout");
  console.log("--compress               gzip the output");
  console.log("--uncompress             gunzip the output");
}
//processes the given file contents by converting all letters to uppercase

function streamComplete(stream) {
  //returns a promise once a stream is complete
  return new Promise(function resolved(res) {
    stream.on("end", res);
  });
}

async function processFile(inStream) {
  let outStream = inStream;
  let upperStream = new Transform({
    //Transform helps in transforming a chunk in a stream
    transform(chunk, enc, next) {
      //takes in 3 arguments; a chuck, an encoding  and a function to show end of a transform
      this.push(chunk.toString().toUpperCase()); //transforms a chunk to uppercase
      next();
    },
  });
  var OUTFILE = path.join(BASE_PATH, "out.txt"); //path.join helps create a full path by joining the base path to the file name

  if (args.compress) {
    //file compression logic if --compress flag is passed on the CLI
    let gzipStream = zlib.createGzip(); //uses zlib library to create a compression stream
    outStream = outStream.pipe(gzipStream);
    OUTFILE = `${OUTFILE}.gz`; //changes the extension of the output file to that of a gzip file
  }

  if (args.uncompress) {
    let gunzip = zlib.createGunzip(); //helps unzip a file when --uncompress flag is passed in the CLI
    outStream = outStream.pipe(gunzip); //streams the output to an unzip file
    OUTFILE = `${OUTFILE}`;
  }

  let targetStream; //stream on where to output

  if (args.out) {
    targetStream = process.stdout; // if an --out flag is passed, then the output happens on the console
  } else {
    targetStream = fs.createWriteStream(OUTFILE); //a new file is created with the output stream
  }
  outStream = outStream.pipe(upperStream); //the uppercase stream created by transform() method is piped to the output stream
  outStream.pipe(targetStream);
  await streamComplete(outStream);
}
