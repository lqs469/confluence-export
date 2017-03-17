# comfluence2k

一键式从confluence导出成静态web文档。

### 解决问题
- confluence文档没法变成用户手册
- confluence自带的导出文档界面丑陋，交互困难，没法给用户看

### 使用方法
1. `git clone` 或者 download repo.
1. `npm install`
  环境需要:
    - `node ^4.5.0`
    - `npm ^3.0.0` or `yarn ^0.17.0`
1. `npm start [confluence根文章id]` (会以id为根目录, 导出根目录以下的结构和文章)
  例如: `npm start 741256` 会导出 id=741256 下的所有子文章
1. 导出的静态文档在`./build`中, 可以打开`index.html`查看文档.

### 注意事项
- 需求原因, 目前只支持深度为2的子目录.
- 在confluence中尽量不要使用macro, 在表格中不要使用macro(否则会无法正常显示).
- 目录的顺序按照文章创建时间正序排序, 如需要调整顺序, 可以复制旧文章内容到新建的文章, 就会出现在导出文档目录最下.
- 图片使用`.png`格式.
- 目前不支持图片和代码之外的macro格式 (例如macro目录)

### 最后
- 仍在改进, 任何问题请Issues.
