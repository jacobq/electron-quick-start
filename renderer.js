// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();

function toggleMenuBarVisibility(shouldShow) {
  mainWindow.setMenuBarVisibility(shouldShow);
}

function removeMenu() {
  if (typeof mainWindow.removeMenu === 'function') {
    mainWindow.removeMenu();
  }
  else {
    console.warn('Sorry, this version of electron does not appear to support this API');
  }
}

function setMenuNull() {
  mainWindow.setMenu(null);
}

document.querySelector('button#show').addEventListener('click', e => toggleMenuBarVisibility(true));
document.querySelector('button#hide').addEventListener('click', e => toggleMenuBarVisibility(false));
document.querySelector('button#remove').addEventListener('click', removeMenu);
document.querySelector('button#set-null').addEventListener('click', setMenuNull);
