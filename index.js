require('dotenv').load()
require('es6-promise').polyfill()
require('isomorphic-fetch')
const chalk = require('chalk')
const fs = require('fs')
const fetchChild = require('./src/fetchChild')
const fetchPage = require('./src/fetchPage')
const handleImg = require('./src/handleImg')
const handleStyle = require('./src/handleStyle')
const handleX = require('./src/handleX')
const insertCatalog = require('./src/insertCatalog')

require('figlet').text('Confluence2K', (e, data) => console.log(e || data))
const id = process.argv[2]
const name = process.argv[3]

fetchChild(id).then((tree) => {
  tree.map(l => {
    getPage(l.id, tree)
    l.children.map(f => {
      getPage(f.id, tree)
    })
  })
})


function getPage (child, tree) {
  if (!fs.existsSync(`./build/${child}`)) {
    fs.mkdirSync(`./build/${child}`)
  }

  fetchPage(child, (page) => {
    this.title = page.title
    this.page = page.body

    fs.writeFile(`./build/${child}/_tmp.html`, this.page, (err) => {})
  }).then(() => {
    insertCatalog.call(this, tree, this.title, name)
    handleX.call(this, child)
    handleStyle.call(this, child)
  }).then(() => {
    new Promise((resolve) => {
      handleImg.call(this, child)
      resolve()
    })
    .catch(() => {})
  }).then(() => {
    fs.writeFile(`./build/${child}/index.html`, this.page, (err) => {
      console.log(err || `${chalk.cyan(`- got ${child}!`)}`)
    })
  }).catch(() => {})
}
