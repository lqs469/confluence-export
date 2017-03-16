const fetchChild = (id, cb) => {
  if (!id) { console.log('- 不给我Id叫我转什么???') }
  var tree = []

  var fetchTree = (id) => {
    return fetch(`http://192.168.130.51:8090/rest/api/content/search?cql=parent=${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${new Buffer('qinshuo:4693687').toString('base64')}`
      }
    }).then(res => res.json())
  }

  return fetchTree(id).then((data) => {
    data.results.map(p => {
      tree.push({ id: p.id, title: p.title, children: [] })
    })
    return tree.sort((a, b) => +a.id - +b.id)
  }).then((parents) =>{
    const eachFetch = parents.map(l => {
      return fetchTree(l.id).then(data => {
        return {
          id: l.id,
          title: l.title,
          children: data.results.map(f => {
            return {
              id: f.id,
              title: f.title
            }
          }).sort((a, b) => +a.id - +b.id)
        }
      })
    })

    return Promise.all(eachFetch)
  })
}

module.exports = fetchChild
