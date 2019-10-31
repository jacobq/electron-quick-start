// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

// ---- Note: these don't actually help, but you can try them anyway ----

// https://github.com/electron/electron/issues/13465#issuecomment-401081438
// https://github.com/electron/electron/issues/13465#issuecomment-439633455
//app.commandLine.appendSwitch('disable-mojo-local-storage')

// This switch isn't in the supported list
// https://peter.sh/experiments/chromium-command-line-switches/
// https://electronjs.org/docs/api/chrome-command-line-switches
//app.commandLine.appendSwitch('unlimited-storage')
// ----


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function testLocalStorage() {
  console.log('testLocalStorage started')
  localStorage.clear()

  const key = 'localStorageLimitTest'
  const delay = 0
  const initialBytes = 10*1024*1024 + 99*1024 + 1010
  const stepBytes = 1
  const maxIterations = 100
  const maxTime = 5 * 60 * 1000
  const startTime = Date.now()
  const getElapsedTime = () => Date.now() - startTime;

  function timeout(ms) {
    let resolve;
    const promise = new Promise((_resolve) => { resolve = _resolve });
    setTimeout(resolve, ms)

    return promise;
  }

  function write(bytes) {
      localStorage.setItem(key, 'x'.repeat(bytes - key.length))
  }

  function countBytes() {
      return new Blob([key, localStorage.getItem(key)]).size
  }

  function formatSizes(totalBytes) {
    const MiB = Math.floor(totalBytes/1024/1024);
    const KiB = Math.floor((totalBytes-1024*1024*MiB)/1024);
    const B = totalBytes - 1024*(KiB + 1024*MiB);
    return `total=${totalBytes} bytes = ${MiB} MiB + ${KiB} KiB + ${B} bytes`
  }

  let iteration = 0
  let bytes = initialBytes
  new Array(Math.max(maxIterations, 1)).fill(0).reduce((p, zero) => {
      return p.then((lastBytes) => new Promise((resolve, reject) => {
        iteration++
        console.log(`[${iteration}] Testing ${formatSizes(bytes)}`)
        if (getElapsedTime() > maxTime) {
          reject(`Reached maximum execution time (${maxTime/1000}s)`)
        }
        else {
          write(bytes)
          // Note: localStorage is synchronous from the script's perspective
          //       but the underlying persistence may not be. In other words,
          //       everything might look fine until a page refresh.
          timeout(delay).then(() => {
            const result = countBytes()
            if (result !== bytes) {
              console.warn(`Found unexpected number of bytes: ${result} !== ${bytes}`)
            }
            if (result < initialBytes) {
              reject(`Got bad result for bytes=${bytes} (previously tested size was ${bytes - stepBytes} bytes)`)
            }
            else {
              bytes += stepBytes
              resolve(bytes)
            }
          })
        }
      }))
  }, Promise.resolve(0))
  .then(bytes => {
    console.log(`Did not find limit (tried up to ${bytes} bytes)`)
  })
  .catch(message => {
    console.log(message)
  })
  .finally(() => {
    console.log('testLocalStorage finished');
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function main () {
  createWindow()
  mainWindow.openDevTools()
  // Wait a moment for the devTools to open so we don't miss log messages
  setTimeout(() => {
    const jsString = testLocalStorage.toString() + '\r\ntestLocalStorage()'
    console.log('Telling renderer to execute this -->\r\n', jsString, '\r\n')
    mainWindow.webContents.executeJavaScript(jsString)
  }, 1000)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
