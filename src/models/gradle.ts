export interface GradleDependency {
  name: string;
  url: string;
  version: string;
  license: string;
  licenseUrl: string;
}

export interface GradleDependencyReport {
  dependencies: GradleDependency[];
}
