/**
 * Get the full name of a person
 * @param firstName The first name of the person
 * @param lastName The last name of the person
 * @returns The full name of the person
 */
export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

/**
 * A function that extracts the unique id slug from a linkedin url
 * @param linkedinUrl The linkedin url
 * @returns The unique id slug
 */
export const getLinkedinSlug = (linkedinUrl: string): string => {
  // Regular expression to extract the unique id slug from a linkedin url
  // Example: https://www.linkedin.com/in/jean-michel-boudart-123456789/
  // Result: jean-michel-boudart-123456789
  const regex = /(?<=linkedin\.com\/in\/)[^/]+/;
  const match = linkedinUrl.match(regex);
  return match ? match[0] : null;
};
