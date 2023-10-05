import { License } from "../models";

// remove duplicates based on common name, version and licenses array
export const removeDuplicates = (licenseData: License[]): License[] => {
  const result: License[] = [];
  licenseData.forEach((license) => {
    if (
      !result.some((l) => {
        let licensesMatch = false;

        if (Array.isArray(l.licenses) && Array.isArray(license.licenses)) {
          // if both licenses are arrays, check if all licenses in l.licenses
          // are included in license.licenses
          licensesMatch = l.licenses.every((x) => license.licenses.includes(x));
        } else if (
          !Array.isArray(l.licenses) &&
          !Array.isArray(license.licenses)
        ) {
          // if both licenses are not arrays, check if they are equal
          licensesMatch = l.licenses === license.licenses;
        } else {
          // if one of the licenses is an array and the other is not
          if (
            Array.isArray(l.licenses) &&
            l.licenses.length == 1 &&
            !Array.isArray(license.licenses)
          ) {
            // if l.licenses is an array with one element, check if license.licenses
            // is included in l.licenses
            licensesMatch = l.licenses.includes(license.licenses);
          } else if (
            !Array.isArray(l.licenses) &&
            Array.isArray(license.licenses) &&
            license.licenses.length == 1
          ) {
            // if license.licenses is an array with one element, check if l.licenses
            // is included in license.licenses
            licensesMatch = license.licenses.includes(l.licenses);
          }
        }

        // check if name, version and licenses match
        return (
          l.name === license.name &&
          l.version === license.version &&
          licensesMatch
        );
      })
    ) {
      result.push(license);
    }
  });

  return result;
};
