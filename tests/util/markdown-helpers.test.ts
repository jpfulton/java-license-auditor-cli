import { getLicensesMarkdown } from "../../src/util/markdown-helpers.js";
import { License } from "../../src/models";

describe("getLicensesMarkdown", () => {
  it("should return a markdown string for a license with a single license and no url", () => {
    const license = {
      rootProjectName: "test-project",
      name: "test-package",
      repository: "https://github.com/test/test-package",
      publisher: "Test Publisher",
      version: "1.0.0",
      licenses: "MIT",
      licenseUrl: undefined,
    };

    const expected = "MIT";

    const actual = getLicensesMarkdown(license);

    expect(actual).toEqual(expected);
  });

  it("should return a markdown string for a license with a single license and a url", () => {
    const license = {
      rootProjectName: "",
      name: "",
      repository: "",
      publisher: "",
      version: "",
      licenses: "MIT",
      licenseUrl: "https://opensource.org/licenses/MIT",
    };

    const expected = "[MIT](https://opensource.org/licenses/MIT)";

    const actual = getLicensesMarkdown(license);

    expect(actual).toEqual(expected);
  });

  it("should return a markdown string for a license with multiple licenses and multiple urls", () => {
    const license: License = {
      rootProjectName: "",
      name: "",
      repository: "",
      publisher: "",
      version: "",
      licenses: ["MIT", "Apache-2.0"],
      licenseUrl: [
        "https://opensource.org/licenses/MIT",
        "https://opensource.org/licenses/Apache-2.0",
      ],
    };

    const expected =
      "[MIT](https://opensource.org/licenses/MIT); [Apache-2.0](https://opensource.org/licenses/Apache-2.0)";

    const actual = getLicensesMarkdown(license);

    expect(actual).toEqual(expected);
  });

  it("should return a markdown string for a license with multiple licenses and a single url", () => {
    const license: License = {
      rootProjectName: "",
      name: "",
      repository: "",
      publisher: "",
      version: "",
      licenses: ["MIT", "Apache-2.0"],
      licenseUrl: ["https://opensource.org/licenses/MIT", undefined],
    };

    const expected = "[MIT](https://opensource.org/licenses/MIT); Apache-2.0";

    const actual = getLicensesMarkdown(license);

    expect(actual).toEqual(expected);
  });

  it("should return a markdown string for a license with multiple licenses and no urls", () => {
    const license: License = {
      rootProjectName: "",
      name: "",
      repository: "",
      publisher: "",
      version: "",
      licenses: ["MIT", "Apache-2.0"],
      licenseUrl: [undefined, undefined],
    };

    const expected = "MIT; Apache-2.0";

    const actual = getLicensesMarkdown(license);

    expect(actual).toEqual(expected);
  });

  it("should throw an error if the license and licenseUrl properties are not both arrays or strings", () => {
    const license: License = {
      rootProjectName: "",
      name: "",
      repository: "",
      publisher: "",
      version: "",
      licenses: ["MIT", "Apache-2.0"],
      licenseUrl: "https://opensource.org/licenses/MIT",
    };

    expect(() => getLicensesMarkdown(license)).toThrowError(
      "The license and licenseUrl properties of the license object must both be arrays or strings."
    );
  });

  it("should throw an error if the license and licenseUrl properties are not both arrays or strings", () => {
    const license: License = {
      rootProjectName: "",
      name: "",
      repository: "",
      publisher: "",
      version: "",
      licenses: "MIT",
      licenseUrl: ["https://opensource.org/licenses/MIT", undefined],
    };

    expect(() => getLicensesMarkdown(license)).toThrowError(
      "The license and licenseUrl properties of the license object must both be arrays or strings."
    );
  });

  it("should throw an error if the license and licenseUrl properties are not both arrays or strings", () => {
    const license: License = {
      rootProjectName: "",
      name: "",
      repository: "",
      publisher: "",
      version: "",
      licenses: ["MIT", "Apache-2.0"],
      licenseUrl: undefined,
    };

    expect(() => getLicensesMarkdown(license)).toThrowError(
      "The license and licenseUrl properties of the license object must both be arrays or strings."
    );
  });
});
