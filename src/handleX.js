function handleX (id) {
  this.page = replace1(this.page)
  this.page = replace2(this.page)
  this.page = replace3(this.page)
  this.page = replace4(this.page)
  this.page = replace5(this.page)
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

let replace5 = (page) => {
  // <a href="/pages/viewpage.action?pageId=10457799&amp;preview=%2F10457799%2F10458247%2FdemoTool.zip">
  if ((/<a href="[\s\S]+?zip">/g).test(page)) {

  }
}



module.exports = handleX
