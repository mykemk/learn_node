"use strict";

var util = require("util");
var childProc = require("child_process");

// ************************************

const HTTP_PORT = 8039;
// const MAX_CHILDREN = 5;

var delay = util.promisify(setTimeout);

main().catch(console.error);

// ************************************

async function main() {
  let child = childProc.spawn("node", ["child-process.js"]);
  child.on("exit", (code) => console.log("Child finished", code));
  console.log(`Load testing http://localhost:${HTTP_PORT}...`);
}
