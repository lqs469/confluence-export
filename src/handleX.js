function handleX (id) {
  this.page = replace1(this.page)
  this.page = replace2(this.page)
  this.page = replace3(this.page)
  console.log('X')
}

var replace1 = (page) => page.replace(/<p>[&nbsp;]*<\/p>/g, '')

var replace2 = (page) => page.replace(/<!\[CDATA\[|\]\]>/g, '')

var replace3 = (page) => page.replace(/<ac:structured-macro[\s\S]+?\/>/g, '')


module.exports = handleX
