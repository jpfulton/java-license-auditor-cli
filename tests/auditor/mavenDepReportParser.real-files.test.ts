import {
  getMavenDependenciesFromRootNode,
  getReportRootNode,
} from "../../src/auditor/mavenDepReportParser.js";

const snowflakeJdbcReportFile =
  "tests/sample-maven-outputs/dependencies_snowflake-jdbc.html";

describe("getMavenDependenciesFromRootNode", () => {
  it("returns an array of MavenDependency objects", () => {
    const rootNode = getReportRootNode(snowflakeJdbcReportFile);
    const result = getMavenDependenciesFromRootNode(rootNode);

    // expect the result to be an array
    expect(Array.isArray(result)).toEqual(true);
    // expect the result to contain more than one element
    expect(result.length).toBeGreaterThan(1);
  });
});
