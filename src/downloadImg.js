const fs = require('fs')
const request = require('request')

function downloadImg (idAndName, dest, cb) {
  var url = (/http:\/\//g).test(idAndName)
    ? idAndName :`http://192.168.130.51:8090/download/attachments/${encodeURI(idAndName)}`
1
  let file = fs.createWriteStream(dest)
  request.head(url, function (err, res, body) {
    request(url, {
      'auth': {
        user: '',
        pass: ''
      }
    })
    .pipe(file)
    .on('error', (err) => console.log('err', err))
    .on('finish', () => file.close())
    .on('close', cb)
  })
}

module.exports = downloadImg
