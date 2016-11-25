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

调用组件事件时使用: ```this.$refs.mytable.$emit(事件名称, true)```
注：```mytable``` 为页面中 ```itz-table``` 的 ```ref``` 属性值 

|事件名称|说明|
|----|:----:|
|onSearch|通知表格进行查询|
|onRefresh|通知表格刷新|
|onDelete|通知表格删除当前选中的行|

### 关联操作按钮

```itz-table``` 提供 name 为 ```options``` 的插槽，可以自定义查询条件元素和各种按钮放入插槽，示例请看 ```example/app.vue```

## itz-form 组件

### itz-form 配置
|参数|说明|类型|可选值|默认值|
|---|:---:|:---:|:---:|:---:|
|action-query|表单查询地址，配置此地址后，编辑和查看的表单会按id从后端查询记录后再显示，如果不配置此地址，会使用当前表格选中的记录|String|-|-|
|action-create|表单新增地址|String|-|-|
|action-update|表单修改地址|String|-|-|
|title|表单显示标题|String|-|-|
|model|表单数据对象，同el-form|Object|-|-|
|rules|表单校验规则，同el-form|Object|-|-|
|dialogSize|表单弹窗大小|String|tiny/small/large/full|tiny|
|inline|行内表单模式，同el-form|Boolean|-|-|

### itz-form-item 配置
|参数|说明|类型|可选值|默认值|
|---|:---:|:---:|:---:|:---:|
|currentMode|可在哪个模式先显示此行表单项|String|insert,view,edit|insert,view,edit|
|special|是否自定义查看模式下的显示|String|custom|-|
|viewModel|查看模式下的数据对象|String\Number|-|-|
|prop|表单域数据对象|String|-|-|
|required|是否必填项|Boolean|-|-|
|label|标签文本|String|-|-|
|label-width|标签文本宽度，如：‘50px’|String|-|-|


# License
MIT
