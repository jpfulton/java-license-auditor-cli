import { getConfiguration, getConfigurationFromUrl } from "./configuration.js";
import { LicenseOutputter, MetadataOutputter } from "./outputters.js";
import { getCurrentVersionString } from "./root-project.js";

export type { LicenseOutputter, MetadataOutputter };

export { getConfiguration, getConfigurationFromUrl, getCurrentVersionString };
