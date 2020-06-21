import {isSupportedProtocol, setReadingItemIcon, getCurrentList, getUrlElement} from '../lib.js';

function addPageToList(tab) {
  if (tab) {
    getCurrentList().then((list) => {
      if (isSupportedProtocol(tab.url)) {
        if (list.find((savedPage => savedPage.url === tab.url))) {
          list = list.filter(savedPage => savedPage.url !== tab.url);
        }
        list.unshift({ url: tab.url, faviconUrl: tab.favIconUrl, title: tab.title });
        setReadingItemIcon(true, tab.id);
        browser.storage.sync.set({ readingList: list });
      } else {
        const url = getUrlElement(tab.url);
        document.querySelector('#action-content').textContent = `Extension does not support the '${url.protocol}' protocol.`;
        console.log(`Extension does not support the '${tab.url}' URL.`);
      }
    });
  }
}

browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
  addPageToList(tabs[0], (isIn, tab) => {
    setReadingItemIcon(isIn, tab.id);
  });
});
