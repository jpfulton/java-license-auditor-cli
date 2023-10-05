import { getMavenProjectNameFromPomXml } from "../../src/util/root-project.js";

describe("getMavenRootProjectNameFromPomXml", () => {
  it("should return the name of a project from a pom.xml file specified by filename", () => {
    const filename = "tests/util/pom_snowflakedb-jdbc.xml";
    const name = getMavenProjectNameFromPomXml(filename);
    expect(name).toBe("net.snowflake:snowflake-jdbc");
  });
});
