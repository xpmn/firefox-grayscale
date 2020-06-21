export 

export function isSupportedProtocol(urlString) {
  const supportedProtocols = ['https:', 'http:', 'ftp:', 'file:'];
  const url = getUrlElement(urlString);
  return supportedProtocols.indexOf(url.protocol) != -1;
}

export function getUrlElement(urlString) {
  const url = document.createElement('a');
  url.href = urlString;
  return url;
}