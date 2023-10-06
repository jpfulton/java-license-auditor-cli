import { getConfiguration, getConfigurationFromUrl } from "./configuration.js";
import {
  convertMavenDependenciesToLicenses,
  convertMavenDependencyToLicense,
} from "./converters.js";
import { removeDuplicates } from "./duplicate-remover.js";
import { getLicensesMarkdown } from "./markdown-helpers.js";
import { LicenseOutputter, MetadataOutputter } from "./outputters.js";
import {
  getCurrentVersionString,
  getRootProjectName,
  isGradleProject,
  isMavenProject,
} from "./root-project.js";

export type { LicenseOutputter, MetadataOutputter };

export {
  convertMavenDependencyToLicense,
  convertMavenDependenciesToLicenses,
  getConfiguration,
  getConfigurationFromUrl,
  getCurrentVersionString,
  getLicensesMarkdown,
  getRootProjectName,
  isGradleProject,
  isMavenProject,
  removeDuplicates,
};
