# Confluence2k
[中文文档](https://github.com/lqs469/confluence2k/blob/dev/README-zh.md)

Export HTML from confluence with nice style (just one code).

### User stories
- Confluence page can't be converted into manual or docment for users.
- Exported HTML by confluence's export tool is so ugly and has a lot of bugs.

### Requirements:
- `node ^4.5.0`
- `npm ^3.0.0` or `yarn ^0.17.0`

### Getting Started
1. `git clone` or download repo.
1. `npm install` or `yarn`
1. `npm start [confluence page id]`

	eg: `npm start 741256` will export all page the children of page with id is 741256
1. Export HTML file to the `./build`, open `index.html`.

### Some Stuff
- For some reason, we just support to export the pages in deepth of two now.
- Please refrain from using macro in confluence, Don't use macro in table.
- Catalog sort by create time.
- Image use `.png`.
- No support macro beside image and plain-text or rich-text

### At Last
- Continue, Anything just post Issues.
