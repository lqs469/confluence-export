const downloadImg = require('./downloadImg')

function handleImg (page, id) {
  console.log('===>', this.page.substring(0, 300))
  while ((/<ac:structured-macro[\s\S]+?<\/ac:structured-macro>/g).test(page)) {
    page = replace1(page)
    this.page = page
  }

  while ((/<ac:image[\s\S]+?<\/ac:image>/g).test(page)) {
    page = replace2(page)
    this.page = page
  }

  function replace1 (page) {
    var ac = (/<ac:structured-macro[\s\S]+?<\/ac:structured-macro>/g).exec(page)[0]
    if (!(/ac:name="diagramName">([\s\S]*)<\/ac:parameter>/g).test(ac)) {
      if ((/<ac:plain-text-body>[\S]*<!\[CDATA\[([\s\S]*)]]><\/ac:plain-text-body>/g).exec(ac)) {
        var code = (/<ac:plain-text-body>[\S]*<!\[CDATA\[([\s\S]*)]]><\/ac:plain-text-body>/g).exec(ac)[1]
        return page.replace(ac, `<pre><code>${code}</code></pre>`)
      } else if ((/<ac:rich-text-body>([\s\S]*)<\/ac:rich-text-body>/g).exec(ac)) {
        var code = (/<ac:rich-text-body>([\s\S]*)<\/ac:rich-text-body>/g).exec(ac)[1]
        return page.replace(ac, `<pre><code>${code}</code></pre>`)
      } else return page.replace(ac, '')
    } else {
      var imgName = (/ac:name="diagramName">([\s\S]*)<\/ac:parameter>/g).exec(ac)[1]

      downloadImg(`${id}/${imgName}.png`, `./build/${id}/${imgName}.png`, (info) => {
        console.log('download completed')
      })

      return page.replace(ac, `<img src='./${encodeURIComponent(imgName)}.png' />`)
    }
  }

  function replace2 (page) {
    var ac = (/<ac:image[\s\S]+?<\/ac:image>/g).exec(page)[0]
    if ((/ri:filename="([\s\S]*)" \/>/g).exec(ac)) {
      var imgName = (/ri:filename="([\s\S]*)" \/>/g).exec(ac)[1]

      if ((/">/g).test(imgName)) {
        imgName = (/([\s\S]*)">/g).exec(imgName)[1]
      }

      downloadImg(`${id}/${imgName}`, `./build/${id}/${imgName}`, (info) => {
        console.log('download completed')
      })
      return page.replace(ac, `<img src='./${encodeURIComponent(imgName)}' />`)
    } else if ((/ri:value="([\s\S]*)" \/>/g).exec(ac)) {
      var url = (/ri:value="([\s\S]*)" \/>/g).exec(ac)[1]
      var imgName = url.split(/\//g)[url.split(/\//g).length - 1]

      downloadImg(`${url}`, `./build/${id}/${imgName}.png`, (info) => {
        console.log('download completed')
      })

      return page.replace(ac, `<img src='./${encodeURIComponent(imgName)}.png' />`)
    }
  }
}

module.exports = handleImg
