const customQuerySelector = (selector: string, searchedText: string): boolean => {
  const elmList = Array.from(document.querySelectorAll(selector));
  return !!elmList.find((elm) => elm.textContent === searchedText);
};

export const waitForElementToExist = (selector: string, searchedText: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (customQuerySelector(selector, searchedText)) {
      return resolve(true);
    }

    const observer = new MutationObserver(() => {
      if (customQuerySelector(selector, searchedText)) {
        resolve(true);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
};
