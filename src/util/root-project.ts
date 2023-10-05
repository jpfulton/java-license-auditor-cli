import { existsSync, readFileSync } from "fs";

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

// return true if the root project is a maven project
// this can be determined by the existence of a pom.xml file
// in the root directory
export const isMavenProject = () => {
  if (existsSync(`${dirname}/../../../pom.xml`)) {
    return true;
  } else {
    return false;
  }
};

// return true if the root project is a gradle project
// this can be determined by the existence of a build.gradle file
// in the root directory
export const isGradleProject = () => {
  if (existsSync(`${dirname}/../../../build.gradle`)) {
    return true;
  } else {
    return false;
  }
};

// return the name of the root project
export const getRootProjectName = () => {
  if (isMavenProject()) {
    return getMavenProjectName();
  } else if (isGradleProject()) {
    return getGradleProjectName();
  } else {
    throw new Error(
      "Could not determine root project name. Only maven and gradle projects are supported."
    );
  }
};

// return the name of the root project from the pom.xml file
// at the root of the project
export const getMavenProjectName = () => {
  return getMavenProjectNameFromPomXml(`${dirname}/../../../pom.xml`);
};

// return the name of a project from a pom.xml file
// specified by filename
export const getMavenProjectNameFromPomXml = (filename: string) => {
  const pomXml = getFileContents(filename);
  const artifactId = pomXml.match(/<artifactId>(.*)<\/artifactId>/)?.[1] ?? "";
  const groupId = pomXml.match(/<groupId>(.*)<\/groupId>/)?.[1] ?? "";
  const name = `${groupId}:${artifactId}`;
  return name;
};

// return the contents of a file specified by filename as a string
export const getFileContents = (filename: string) => {
  return readFileSync(filename).toString();
};

export const getGradleProjectName = () => {
  // TODO: implement Gradle project name retrieval
  throw new Error("Not implemented.");
};
