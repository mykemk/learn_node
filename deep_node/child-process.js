"use strict";

// var fetch = require("node-fetch");

// ************************************

const HTTP_PORT = 8039;

main().catch(() => 1);

// ************************************

async function main() {
  //let k = 0;
  for (i = 0; i < 10000000000000000000000000000000000; i++) {
    let x = x + i;
    process.stdout(x);
  }
}
