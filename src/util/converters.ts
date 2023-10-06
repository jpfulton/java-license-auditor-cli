import { License, MavenDependency, MavenLicense } from "../models";

export const convertMavenDependencyToLicense = (
  mavenDependency: MavenDependency,
  rootProjectName: string
): License => {
  const license: License = {
    rootProjectName: rootProjectName,
    name: mavenDependency.groupId + ":" + mavenDependency.artifactId,
    version: mavenDependency.version,
    licenses:
      mavenDependency.licenses?.map(
        (mavenLicense: MavenLicense) => mavenLicense.name
      ) || [],
    licenseUrl:
      mavenDependency.licenses?.map(
        (mavenLicense: MavenLicense) => mavenLicense.url
      ) || "",
    publisher: mavenDependency.groupId,
    repository: mavenDependency.url || "",
  };

  return license;
};

export const convertMavenDependenciesToLicenses = (
  mavenDependencies: MavenDependency[],
  rootProjectName: string
): License[] => {
  return mavenDependencies.map((mavenDependency) => {
    return convertMavenDependencyToLicense(mavenDependency, rootProjectName);
  });
};
