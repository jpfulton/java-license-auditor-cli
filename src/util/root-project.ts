import { readFileSync } from "fs";

import filedirname from "filedirname";
const [, dirname] = filedirname();

// return the version string from this module's package.json
export function getCurrentVersionString() {
  try {
    const packageJson = JSON.parse(
      readFileSync(`${dirname}/../../../package.json`).toString()
    );
    const version = packageJson?.version ?? "UNKNOWN";
    return version;
  } catch (e) {
    // this error happens when running the tests
    // which have a different path relationship to the package.json file
    return "UNKNOWN";
  }
}
