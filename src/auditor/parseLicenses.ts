import {
  Dependency,
  DependencyOutputter,
} from "@jpfulton/license-auditor-common";

export const parserFactory =
  (
    whitelistedLicenses: string[],
    blacklistedLicenses: string[],
    infoOutputter: DependencyOutputter,
    warnOutputter: DependencyOutputter,
    errorOutputter: DependencyOutputter
  ) =>
  (
    dependencies: Dependency[]
  ): {
    uniqueCount: number;
    whitelistedCount: number;
    warnCount: number;
    blacklistedCount: number;
    allOutputs: string[];
    blackListOutputs: string[];
    warnOutputs: string[];
    whiteListOutputs: string[];
  } => {
    let whitelistedCount = 0;
    let warnCount = 0;
    let blacklistedCount = 0;

    const allOutputs: string[] = [];
    const blackListOutputs: string[] = [];
    const warnOutputs: string[] = [];
    const whiteListOutputs: string[] = [];

    dependencies.forEach((dependencyObj) => {
      const isWhitelisted = Array.isArray(dependencyObj.licenses)
        ? dependencyObj.licenses.every((depLicense) =>
            whitelistedLicenses.includes(depLicense.license)
          )
        : whitelistedLicenses.includes(dependencyObj.licenses);

      if (isWhitelisted) {
        whitelistedCount++;
        const result = infoOutputter(dependencyObj);
        if (result !== "") {
          allOutputs.push(result);
          whiteListOutputs.push(result);
        }
      }

      const isBlacklisted = Array.isArray(dependencyObj.licenses)
        ? dependencyObj.licenses.some((depLicense) =>
            blacklistedLicenses.includes(depLicense.license)
          )
        : blacklistedLicenses.includes(dependencyObj.licenses);

      if (!isWhitelisted && !isBlacklisted) {
        warnCount++;
        const result = warnOutputter(dependencyObj);
        if (result !== "") {
          allOutputs.push(result);
          warnOutputs.push(result);
        }
      }

      if (isBlacklisted) {
        blacklistedCount++;
        const result = errorOutputter(dependencyObj);
        if (result !== "") {
          allOutputs.push(result);
          blackListOutputs.push(result);
        }
      }
    });

    return {
      uniqueCount: dependencies.length,
      whitelistedCount: whitelistedCount,
      warnCount: warnCount,
      blacklistedCount: blacklistedCount,
      allOutputs: allOutputs,
      blackListOutputs: blackListOutputs,
      warnOutputs: warnOutputs,
      whiteListOutputs: whiteListOutputs,
    };
  };

export default parserFactory;
