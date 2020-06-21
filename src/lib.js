export function getUrlElement(urlString) {
  const url = document.createElement('a');
  url.href = urlString;
  return url;
}