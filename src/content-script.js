let initialValue = document.body.style.filter;

function setFilter(value) {
    document.body.style.filter = value;
}

function handleFilter() {
  browser.storage.local.get().then((store) => {
    if (store.allSites) {
      setFilter('grayscale(1) sepia(0.1)');
      return;
    }
    if (store.pages && store.pages.length) {
      const founded = store.pages.find(element => element === 1);
      if (founded) {
        setFilter('grayscale(1) sepia(0.1)');
        return;
      }
    }
    setFilter(initialValue);
  });
}

browser.storage.onChanged.addListener(handleFilter);
handleFilter();