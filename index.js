require('es6-promise').polyfill()
require('isomorphic-fetch')
require('figlet').text('Comfluence2K', (e, data) => console.log(e || data))
const fs = require('fs')
const fetchPage = require('./src/fetchPage')
const handleImg = require('./src/handleImg')
const handleStyle = require('./src/handleStyle')
const handleX = require('./src/handleX')

const id = process.argv[2]

fetchPage(id, (page) => {
  this.title = page.title
  this.page = page.body

  if (!fs.existsSync(`./build/${id}`)) {
    fs.mkdirSync(`./build/${id}`)
  }

  fs.writeFile(`./build/${id}/_tmp.html`, this.page, (err) => {
    console.log(err || 'The tmp file was saved!')
  })

  new Promise((resolve) => {
    handleX.call(this, id)
    handleStyle.call(this, id, this.title)
    resolve()
  }).then(() => {
    handleImg.call(this, page.body, id)
  }).then(() => {
  })

  fs.writeFile(`./build/${id}/index.html`, this.page, (err) => {
    console.log(err || 'The file was saved!')
  })
})
