require('es6-promise').polyfill()
require('isomorphic-fetch')
const figlet = require('figlet')

figlet.text('Comfluence2K', (e, data) => console.log(e || data))

const id = process.argv[2]
const url = `http://192.168.130.51:8090/rest/api/content/${id}?expand=body.storage`
console.log(url)

fetch(url, {
  headers: {
    Accept: 'application/json',
    Authorization: 'Basic base64(liqinshuo:liqinshuo@k2data.com.cn)'
  }
}).then(res => res.json()).then(data => {
  console.log(data)
})
