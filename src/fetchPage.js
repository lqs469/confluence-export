const fetchPage = (id, cb) => {
  if (!id) {
    return console.log('- 没给我Id叫我转什么???')
  }
  const url = `http://192.168.130.51:8090/rest/api/content/${id}?expand=body.storage`
  fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${new Buffer('qinshuo:4693687').toString('base64')}`
    }
  })
  .then(res => res.json())
  .then(data => {
    cb(data.body.storage.value)
  })
}

module.exports = fetchPage
