"use strict";
const path = require("path");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"],
});

if (args.help) {
  printHelp();
} else if (args.file) {
  let filePath = path.resolve(args.file);
  processFile(filePath);
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
  console.log("");
}

function processFile(filePath) {
  let contents = fs.readFileSync(filePath, "utf8");
  process.stdout.write(contents);
  //console.log(contents);
}
