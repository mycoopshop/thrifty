const express = require('express')
const app = express()

let port = 53001

app.get("/", (req, res) => {
  res.status(200).send('Hello, friend!')
})

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Running express.js app on port ${port}`)
  })
}

module.exports = app
