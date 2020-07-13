const popupCenter = (url, title, w, h) => {
  // Fixes dual-screen position                         Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const interWidth = document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  const interHeight = document.documentElement.clientHeight
    ? document.documentElement.clientHeigh
    : window.screen.height;
  const width = window.innerWidth ? window.innerWidth : interWidth;
  const height = window.innerHeight ? window.innerHeight : interHeight;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(url, title, `scrollbars=yes, width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`);

  // Puts focus on the newWindow
  if (window.focus) newWindow.focus();
  return newWindow;
};

module.exports = {
  popupCenter,
};
