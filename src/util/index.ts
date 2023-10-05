import { getConfiguration, getConfigurationFromUrl } from "./configuration.js";
import { convertMavenDependencyToLicense } from "./converters.js";
import { removeDuplicates } from "./duplicate-remover.js";
import { LicenseOutputter, MetadataOutputter } from "./outputters.js";
import { getCurrentVersionString, getRootProjectName } from "./root-project.js";

export type { LicenseOutputter, MetadataOutputter };

export {
  convertMavenDependencyToLicense,
  removeDuplicates,
  getConfiguration,
  getConfigurationFromUrl,
  getCurrentVersionString,
  getRootProjectName,
};
