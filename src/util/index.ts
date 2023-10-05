import { getConfiguration, getConfigurationFromUrl } from "./configuration.js";
import { convertMavenDependencyToLicense } from "./converters.js";
import { LicenseOutputter, MetadataOutputter } from "./outputters.js";
import { getCurrentVersionString, getRootProjectName } from "./root-project.js";

export type { LicenseOutputter, MetadataOutputter };

export {
  convertMavenDependencyToLicense,
  getConfiguration,
  getConfigurationFromUrl,
  getCurrentVersionString,
  getRootProjectName,
};
