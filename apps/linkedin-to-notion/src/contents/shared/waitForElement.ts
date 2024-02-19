export const waitForElement = async (selector: string): Promise<Element> => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      const element = document.querySelector(selector);
      if (!element) {
        console.error('No element found');
        return;
      }
      resolve(element);
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        const element = document.querySelector(selector);
        if (!element) {
          console.error('No element found');
          return;
        }
        resolve(element);
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
};
