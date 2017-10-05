const express = require('express')
const app = express()
const path = require('path')
const server_socket = path.join(__dirname, '/../tmp/server.sock')

app.get("/", (req, res) => {
  res.send("Hello, friend.")
})

app.listen(server_socket, () => {
  console.log('Running express.js app on port 3000')
}
