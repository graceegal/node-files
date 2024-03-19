"use strict";

const fsP = require("fs/promises");

async function cat(path) {
  let contents
  try {
    contents = await fsP.readFile(path, "utf8"); //limit code inside try block
  } catch (err) {
    console.log("Error:", err)
    process.exit(1);
  }
  console.log("File Contents", contents);
}

cat(process.argv[2]);