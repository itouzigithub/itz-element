# itz-element
> itouzi dashboard ui base on element

# Development

```shell
npm i cooking -g
npm install
npm run dev
```

# Production
```
npm run dist
```

# Components

## itz-table 组件

### itz-table 配置
|参数|说明|类型|可选值|默认值|
|---|:---:|:---:|:---:|:---:|
|width|表格固定宽度|number|-|-|
|height|表格固定高度|number|-|-|
|max-height|表格最大自适应高度，值为auto时表示取页面最大高度|string, number|'auto'|-|
|stripe|是否为斑马纹 table|boolean|—|false|
|border|是否带有纵向边框|boolean|—|false|
|fit|列的宽度是否自撑开|boolean|—|true|
|select-mode|单选还是多选|string|'single'/'multiple'/'none'|'none'|
|row-class-name|行的 className 的回调。|Function(row, index)|-|-|
|row-key|行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的|Function(row), String|-|-|
|query-url|展示数据的接口|string|-|-|
|delete-url|删除操作的接口|string|-|-|
|delete-confirm|删除前是否需要确认操作|boolean|-|true|
|current-page|默认显示第几页|number|-|1|
|page-size|每页显示条数|number|-|10|
|page-sizes|每页显示个数选择器的选项设置|Array|-|[10,20,30,50]|
|pager-position|分页的位置|string|'start'/'center'/'end'|'end'|
|show-pagination|是否显示分页|boolean|true/false|true|
|search-object|搜索对象|object|-|{}|

### itz-table 事件
调用组件事件时使用: this.$refs.mytable.$emit(事件名称, true)
注：mytable 为页面中 itz-table 的 ref 属性值
|事件名称|说明|
|---|:---:|
|onSearch|通知表格进行查询|
|onRefresh|通知表格刷新|
|onDelete|通知表格删除当前选中的行|

# License
MIT
