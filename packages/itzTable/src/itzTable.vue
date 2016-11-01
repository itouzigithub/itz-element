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
    <div class="table-loading" v-loading="loading"></div>
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
  import Eltable from 'element-ui/lib/table';
  import Elrow from 'element-ui/lib/row';
  import Elcol from 'element-ui/lib/col';
  import Elform from 'element-ui/lib/form';
  import ElFormItem from 'element-ui/lib/form-item';
  import Elinput from 'element-ui/lib/input';
  import Elbutton from 'element-ui/lib/button';

  export default {
    name: 'itz-table',

    props: {
      queryUrl: {
        type: String,
        default: ''
      },
      deleteUrl: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default() {
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
        default: function() {
          return [10, 20, 30, 50];
        }
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
          limit: 10,
          page: 1
        },
        lastRequest: null
      };
    },

    beforeMount() {
      console.debug('beforeMounted');
      this.queryParams.limit = this.pageSize;
      this.queryParams.page = this.currentPage;
    },

    mounted() {
      console.debug('mounted');
      this.getDataRemote();
      this.$on('onRefresh', this.onRefresh);
      this.$on('onSearch', this.onSearch);
      this.$on('onDelete', this.onDelete);
    },

    methods: {
      getDataRemote() {
        if (this.queryUrl) {
          this.loading = true;
          this.$http.get(this.queryUrl, {
            params: Object.assign({}, this.queryParams, this.searchObject),
            before(xhr) {
              if (this.lastRequest) {
                this.lastRequest.abort();
              }
              this.lastRequest = xhr;
            }
          })
            .then((res) => {
              this.loading = false;
              if (res.status !== 200 || res.body.code !== 0) {
                this.$message.error((res.body.info || '服务器题了一个问题，正在寻找答案...'));
              } else {
                this.tableData = res.body.data.listInfo;
                this.tableDataTotal = res.body.data.listTotal;
                if (this.tableDataTotal === 0) {
                  this.$message.info('没有符合条件的数据...');
                }
              }
            }, (res) => {
              this.loading = false;
              this.$message.error('服务器题了一个问题，正在寻找答案...');
            });
        }
      },
      handleSizeChange(newVal) {
        console.debug('clicked:handleSizeChange', newVal);
        this.queryParams.page = 1;
        this.queryParams.limit = newVal;
        this.getDataRemote();
      },
      handleCurrentChange(newVal) {
        console.debug('clicked:handleCurrentChange', newVal);
        this.queryParams.page = newVal;
        this.getDataRemote();
      },
      handleSelectRow(val) {
        console.debug('clicked:handleSelectRow', val);
        this.rowSelected = val;
      },
      onRefresh() {
        console.debug('emited:onRefresh');
        this.getDataRemote();
      },
      onSearch() {
        console.debug('clicked:onSearch', this.searchObject);
        this.getDataRemote();
      },
      onDelete() {
        var params;
        if (this.selectionMode === 'multiple') {
          params = [];
          this.rowSelected.map((row) => {
            params.push(row.id);
          });
        } else {
          params = this.rowSelected.id;
        }
        console.debug('clicked:onDelete', params);
        if (this.deleteUrl) {
          this.$http.post(this.deleteUrl, {
            id: params
          }, {
            emulateJSON: true,
            before(xhr) {
              if (this.lastRequest) {
                this.lastRequest.abort();
              }
              this.lastRequest = xhr;
            }
          }).then((res) => {
            if (res.status !== 200 || res.body.code !== 0) {
              this.$message.error((res.body.info || '服务器题了一个问题，正在寻找答案...'));
            } else {
              this.$message.success('删除成功');
              this.queryParams.page = 1;
              this.getDataRemote();
            }
          }, (res) => {
            this.loading = false;
            this.$message.error('服务器题了一个问题，正在寻找答案...');
          });
        }
      }
    }
  };
</script>

<style scoped>
  .itz-table-el-pagination {
    margin-top: 10px
  }
  .table-loading {
    width: 100%;
    height: 100%;
    position: absolute!important;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
