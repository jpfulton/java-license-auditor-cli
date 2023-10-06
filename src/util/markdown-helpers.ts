import { License } from "../models";

export const getLicensesMarkdown = (license: License) => {
  const { licenses, licenseUrl } = license;

  // both licenses and licenseUrl need to be arrays or strings
  // licenseUrl can be undefined if licenses is a string
  // licenseUrl can be an array of undefined if licenses is an array
  // if these cases are not met, we need to throw an error
  if (
    (Array.isArray(licenses) && !Array.isArray(licenseUrl)) ||
    (!Array.isArray(licenses) && Array.isArray(licenseUrl))
  ) {
    throw new Error(
      `The license and licenseUrl properties of the license object must both be arrays or strings.`
    );
  }

  let licenseString = "";

  // construct a markdown link if we have a licenseUrl
  if (Array.isArray(licenses) && Array.isArray(licenseUrl)) {
    // we can expect the arrays to be the same length and that
    // the index of the licenseUrl will match the index of the license
    licenseString = licenseUrl
      .map((url, index) =>
        url ? `[${licenses[index]}](${url})` : licenses[index]
      )
      .join("; ");
  } else if (licenseUrl) {
    licenseString = `[${licenses}](${licenseUrl})`;
  } else {
    licenseString = licenses as string;
  }

  return licenseString;
};
