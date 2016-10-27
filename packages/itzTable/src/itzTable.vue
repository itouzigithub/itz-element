<template>
  <div class="itz-table">
    <el-row type="flex" justify="space-between" :gutter="1" class="itz-table-options" ref="itzTableOptions">
      <el-col :span="20">
        <el-form :inline="true" @submit.prevent="onSearch">
          <el-form-item v-for="(label, key) in search">
            <el-input v-model="search[key].value" :placeholder="label.label"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" :gutter="10" justify="end">
          <el-col :span="7"><el-button type="primary" @click.native.prevent="openInsertDialog">新增</el-button></el-col>
          <el-col :span="7"><el-button type="primary" @click.native.prevent="openEditDialog">修改</el-button></el-col>
          <el-col :span="7"><el-button type="primary" @click.native.prevent="openViewDialog">查看</el-button></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :width="width"
      :height="height"
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
      ref="elTable"
    >
      <slot></slot>
    </el-table>
    <el-row type="flex" class="row-bg" :justify="pagerPosition">
      <el-pagination
        class="itz-table-el-pagination"
        v-if="onePage"
        @sizechange="handleSizeChange"
        @currentchange="handleCurrentChange"
        :current-page="_shadow_currentPage"
        :page-sizes="pageSizes"
        :page-size="_shadow_pageSize"
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
      actionQuery:{
        type:String,
        default:''
      },
      data: {
        type: Array,
        default: function() {
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
      searchField: [String, Array]
    },

    components: {
      Eltable,
      Elrow
    },

    data() {
      return {
        tableData: [],
        tableDataTotal: 0,
        _shadow_pageSize: 10,
        _shadow_currentPage: 1,
        search: {}
      }
    },

    mounted: function() {
      let elTableFields = {}
      this.$refs.elTable.columns.map((field) => {
        if (field.property) {
          elTableFields[field.property] = field.label
        }
      })
      let elTableFieldsKeys = Object.keys(elTableFields)
      console.debug(elTableFields)
      if (this.searchField instanceof Array) {
        this.searchField.map((field) => {
          if (elTableFieldsKeys.indexOf(field) !== -1) {
            this.search[field] = {
              value: '',
              label: elTableFields[field]
            }
          }
        })
      } else {
        if (elTableFieldsKeys.indexOf(this.searchField) !== -1) {
          this.search[this.searchField] = {
            value: '',
            label: elTableFields[this.searchField]
          }
        }
      }
      console.debug(this.search)
      this._shadow_pageSize = this.pageSize
      this._shadow_currentPage = this.currentPage
      this.getDataRemote()
    },

    methods: {
      getDataRemote: function(url) {
        if (this.actionQuery) {
          if (!url) {
            var url = this.actionQuery + '?page=' + this._shadow_currentPage + '&size=' + this._shadow_pageSize
          }
          this.$http.get(url)
            .then((res) => {
              if (res.status !== 200 || res.body.code !== 0) {
                console.error(res)
              } else {
                this.tableData = res.body.data.list;
                this.tableDataTotal = res.body.data.listTotal;
              }
            }, (res) => {
              console.error(res)
            })
        }
      },
      handleSizeChange: function(newVal) {
        this._shadow_currentPage = 1
        this._shadow_pageSize = newVal
        this.getDataRemote()
      },
      handleCurrentChange: function(newVal) {
        this._shadow_currentPage = newVal
        this.getDataRemote()
      },
      onSearch: function() {
        console.debug('clicked:onSearch', this.search)
        var _search = {}
        Object.keys(this.search).map((key) => {
          _search[key] = this.search[key].value
        })
        let url = this.actionQuery + '?page=1&size=' + this._shadow_pageSize + '&' + this.serialize(_search)
        this.getDataRemote(url)
      },
      openInsertDialog: function() {
        console.debug('clicked:openInsertDialog')
      },
      openEditDialog: function() {
        console.debug('clicked:openEditDialog')
      },
      openViewDialog: function() {
        console.debug('clicked:openViewDialog')
      },
      serialize: function (obj, prefix) {
        if (obj) {
          var str = [];
          for(var p in obj) {
            if (obj.hasOwnProperty(p)) {
              var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
              str.push(
                typeof v == "object" ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v)
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
      onePage: function() {
        return this.tableDataTotal > this._shadow_pageSize
      }
    }
  };
</script>

<style scoped>
  .itz-table-el-pagination {
    margin-top: 10px
  }
</style>
