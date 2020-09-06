import { getUrlElement } from '../lib.js';

function toggleAll() {
  return browser.storage.local.get('allSites').then((store) => {
    if (store.allSites) {
      browser.storage.local.set({ allSites: false });
    } else {
      browser.storage.local.set({ allSites: true });
    };
  });
}

function togglePage() {
  return browser.storage.local.get('pages').then((store) => {
    let pages = (store.pages && store.pages.length) ? store.pages : [];
    browser.tabs.query({ currentWindow: true, active: true }, tabs => {
      if (tabs[0]) {
        const host = getUrlElement(tabs[0].url).hostname;
        if (pages.indexOf(host) !== -1) {
          pages = pages.filter(page => page !== host);
        } else {
          pages.push(host);
        }
        browser.storage.local.set({ pages });
      }
    });
  });
}

function toggleExclude() {
  return browser.storage.local.get('exclude').then((store) => {
    let exclude = (store.exclude && store.exclude.length) ? store.exclude : [];
    browser.tabs.query({ currentWindow: true, active: true }, tabs => {
      if (tabs[0]) {
        const host = getUrlElement(tabs[0].url).hostname;
        if (exclude.indexOf(host) !== -1) {
          exclude = exclude.filter(page => page !== host);
        } else {
          exclude.push(host);
        }
        browser.storage.local.set({ exclude });
      }
    });
  });
}

function setValues() {
  browser.storage.local.get().then((store) => {
    document.getElementById('ToggleAll').checked = !!store.allSites
    let pages = (store.pages && store.pages.length) ? store.pages : [];
    let exclude = (store.exclude && store.exclude.length) ? store.exclude : [];
    browser.tabs.query({ currentWindow: true, active: true }, tabs => {
      if (tabs[0]) {
        const host = getUrlElement(tabs[0].url).hostname;
        document.getElementById('TogglePage').checked = !!(pages.indexOf(host) !== -1);
        document.getElementById('ToggleExclude').checked = !!(exclude.indexOf(host) !== -1);
      }
    });
  });
}

setValues();
browser.storage.onChanged.addListener(setValues);

document.getElementById('ToggleAll').addEventListener('click', toggleAll);
document.getElementById('TogglePage').addEventListener('click', togglePage);
document.getElementById('ToggleExclude').addEventListener('click', toggleExclude);