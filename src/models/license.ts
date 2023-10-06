export interface License {
  rootProjectName: string;
  name: string;
  path?: string;
  licenses: string[] | string;
  licenseUrl?: (string | undefined)[] | string;
  licensePath?: string;
  repository: string;
  publisher: string;
  email?: string;
  version: string;
}
