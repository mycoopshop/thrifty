const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const child_process = require('child_process')
const path = require('path')

let main_window = null

app.on('ready', () => {
  var {width, height} = eletron.screen.getPrimaryDisplay().workAreaSize
  var main_window = new BrowserWindow({
    width: width/2,
    height: height,
    center: true,
    show: false,
    title: "Thrifty"
  })

  let web_app_path = path.join(__dirname, '/config/application.js')
  let web_app = child_process.spawn('node', [web_app_path])

  //
  // If our express app throws an error, stop the electron app.
  //
  web_app.on('error', (err) =>{
    console.log(err)
    app.quit
  })

  //
  // Listen for a server socket running the electron app.
  // Once detected, load and show within the electron browser window.
  //
  // TODO: transition to listening for a socket under tmp/sockets/server...
  web_app.stdout.on('data', (data) => {
    // TODO: try transition to sockets to avoid port duplication.
    main_window.loadURL('http://localhost:4000')
    main_window.on('ready-to-show', () => {
      main_window.show()
    })
  })

  //
  // If the main electron window closes, close the express app and quit.
  //
  main_window.on('closed', () => {
    main_window = null
    web_app.kill()
    app.quit()
  })
})
