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
      preload: path.join(__dirname, 'preload.js')
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
  const maxIterations = 10
  const maxTime = 5 * 60 * 1000;
  // We'll try increasing by 512KiB each time (this value must be even since we're testing with UTF-16 strings)
  //const stepBytes = 512*1024
  const stepBytes = 2*1024*1024

  console.log('testLocalStorage started')
  localStorage.clear()

  const key = 'testVal'
  const initBytes = 10*1024*1024
  let bigArray = new Array(initBytes/2).fill('x')

  const startTime = Date.now()
  const getElapsedTime = () => Date.now() - startTime;

  let result = null
  let iteration = 0
  do {
      iteration++
      bigArray = bigArray.concat(new Array(stepBytes/2).fill('x'))

      localStorage.setItem(key, bigArray.join(''))
      result = localStorage.getItem(key)
      console.log(`[${iteration}] ${bigArray.length*2/1024} KiB`,
        "result === null -->", result === null,
        "result === '' -->", result === ''
      )
      //console.log(result)
  } while (result && iteration < maxIterations && getElapsedTime() < maxTime)

  if (iteration >= maxIterations) {
    console.log(`Reached iteration limit (${iteration})`)
  }

  if (getElapsedTime() >= maxTime) {
    console.log(`Reached time limit (${maxTime/1000}s)`)
  }

  console.log('testLocalStorage finished');
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
