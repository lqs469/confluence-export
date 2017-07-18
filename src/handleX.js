function handleX (id) {
  this.page = replace1(this.page)
  this.page = replace2(this.page)
  this.page = replace3(this.page)
  this.page = replace4(this.page)
  this.page = replace5(this.title, this.page)
}

var replace1 = (page) => page.replace(/<p><\/p>/g, '')

var replace2 = (page) => page.replace(/<!\[CDATA\[|\]\]>/g, '')

var replace3 = (page) => {
  if ((/<ac:structured-macro[\s\S]+?\/>/g).test(page)) {
    var ac = (/<ac:structured-macro[\s\S]+?\/>/g).exec(page)[0]
    return (/></g).test(ac)
      ? page : page.replace(ac, '')
  }
  return page
}

var replace4 = (page) => {
  if ((/<ac:task-list>[\s\S]+?<\/ac:task-list>/g).test(page)) {
    return page.replace(/<ac:task-list>[\s\S]+?<\/ac:task-list>/g, '')
  }
  return page
}

var replace5 = (title, page) => {
  let titleFormated = title.replace(/ /g, '') + '-'
  let insertId = page.replace(/<h([\d]+)([\s\S]*?)>([\s\S]+?)<\/h([\d]+)>/g, (...args) => {
    return `<h${args[1]} id="${titleFormated}` + args[3].replace(/ /g, '') + `" ${args[2]}>${args[3]}</h${args[1]}>`
  })
  return insertId
}

module.exports = handleX
