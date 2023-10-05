import { License, MavenDependency, MavenLicense } from "../models";
import { getMavenProjectName } from "./root-project.js";

export const convertMavenDependencyToLicense = (
  mavenDependency: MavenDependency
): License => {
  const rootProjectName = getMavenProjectName();

  const license: License = {
    rootProjectName: rootProjectName,
    name: mavenDependency.groupId + ":" + mavenDependency.artifactId,
    version: mavenDependency.version,
    licenses:
      mavenDependency.licenses?.map(
        (mavenLicense: MavenLicense) => mavenLicense.name
      ) || [],
    publisher: mavenDependency.groupId,
    repository: mavenDependency.url || "",
    licensePath:
      mavenDependency.licenses
        ?.map((mavenLicense: MavenLicense) => mavenLicense.url)
        .join(", ") || "",
  };

  return license;
};
