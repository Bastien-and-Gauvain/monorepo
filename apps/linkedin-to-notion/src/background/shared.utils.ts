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
export const getLinkedinSlug = (linkedinUrl: string): string | null => {
  // Regular expression to extract the unique id slug from a linkedin url
  // Example: https://www.linkedin.com/in/jean-michel-boudart-123456789/
  // Result: jean-michel-boudart-123456789
  const regex = /(?<=linkedin\.com\/in\/)[^/]+/;
  const match = linkedinUrl.match(regex);
  return match ? match[0] : null;
};

/**
 * A function that retries a request a given number of times
 * @param fn The function to retry
 * @param retries The number of retries
 * @param delay The delay between each retry
 * @returns The result of the function
 */
export const retryRequest = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  let delayIncrement = 1;
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delay * delayIncrement));
    delayIncrement++;
    return await retryRequest(fn, retries - 1, delay);
  }
};

/**
 * A function that retries sending a chrome message
 * @param tabId The tab id to send the message to
 * @param message The message to send
 * @param retries The number of retries
 * @param delay The delay between each retry
 */
export const retrySendMessage = async (
  tabId: number,
  message: string | Record<string, unknown>,
  retries = 3,
  delay = 1000
): Promise<void> => {
  return retryRequest(() => chrome.tabs.sendMessage(tabId, message), retries, delay);
};
