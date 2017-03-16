const downloadImg = require('./downloadImg')

function handleImg (id) {
  var page = this.page

  while ((/ac:structured-macro/g).test(page)) {
    page = replace1(page)
    this.page = page
  }

  while ((/ac:image/g).test(page)) {
    page = replace2(page)
    this.page = page
  }

  function replace1 (page) {
    var ac = (/<ac:structured-macro[\s\S]+?>([\s\S]+?)<\/ac:structured-macro>/g).exec(page)
    // ac[0] = all, ac[1] = params

    if ((/<ac:parameter ac:name="diagramName">([\s\S]*)<\/ac:parameter>/g).test(ac[1])) {
      var imgName = (/<ac:parameter ac:name="diagramName">([\s\S]+?)<\/ac:parameter>/g).exec(ac[1])[1]

      downloadImg(`${id}/${imgName}.png`, `./build/${id}/${imgName}.png`, (info) => {
        console.log(`- File ${imgName}.png download completed`)
      })

      return page.replace(ac[0], `<img src='./${encodeURIComponent(imgName)}.png' />`)
    } else {
      var code = ac[1].replace(/<ac:parameter[\s\S]+?>[\s\S]+?<\/ac:parameter>/g, '')
      code = code.replace(/ac:plain-text-body|ac:rich-text-body/g, 'pre')
      return page.replace(ac[0], code)
    }
  }

  function replace2 (page) {
    var ac = (/<ac:image[\s\S]*?>([\s\S]+?)<\/ac:image>/g).exec(page)
    var imgName = ''

    if ((/ri:filename=/g).test(ac[1])) {
      imgName = (/ri:filename="([\s\S]+?)" \/>/g).exec(ac[1])[1]
    } else {
      imgName = (/ri:value="([\s\S]+?)" \/>/g).exec(ac[1])[1]
    }

    var url = (/http:\/\//g).test(imgName) ? imgName : `${id}/${imgName}`
    imgName = (/http:\/\//g).test(imgName) ? (/[\s\S]*\/([\s\S]*.png)/g).exec(imgName)[1] : imgName
    img = `<img src="./${encodeURIComponent(imgName)}" />`

    downloadImg(url, `./build/${id}/${imgName}`, (info) => {
      console.log(`- File ${imgName}.png download completed`)
    })
    return page.replace(ac[0], img)
  }
}

module.exports = handleImg
