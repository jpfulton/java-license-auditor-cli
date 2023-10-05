import { convertMavenDependencyToLicense } from "../../src/util/converters.js";
import { License, MavenDependency } from "../../src/models";

// mock the getMavenProjectName function from the root-project module
// to return com.example:root-project
jest.mock("../../src/util/root-project.js", () => ({
  ...jest.requireActual("../../src/util/root-project.js"),
  getMavenProjectName: jest.fn(() => "com.example:root-project"),
}));

describe("convertMavenDependencyToLicense", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("should convert a MavenDependency to a License", () => {
    const dependency: MavenDependency = {
      groupId: "com.example",
      artifactId: "example",
      version: "1.0.0",
      url: "https://example.com",
      scope: "compile",
      type: "jar",
      licenses: [
        {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
      ],
    };

    const license: License = convertMavenDependencyToLicense(dependency);

    expect(license).toEqual({
      name: "com.example:example",
      version: "1.0.0",
      licenses: ["MIT"],
      licensePath: "https://opensource.org/licenses/MIT",
      repository: "https://example.com",
      publisher: "com.example",
      rootProjectName: "com.example:root-project",
    });
  });

  it("should convert a MavenDependency to a License with multiple licenses", () => {
    const dependency: MavenDependency = {
      groupId: "com.example",
      artifactId: "example",
      version: "1.0.0",
      url: "https://example.com",
      scope: "compile",
      type: "jar",
      licenses: [
        {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
        {
          name: "Apache-2.0",
          url: "https://opensource.org/licenses/Apache-2.0",
        },
      ],
    };

    const license: License = convertMavenDependencyToLicense(dependency);

    expect(license).toEqual({
      name: "com.example:example",
      version: "1.0.0",
      licenses: ["MIT", "Apache-2.0"],
      licensePath:
        "https://opensource.org/licenses/MIT, https://opensource.org/licenses/Apache-2.0",
      repository: "https://example.com",
      publisher: "com.example",
      rootProjectName: "com.example:root-project",
    });
  });
});
