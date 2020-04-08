#!/usr/bin/env node

"use strict";

var util = require("util"); //enables use of util.promisify to create a oromise function from a callback funtion

var path = require("path"); //imports path module
var fs = require("fs"); //imports fs module

var sqlite3 = require("sqlite3"); //imports sqlite3 database module
// require("console.table");

// ************************************

const DB_PATH = path.join(__dirname, "my.db"); //sets the database path
const DB_SQL_PATH = path.join(__dirname, "mydb.sql"); //sets the path to the database schema
console.log(DB_SQL_PATH);
var args = require("minimist")(process.argv.slice(2), {
  string: ["other"],
}); //inludes minimist to help retreave arguments from the CLI

main().catch(console.error);

// ************************************
var SQL3;
async function main() {
  if (!args.other) {
    error("Missing '--other=..'"); //returns an error if no other argument is passed in the CLI
    return;
  }
  // define some SQLite3 database helpers
  var myDB = new sqlite3.Database(DB_PATH); //creates a new sql database
  SQL3 = {
    run(...args) {
      return new Promise(function c(resolve, reject) {
        myDB.run(...args, function onResult(err) {
          if (err) reject(err);
          else resolve(this);
        });
      });
    },
    //util.promisify() turns a function expecting a callback into one resolving to a promise
    get: util.promisify(myDB.get.bind(myDB)),
    all: util.promisify(myDB.all.bind(myDB)),
    exec: util.promisify(myDB.exec.bind(myDB)),
  };
  const DB_SQL_PATH = path.join(__dirname, "mydb.sql");
  var initSQL = fs.readFileSync(DB_SQL_PATH, "utf-8"); //fetches the database specifications from the schema file
  await SQL3.exec(initSQL).catch(error);

  var other = args.other; //assigns the arguments received from the CLI
  var something = Math.trunc(Math.random() * 1e9); //generates a random unique key for the passed argument

  // ***********

  var otherID = await insertOrLookupOther(other).catch(error);
  if (otherID) {
    let result = await insertSomething(otherID, something).catch(error);

    return;
  }
}

async function insertSomething(otherID, something) {
  let result = SQL.run(
    `INSERT INTO
		Something (otherID,data)
	VALUES
	(?,?)
		`,
    otherID,
    something,
  );
  if (result && result.changes > 0) {
    console.log("Successfully added something!");
  }
}

async function insertOrLookupOther() {
  SQL3 = SQL3;
  let result = await SQL3.get(
    `SELECT
			id
		FROM
			Other
		WHERE
			data = ?
		`,
    other,
  );
  if (result && result.id) {
    return result.id;
  } else {
    resullt = await SQL3.run(
      `
		  INSERT INTO
			  Other (data)
			  VALUES
			  (?)
			  
		  `,
      other,
    );
    if (result && result.lastID) {
      return result.lastID;
    }
  }
}

function error(err) {
  //handles errors
  if (err) {
    console.error(err.toString());
    console.log("");
  }
}
