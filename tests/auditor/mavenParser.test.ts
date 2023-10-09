import {
  getArtifactIdFromCell,
  getMavenLicensesFromCell,
  getProjectUrlFromCell,
  getDependencyTables,
  getH3Elements,
  getMavenDependenciesFromRootNode,
  getMavenDependencyFromRow,
  getReportRootNode,
  getScopeFromH3Element,
} from "../../src/auditor/mavenParser.js";
import { parse } from "node-html-parser";

describe("getArtifactIdFromCell", () => {
  it("returns the artifactId from the cell", () => {
    const cell = parse(
      '<td><a href="https://www.google.com">artifactId</a></td>'
    );
    const result = getArtifactIdFromCell(cell);
    expect(result).toEqual("artifactId");
  });
});

describe("getMavenLicensesFromCell", () => {
  it("returns an array of MavenLicense objects", () => {
    const cell = parse(
      '<td><a href="https://www.google.com">license1</a><br/><a href="https://www.google.com">license2</a></td>'
    );
    const result = getMavenLicensesFromCell(cell);
    expect(result).toEqual([
      {
        name: "license1",
        url: "https://www.google.com",
      },
      {
        name: "license2",
        url: "https://www.google.com",
      },
    ]);
  });
});

describe("getProjectUrlFromCell", () => {
  it("returns the project url from the cell", () => {
    const cell = parse(
      '<td><a href="https://www.google.com">artifactId</a></td>'
    );
    const result = getProjectUrlFromCell(cell);
    expect(result).toEqual("https://www.google.com");
  });
});

describe("getDependencyTables", () => {
  it("returns an array of tables", () => {
    const rootNode = parse(
      "<html><body><table><tr><th>th1</th><th>th2</th><th>th3</th><th>th4</th><th>th5</th></tr></table></body></html>"
    );
    const result = getDependencyTables(rootNode);
    expect(result.length).toEqual(1);
  });
});

describe("getH3Elements", () => {
  it("returns an array of h3 elements", () => {
    const rootNode = parse("<html><body><h3>h3 element</h3></body></html>");
    const result = getH3Elements(rootNode);
    expect(result.length).toEqual(1);
  });
});

describe("getMavenDependenciesFromRootNode", () => {
  it("returns an array of MavenDependency objects", () => {
    const rootNode = parse(
      `<html>
        <body>
          <h3>compile</h3>
          <table>
          <tr>
            <th>groupId</th>
            <th>artifactId</th>
            <th>version</th>
            <th>type</th>
            <th>licenses</th>
          </tr>
          <tr>
            <td>groupId</td>
            <td><a href='https://www.google.com'>artifactId</a></td>
            <td>version</td>
            <td>type</td>
            <td>
              <a href='https://www.google.com'>license1</a><br/>
              <a href='https://www.google.com'>license2</a>
            </td>
          </tr>
          </table>
        </body>
      </html>`
    );
    const result = getMavenDependenciesFromRootNode(rootNode);
    expect(result).toEqual([
      {
        groupId: "groupId",
        artifactId: "artifactId",
        url: "https://www.google.com",
        version: "version",
        type: "type",
        scope: "compile",
        licenses: [
          {
            name: "license1",
            url: "https://www.google.com",
          },
          {
            name: "license2",
            url: "https://www.google.com",
          },
        ],
      },
    ]);
  });
});

describe("getMavenDependencyFromRow", () => {
  it("returns a MavenDependency object", () => {
    const scope = "compile";
    const row = parse(
      "<tr><td>groupId</td><td><a href='https://www.google.com'>artifactId</a></td><td>version</td><td>type</td><td><a href='https://www.google.com'>license1</a><br/><a href='https://www.google.com'>license2</a></td></tr>"
    );
    const result = getMavenDependencyFromRow(scope, row);
    expect(result).toEqual({
      groupId: "groupId",
      artifactId: "artifactId",
      url: "https://www.google.com",
      version: "version",
      type: "type",
      scope: "compile",
      licenses: [
        {
          name: "license1",
          url: "https://www.google.com",
        },
        {
          name: "license2",
          url: "https://www.google.com",
        },
      ],
    });
  });
});

describe("getReportRootNode", () => {
  it("returns the root node of the report file", () => {
    const reportFile = "tests/fixtures/dependencies_snowflake-jdbc.html";
    const result = getReportRootNode(reportFile);

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty("tagName", "HTML");
  });
});

describe("getScopeFromH3Element", () => {
  it("returns the scope from the h3 element", () => {
    const h3Element = parse("<h3>compile</h3>");
    const result = getScopeFromH3Element(h3Element);
    expect(result).toEqual("compile");
  });
});
