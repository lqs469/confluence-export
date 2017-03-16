function handleX (id) {
  this.page = replace1(this.page)
  this.page = replace2(this.page)
  this.page = replace3(this.page)
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


module.exports = handleX
