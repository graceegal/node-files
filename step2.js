"use strict";

const fsP = require("fs/promises");

/** Given a path to a text file, read the contents. If it doesn't
 * exist, throw an error
 */
async function cat(path) {
  try {
    const contents = await fsP.readFile(path, "utf8");
    console.log("File Contents:", contents);
  } catch (err) {
    console.log(`Error Reading ${path}: \n ${err}`)
    process.exit(1);
  }
}

/** Given a url, log the text response. If the url is not valid, log an error
 * and exit.
 */
async function webCat(url) {
  try {
    const resp = await fetch(url);
    console.log(await resp.text())
  } catch (err) {
    console.log(`Error Fetching: ${url}: \n ${err}`)
    process.exit(1);
  }
}


let path = process.argv[2];

if(URL.canParse(path)) {
  webCat(path);
} else {
  cat(path);
}
