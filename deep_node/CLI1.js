"use strict";
const path = require("path"); //Includes the path internal module
const getStdin = require("get-stdin"); //includes module used to get standard input from the CLI
const fs = require("fs");
//minimist is a remote module that helps retrieve arguments passed via a CLI
const args = require("minimist")(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});

var BASE_PATH = process.env.BASE_PATH || __dirname; //Cconfigures the base path to be set as an environment variable

if (args.help) {
  printHelp(); // shows the help when --help is passed as the argument
} else if (args.in || args._.includes("-")) {
  //if --in or - is passed, input is got from the standard input
  getStdin().then(processFile(contents.toString())).catch(error);
} else if (args.file) {
  let filePath = path.join(BASE_PATH, args.file); //gets the file path by joining the file name with the base url
  fs.readFile(filePath, function (err, contents) {
    if (err) {
      error(err.toString()); //prints the error incase of an error in reading the file
    }
    contents = contents.toString().toUpperCase();
    process.stdout.write(contents);
  });
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
function processFile(contents) {
  console.log(contents.toUpperCase());
}
