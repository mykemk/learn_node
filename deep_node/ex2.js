"use strict";
const path = require("path"); //Includes the path internal module
const fs = require("fs");
//minimist is a remote module that helps retrieve arguments passed via a CLI
const args = require("minimist")(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"],
});

var BASE_PATH = process.env.BASE_PATH || __dirname; //Cconfigures the base path to be set as an environment variable

if (args.help) {
  printHelp(); // shows the help when --help is passed as the argument
} else if (args.file) {
  let filePath = path.join(BASE_PATH, args.file); //gets the file path by joining the file name with the base url
  let stream = fs.createReadStream(filePath);
  processFile(stream);
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
  console.log("ex1 usage");
  console.log("  ex1.js --help");
  console.log("ex1 --file={FILENAME}");
  console.log("");
  console.log("--help                   print this help");
  console.log("--file={FILENAME}        process the file");
  console.log("--in, -                  process stdin file");
  console.log("");
}
//processes the given file contents by converting all letters to uppercase
function processFile(inStream) {
  let outStream = inStream;
  let targetStream = process.stdout;
  outStream.pipe(targetStream);
}
