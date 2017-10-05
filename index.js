const electron = require('electron')
const desktop_app = electron.app
const BrowserWindow = electron.BrowserWindow
const child_process = require('child_process')
const path = require('path')
const fs = require('fs')

let port = 53001
let main_window = null

desktop_app.on('ready', () => {
  var {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  var main_window = new BrowserWindow({
    width: width/2,
    height: height,
    center: true,
    show: false,
    title: "Thrifty"
  })

  let web_app_path = path.join(__dirname, '/config/application.js')
  let pid_path = path.join(__dirname, '/tmp/server.pid')
  let web_app = child_process.spawn('node', [web_app_path])

  //
  // If our express app throws an error, stop the electron app.
  //
  web_app.on('error', (err) => {
    console.log(err)
    desktop_app.quit()
  })

  web_app.on('message', (err) => {
    console.log(err)
    desktop_app.quit()
  })

  //
  // Listen for a server pid file pointing to a running express app.
  // Once a pid is detected, load the express app within the electron app.
  //
  fs.watchFile(pid_path, { interval: 300 }, (curr, prev) => {
    if (curr.blksize > 0) {
      main_window.loadURL(`http://localhost:${port}`)
      main_window.on('ready-to-show', () => {
        main_window.show()
      })
    }
  })

  //
  // If the main electron window closes, close the web and desktop app.
  //
  main_window.on('closed', () => {
    web_app.kill()
    desktop_app.quit()
  })

  //
  // Write express app pid to file and trigger electron app launch.
  //
  if (web_app.pid) {
    fs.writeFileSync(pid_path, web_app.pid.toString())
  }
})
