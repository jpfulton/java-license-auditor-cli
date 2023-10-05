import { readFileSync } from "fs";
import { HTMLElement, parse } from "node-html-parser";
import { MavenDependency, MavenLicense } from "../models";

// returns the root node of the report file
export const getReportRootNode = (reportFile: string): HTMLElement => {
  const reportFileContent = readFileSync(reportFile, "utf8");
  return parse(reportFileContent);
};

// returns an array of h3 elements
// these elements contain the scope of dependencies when followed by a dependency table
export const getH3Elements = (rootNode: HTMLElement): HTMLElement[] => {
  return rootNode.querySelectorAll("h3");
};

// get scope from h3 element
// the h3 element contains the scope of the dependencies
// the scope is the text of the h3 element
export const getScopeFromH3Element = (h3Element: HTMLElement): string => {
  return h3Element.text;
};

// returns an array of tables
// these tables contain the dependencies
export const getDependencyTables = (rootNode: HTMLElement): HTMLElement[] => {
  const tableArray = rootNode.querySelectorAll("table");
  const result: HTMLElement[] = [];

  // if the table contains a header row with five columns, it is a dependency table
  // add it to the result array
  // tables of this kind have a first row with the th elements
  tableArray.forEach((table) => {
    const firstRow = table.querySelectorAll("tr")[0];
    const thArray = firstRow.querySelectorAll("th");
    if (thArray.length === 5) {
      result.push(table);
    }
  });

  return result;
};

// get MavenDependency object from a table row
export const getMavenDependencyFromRow = (
  scope: string,
  row: HTMLElement
): MavenDependency => {
  const tdArray = row.querySelectorAll("td");

  const result: MavenDependency = {
    groupId: tdArray[0].text,
    artifactId: getArtifactIdFromCell(tdArray[1]),
    url: getProjectUrlFromCell(tdArray[1]),
    version: tdArray[2].text,
    type: tdArray[3].text,
    scope: scope,
    licenses: getMavenLicensesFromCell(tdArray[4]),
  };

  return result;
};

// get artifactId from table cell
// the cell may contain a link to the artifact or just the artifactId as text
export const getArtifactIdFromCell = (cell: HTMLElement): string => {
  const linkArray = cell.querySelectorAll("a");
  if (linkArray.length === 0) {
    return cell.text;
  } else {
    return linkArray[0].text;
  }
};

// get project url from table cell
// the cell may contain a link to the project or only text
// if only text is present, return undefined
export const getProjectUrlFromCell = (
  cell: HTMLElement
): string | undefined => {
  const linkArray = cell.querySelectorAll("a");
  if (linkArray.length === 0) {
    return undefined;
  } else {
    return linkArray[0].attributes.href;
  }
};

// get MavenLicense objects from cell content
// each cell contains zero or more links to licenses
// each license is represented by a separate link tag
// the link tag contains the name of the license
export const getMavenLicensesFromCell = (cell: HTMLElement): MavenLicense[] => {
  const result: MavenLicense[] = [];

  const linkArray = cell.querySelectorAll("a");
  linkArray.forEach((link) => {
    const license: MavenLicense = {
      name: link.text,
      url: link.attributes.href,
    };
    result.push(license);
  });

  return result;
};

// get MavenDependency objects from a root node
// the root node contains h3 elements which contain the scope of the dependencies
// followed (after other tags and text) by tables which contain the dependencies
// however, not all h3 elements are followed by a table
// so we need to check if a table is present after the h3 element
export const getMavenDependenciesFromRootNode = (
  rootNode: HTMLElement
): MavenDependency[] => {
  const result: MavenDependency[] = [];

  const h3Array = getH3Elements(rootNode);
  const tableArray = getDependencyTables(rootNode);

  // iterate over the tables
  // for each table, get the scope from the previous h3 element
  // then iterate over the rows of the table, skipping the first row (header)
  // for each row, create a MavenDependency object and add it to the result array
  tableArray.forEach((table, index) => {
    const scope = getScopeFromH3Element(h3Array[index]);
    const trArray = table.querySelectorAll("tr");
    trArray.shift();
    trArray.forEach((tr) => {
      const mavenDependency = getMavenDependencyFromRow(scope, tr);
      result.push(mavenDependency);
    });
  });

  return result;
};
