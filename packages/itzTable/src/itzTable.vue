<template>
  <div class="itz-table">
    <el-row>
        <el-form :inline="true">
          <slot name="searchs"></slot>
          <slot name="buttons"></slot>
        </el-form>
    </el-row>
    <el-table
      :data="tableData"
      :width="width"
      :height="tableHeight"
      :fit="fit"
      :stripe="stripe"
      :border="border"
      :fixedColumnCount="fixedColumnCount"
      :selectionMode="selectionMode"
      :selection="selection"
      :allowNoSelection="allowNoSelection"
      :gutterWidth="gutterWidth"
      :customCriteria="customCriteria"
      :customBackgroundColors="customBackgroundColors"
      @selectionchange="handleSelectRow"
      ref="elTable">
      <el-table-column
        v-if="selectionMode=='multiple'"
        type="selection"
        width="50">
      </el-table-column>
      <slot></slot>
    </el-table>
    <div :style="tablePlaceholderStyle" class="table-loading" v-loading="loading"></div>
    <el-row type="flex" class="row-bg" :justify="pagerPosition">
      <el-pagination
        class="itz-table-el-pagination"
        @sizechange="handleSizeChange"
        @currentchange="handleCurrentChange"
        :current-page="queryParams.page"
        :page-sizes="pageSizes"
        :page-size="queryParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataTotal">
      </el-pagination>
    </el-row>
  </div>
</template>

<script type="text/babel">

  import Eltable from 'element-ui/lib/table'
  import Elrow from 'element-ui/lib/row'
  import Elcol from 'element-ui/lib/col'
  import Elform from 'element-ui/lib/form'
  import ElFormItem from 'element-ui/lib/form-item'
  import Elinput from 'element-ui/lib/input'
  import Elbutton from 'element-ui/lib/button'
  
  export default {
    name: 'itz-table',

    props: {
      queryUrl:{
        type:String,
        default:''
      },
      deleteUrl:{
        type:String,
        default:''
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },

      width: [String, Number],

      height: {
        type: [String, Number],
        default: 400
      },

      fit: {
        type: Boolean,
        default: true
      },

      stripe: {
        type: Boolean,
        default: false
      },

      border: {
        type: Boolean,
        default: false
      },

      fixedColumnCount: {
        type: Number,
        default: 0
      },

      selectionMode: {
        type: String,
        default: 'none'
      },

      selection: {},

      allowNoSelection: {
        type: Boolean,
        default: false
      },

      gutterWidth: {
        default: 0
      },

      customCriteria: Array,
      customBackgroundColors: Array,

      currentPage: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageSizes: {
        type: Array,
        default: [10, 20, 30, 50]
      },
      pagerPosition: {
        type: String,
        default: 'end'
      },
      searchObject: {
        type: Object,
        default: {}
      }
    },

    components: {
      Eltable,
      Elrow,
      Elcol,
      Elform,
      ElFormItem,
      Elinput,
      Elbutton
    },

    data() {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [],
        tableDataTotal: 0,
        rowSelected: [],
        queryParams: {
          size: 10,
          page: 1
        }
      }
    },

    mounted() {
      this.queryParams.size = this.pageSize
      this.queryParams.page = this.currentPage
      this.getDataRemote()
      this.$on('onSearch', this.onSearch)
      this.$on('onDelete', this.onDelete)
    },

    methods: {
      getDataRemote() {
        if (this.queryUrl) {
          this.loading = true
          let url = this.buildUrl()
          this.$http.get(url)
            .then((res) => {
              this.loading = false
              if (res.status !== 200 || res.body.code !== 0) {
                this.$notify.error({
                  title: 'Ooooooops',
                  message: '服务器题了一个问题，正在寻找答案...'
                });
              } else {
                this.tableData = res.body.data.list;
                this.tableDataTotal = res.body.data.listTotal;
                if (this.tableDataTotal === 0) {
                  this.$notify.info({
                    title: 'Notication',
                    message: '没有符合条件的数据...'
                  });
                }
              }
            }, (res) => {
              this.loading = false
              this.$notify.error({
                title: 'Ooooooops',
                message: '服务器题了一个问题，正在寻找答案...'
              });
            })
        }
      },
      handleSizeChange(newVal) {
        this.queryParams.page = 1
        this.queryParams.size = newVal
        this.getDataRemote()
      },
      handleCurrentChange(newVal) {
        this.queryParams.page = newVal
        this.getDataRemote()
      },
      handleSelectRow(val) {
        this.rowSelected = val
      },
      onSearch() {
        console.debug('clicked:onSearch', this.searchObject)
        this.getDataRemote()
      },
      onDelete() {
        var params = []
        this.rowSelected.map((row) => {
          params.push(row.id)
        })
        console.debug('clicked:onDelete', params)
        if (this.deleteUrl) {
          this.$http.post(this.deleteUrl, {"ids": params}).then((res) => {
            if (res.status !== 200 || res.body.code !== 0) {
              this.$notify.error({
                title: 'Ooooooops',
                message: '服务器题了一个问题，正在寻找答案...'
              });
            } else {
              this.$notify.success({
                title: 'Success',
                message: '删除成功'
              });
              this.queryParams.page = 1
              this.getDataRemote()
            }
          }, (res) => {
            this.loading = false
            this.$notify.error({
              title: 'Ooooooops',
              message: '服务器题了一个问题，正在寻找答案...'
            });
          })
        }
      },
      buildUrl() {
        return this.queryUrl + '?' + this.serialize(Object.assign({}, this.queryParams, this.searchObject))
      },
      serialize(obj, prefix) {
        if (obj) {
          var str = [];
          for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
              var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
              str.push(
                typeof v == "object" ?
                this.serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent((
                  v == 'null' || v == 'undefined' || v == undefined
                ) ? '' : v)
              );
            }
          }
          return str.join("&");
        } else {
          return ''
        }
      }
    },

    computed: {
      tablePlaceholderStyle() {
        if (!this.tableDataTotal || this.loading) {
          this.tableHeight = 0
          return {
            height: this.height + 'px'
          }
        } else {
          this.tableHeight = this.height
          return {
            height: '0px'
          }
        }
      }
    }
  };
</script>

<style scoped>
  .itz-table-el-pagination {
    margin-top: 10px
  }
</style>
