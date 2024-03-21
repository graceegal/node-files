"use strict";

const fsP = require("fs/promises");

/** Given a path to a text file, read the contents. If it doesn't
 * exist, throw an error
 */
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log(`Error Reading ${path}: \n ${err}`)
    process.exit(1);
  }
  console.log("File Contents:", contents);
}

/** Given a url, log the text response. If the url is not valid, log an error
 * and exit.
 */
async function webCat(url) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.log(`Error Fetching: ${url}: \n ${err}`)
    process.exit(1);
  }
  console.log(await resp.text());
}


let path = process.argv[2];

if(URL.canParse(path)) {
  webCat(path);
} else {
  cat(path);
}
