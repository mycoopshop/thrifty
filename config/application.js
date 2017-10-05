const express = require('express')
const app = express()
const path = require('path')

let port = 53001

app.use(express.static(path.join(__dirname, '/../app/views')))

app.get('/', (req, res) => {
  res.redirect('/hello.html')
})

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Running express.js app on port ${port}`)
  })
}

module.exports = app
