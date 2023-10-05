import {
  isMavenProject,
  isGradleProject,
  convertMavenDependenciesToLicenses,
  removeDuplicates,
} from "../util";
import { License } from "../models";
import {
  getMavenDependenciesFromRootNode,
  getReportRootNode,
} from "./mavenDepReportParser.js";

export const findAllLicenses = (projectPath: string): License[] => {
  const isMaven = isMavenProject();
  const isGradle = isGradleProject();

  if (!isMaven && !isGradle) {
    throw new Error("The project is not a Maven or Gradle project.");
  }

  let licenses: License[] = [];

  if (isMaven) {
    const pathToPomXml = `${projectPath}/pom.xml`;
    const rootNode = getReportRootNode(pathToPomXml);
    const mavenDependencies = getMavenDependenciesFromRootNode(rootNode);

    licenses = convertMavenDependenciesToLicenses(mavenDependencies);
  }

  if (isGradle) {
    // TODO: implement Gradle
    throw new Error("Gradle is not yet implemented.");
  }

  // remove duplicates
  licenses = removeDuplicates(licenses);

  return licenses;
};
