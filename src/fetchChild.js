var moment = require('moment')

const fetchChild = (id, cb) => {
  if (!id) { console.log('- 不给我Id叫我转什么???') }

  var fetchTree = (id) => {
    const url = `http://192.168.130.51:8090/rest/api/content/search?cql=parent=${id}&expand=history.lastUpdated`
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${new Buffer('qinshuo:4693687').toString('base64')}`
      }
    }).then(res => res.json())
  }

  var compare = (a, b) => moment(b.lastUpdated).isSameOrBefore(a.lastUpdated) ? 1 : -1

  return fetchTree(id).then((data) => {
    var tree = []
    data.results.map(p => {
      tree.push({
        id: p.id,
        title: p.title,
        lastUpdated: p.history.createdDate,
        children: [] })
    })
    return tree.sort((a, b) => compare(a, b))
  }).then((parents) =>{
    const eachFetch = parents.map(l => {
      return fetchTree(l.id).then(data => {
        return {
          id: l.id,
          title: l.title,
          children: data.results.map(f => {
            return {
              id: f.id,
              title: f.title,
              lastUpdated: f.history.createdDate,
            }
          }).sort((a, b) => compare(a, b))
        }
      })
    })

    return Promise.all(eachFetch)
  })
}

module.exports = fetchChild
