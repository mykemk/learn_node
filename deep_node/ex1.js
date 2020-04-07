"use strict";
const path = require("path");
const getStdin = require("get-stdin");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});

var BASE_PATH = process.env.BASE_PATH || __dirname;

if (args.help) {
  printHelp();
} else if (args.in || args._.includes("-")) {
  getStdin().then(processFile(contents.toString())).catch(error);
} else if (args.file) {
  let filePath = path.join(BASE_PATH, args.file);
  fs.readFile(filePath, function (err, contents) {
    if (err) {
      error(err.toString());
    }
    contents = contents.toString().toUpperCase();
    process.stdout.write(contents);
  });
} else {
  error("Incorect Usage", true);
}
//console.log(args.hello);

function error(msg, includeHelp = false) {
  console.log(msg);
  if (includeHelp) {
    console.log("");
    printHelp();
  }
}

//Function to offer help in the CLI
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

function processFile(contents) {
  console.log(contents.toUpperCase());
}
