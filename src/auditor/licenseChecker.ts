import {
  isMavenProject,
  isGradleProject,
  convertMavenDependenciesToLicenses,
  removeDuplicates,
  getRootProjectName,
} from "../util";
import { License } from "../models";
import {
  getMavenDependenciesFromRootNode,
  getReportRootNode,
} from "./mavenDepReportParser.js";
import { LicenseOutputter, MetadataOutputter } from "../util";
import { parserFactory } from "./parseLicenses.js";

export const findAllLicenses = (projectPath: string): License[] => {
  const isMaven = isMavenProject();
  const isGradle = isGradleProject();

  if (!isMaven && !isGradle) {
    throw new Error("The project is not a Maven or Gradle project.");
  }

  let licenses: License[] = [];

  if (isMaven) {
    const rootProjectName = getRootProjectName(projectPath);
    const pathToPomXml = `${projectPath}/pom.xml`;
    const rootNode = getReportRootNode(pathToPomXml);
    const mavenDependencies = getMavenDependenciesFromRootNode(rootNode);

    licenses = convertMavenDependenciesToLicenses(
      mavenDependencies,
      rootProjectName
    );
  }

  if (isGradle) {
    // TODO: implement Gradle
    throw new Error("Gradle is not yet implemented.");
  }

  // remove duplicates
  licenses = removeDuplicates(licenses);

  return licenses;
};

export const checkLicenses = (
  whitelistedLicenses: string[],
  blacklistedLicenses: string[],
  projectPath: string,
  metadataOutputter: MetadataOutputter,
  infoOutputter: LicenseOutputter,
  warnOutputter: LicenseOutputter,
  errorOutputter: LicenseOutputter
) => {
  if (!projectPath) {
    return console.error("No project path provided.");
  }

  try {
    const licenses = findAllLicenses(projectPath);

    if (!licenses || licenses.length <= 0) {
      return console.error("No dependencies found.");
    }

    const parse = parserFactory(
      whitelistedLicenses,
      blacklistedLicenses,
      infoOutputter,
      warnOutputter,
      errorOutputter
    );

    const result = parse(licenses);
    const {
      uniqueCount,
      whitelistedCount,
      warnCount,
      blacklistedCount,
      outputs,
    } = result;

    metadataOutputter(
      uniqueCount,
      whitelistedCount,
      warnCount,
      blacklistedCount
    );

    outputs.forEach((output) => console.log(output));
  } catch (err) {
    console.error((err as Error).message);
  }
};

export default checkLicenses;
