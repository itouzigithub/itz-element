<template>
  <div class="itz-table">
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
    <el-pagination
      v-if="onePage"
      @sizechange="handleSizeChange"
      @currentchange="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableDataTotal">
    </el-pagination>
  </div>
</template>

<script type="text/babel">

  import Eltable from 'element-ui/lib/table';

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
          return [];
        }
      },

      width: [String, Number],

      height: [String, Number],

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
      }
    },

    components: {
      Eltable
    },

    data() {
      return {
        tableData: [],
        tableDataTotal: 0,
        _shadow_pageSize: 10,
        _shadow_currentPage: 1
      }
    },

    mounted: function() {
      this._shadow_pageSize = this.pageSize;
      this._shadow_currentPage = this.currentPage;
      this.getDataRemote();
    },

    methods: {
      getDataRemote: function() {
        if (this.actionQuery) {
          let url = this.actionQuery + '?page=' + this._shadow_currentPage + '&size=' + this._shadow_pageSize
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
            });
        }
      },
      handleSizeChange: function(newVal) {
        this._shadow_pageSize = newVal
        this.getDataRemote();
      },
      handleCurrentChange: function(newVal) {
        this._shadow_currentPage = newVal
        this.getDataRemote();
      }
    },

    computed: {
      onePage: function() {
        return this.tableDataTotal > this._shadow_pageSize
      }
    }
  };
</script>
