import { convertMavenDependencyToLicense } from "../../src/util/converters.js";
import { License, MavenDependency } from "../../src/models";

describe("convertMavenDependencyToLicense", () => {
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

    const license: License = convertMavenDependencyToLicense(
      dependency,
      "com.example:root-project"
    );

    expect(license).toEqual({
      name: "com.example:example",
      version: "1.0.0",
      licenses: ["MIT"],
      licenseUrl: ["https://opensource.org/licenses/MIT"],
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

    const rootProjectName = "com.example:root-project";
    const license: License = convertMavenDependencyToLicense(
      dependency,
      rootProjectName
    );

    expect(license).toEqual({
      name: "com.example:example",
      version: "1.0.0",
      licenses: ["MIT", "Apache-2.0"],
      licenseUrl: [
        "https://opensource.org/licenses/MIT",
        "https://opensource.org/licenses/Apache-2.0",
      ],
      repository: "https://example.com",
      publisher: "com.example",
      rootProjectName: "com.example:root-project",
    });
  });
});
