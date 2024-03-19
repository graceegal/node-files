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
    console.log(`Error Reading ${path}: \n ${err}`);
    process.exit(1);
  }
  return contents;
}

/** Given a url, log the text response. If the url is not valid, log an error
 * and exit.
 */
async function webCat(url) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.log(`Error Fetching: ${url}: \n ${err}`);
    process.exit(1);
  }
  return await resp.text();
}

async function write(path, data) {
  try {
    await fsP.writeFile(path, data, "utf8");
  } catch (err) {
    console.error(`Couldn't write ${path}\n  ${err}`);
    process.exit(1);
  }
}

/** Checks command line arguments to see if file should be logged or
 * written into a new text file. If, read only, logs the text. If "--out" is
 * included in command line, write to new file.
  */
async function checkReadOrWrite() {
  if(process.argv[2] === "--out") {
    let outputPath = process.argv[3];
    let inputPath = process.argv[4];
    writeToFile(outputPath, inputPath)
  } else {
    let path = process.argv[2];
    readPath(path);
  }
}

/** Checks to see if the input is a url. If so, invoke respective function
 * to write to a new text file.
 */
async function writeToFile(outputPath, inputPath) {
  if(URL.canParse(inputPath)) {
    const content = await webCat(inputPath);
    write(outputPath, content);
  } else {
    const content = await cat(inputPath);
    write(outputPath, content)
  }
}

/** Checks to see if the input is a url. If so, invoke respective function
 * to log the path.
 */
async function readPath(path) {
  if(URL.canParse(path)) {
    console.log(await webCat(path));
  } else {
    console.log(await cat(path));
  }
}

checkReadOrWrite();






