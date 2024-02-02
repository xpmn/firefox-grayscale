const existingFilter = getComputedStyle(document.body).filter.replace('none', '');

function setFilter(value) {
  if (value === '') {
    document.body.style.filter = existingFilter;
    return;
  }

  const restOfTheFilters = existingFilter
    .replace(/grayscale\([\d\.]+\)/, '').replace(/sepia\([\d\.]+\)/, '') // Remove grayscale and sepia filters
    .replace(/\s+/g, ' ').trim(); // Remove extra spaces
  document.body.style.filter = [restOfTheFilters, value].join(' ');
}

function handleFilter() {
  browser.storage.local.get().then((store) => {
    if (store.allSites) {
      if (store.exclude && store.exclude.length) {
        const founded = store.exclude.find(element => element === window.location.hostname);
        if (founded) return setFilter('');
      }
      setFilter('grayscale(1) sepia(0.1)');
      return;
    }
    if (store.pages && store.pages.length) {
      const founded = store.pages.find(element => element === window.location.hostname);
      if (founded) {
        setFilter('grayscale(1) sepia(0.1)');
        return;
      }
    }
    setFilter('');
  });
}

browser.storage.onChanged.addListener(handleFilter);
handleFilter();