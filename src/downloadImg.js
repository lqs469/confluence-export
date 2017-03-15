const fs = require('fs')
const request = require('request')

function downloadImg (idAndName, dest, cb) {
  var url = (/http:\/\//g).test(idAndName)
    ? idAndName :`http://192.168.130.51:8090/download/attachments/${idAndName}`
  console.log('====>', url)
  var file = fs.createWriteStream(dest)
  request.head(url, function (err, res, body) {
    request(url, {
      'auth': {
        user: 'qinshuo',
        pass: '4693687'
      }
    }).pipe(file)
    .on('error', (err) => console.log('err', err))
    .on('finish', () => file.close())
    .on('close', cb)
  })
}

module.exports = downloadImg
