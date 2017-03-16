const fetchPage = (id, cb) => {
  const url = `http://192.168.130.51:8090/rest/api/content/${id}?expand=body.storage`
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${new Buffer('qinshuo:4693687').toString('base64')}`
    }
  })
  .then(res => res.json())
  .then(data => {
    cb({
      title: data.title,
      body: data.body.storage.value
    })
  })
}

module.exports = fetchPage
