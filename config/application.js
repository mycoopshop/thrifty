const express = require('express')
const web_app = express()

const electron = require('electron')
const desktop_app = electron.app

const path = require('path')
const server_socket = path.join(__dirname, '/../tmp/server.sock')

let win = null

desktop_app.on('ready', () => {
  var {width, height} = eletron.screen.getPrimaryDisplay().workAreaSize
  var win = new BrowserWindow({
    width: width/2,
    height: height,
    center: true,
    show: false,
    title: "Thrifty"
  })

  web_app.get("/", (req, res) => {
    res.send("Hello, friend.")
    win
  })

  web_app.listen(server_socket, () => {
    console.log('Running express.js app at ./tmp/server.sock')
  })

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
    win.loadURL('http://localhost:4000')
    win.on('ready-to-show', () => {
      win.show()
    })
  })

  //
  // If the main electron window closes, close the express app and quit.
  //
  win.on('closed', () => {
    win = null
    web_app.kill()
    desktop_app.quit()
  })
})
