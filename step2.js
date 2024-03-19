"use strict";

const fsP = require("fs/promises");

// FIXME: changeisUrl to URL.canParse()


//TODO: Doc strings!!
async function cat(path) {
  try {
    const contents = await fsP.readFile(path, "utf8");
    console.log("File Contents:", contents);
  } catch (err) {
    console.log(`Error Reading ${path}: \n ${err}`)
    process.exit(1);
  }
}

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

if(isUrl(path)) {
  webCat(path);
} else {
  cat(path);
}
