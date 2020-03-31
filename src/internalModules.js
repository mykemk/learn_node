//Accessing an internal module in Node:

//1. File system module (fs)
const fs = require('fs')
// readFileSync(path,encoding) is used to read a file synchronously
const file = fs.readFileSync('../exercises/modules/data.js',{encoding:'utf-8'}).toString();

//fs.writeFile(path,content) writes on a file

fs.writeFileSync('./lib.js','var name = "Myke"');
const lib = fs.readFileSync('./lib.js',{encoding:'utf-8'}).toString();
console.log(lib);

//2. http module used to make network based programs

//3. path module used for manipulating path strings and handling differences across OS's
