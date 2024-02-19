/**
 * Basic function to split first and last name in common case ie. they are split by a space
 * @param fullName Full name eg. 'Gauvain Thery'
 * @returns an object with a split between first and last names
 */
export const splitName = (fullName: string): { firstName?: string; lastName?: string } => {
  const names = fullName.split(' ');
  if (names.length === 1) {
    return {
      firstName: names[0],
    };
  }
  return {
    firstName: names[0]?.trim(),
    lastName: names.slice(1).join(' ').trim(),
  };
};

/**
 * Basic function to remove unwanted elements from linkedin job titles
 * @param jobTitle The raw job title from linkedIn
 * @returns a clean job title
 */
export const cleanJobTitle = (jobTitle: string): string => {
  return jobTitle.split(/ at| @| chez/g)[0]?.trim() || jobTitle;
};
