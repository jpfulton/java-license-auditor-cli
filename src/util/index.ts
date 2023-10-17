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
  convertMavenDependenciesToLicenses,
  convertMavenDependencyToLicense,
  getCurrentVersionString,
  getLicensesMarkdown,
  getRootProjectName,
  isGradleProject,
  isMavenProject,
  removeDuplicates,
};
