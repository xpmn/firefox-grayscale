function toggleAll() {
  return browser.storage.local.get('allSites').then((store) => {
    if (store.allSites) {
      browser.storage.local.set({allSites: false});
    } else {
      browser.storage.local.set({allSites: true});
    };
  });
}

document.getElementById('ToggleAll').addEventListener('click', toggleAll);