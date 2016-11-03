<template>
  <div class="itz-table" :style="tableStyle">
    <slot name="options"></slot>
    <el-table
      :data="tableData"
      :style="tableStyle"
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
    <el-row type="flex" class="row-bg" :justify="pagerPosition"
      v-if="showPagination"
    >
      <el-pagination
        ref="elPagination"
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
      deleteConfirm: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },

      width: [String, Number],
      
      maxHeight: [String, Number],

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
      },
      showPagination: {
        type: Boolean,
        default: true
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
        tableStyle: {},
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
      if (this.height) {
        this.tableHeight = this.height
      }
      if (this.showPagination) {
        this.queryParams.limit = this.pageSize;
        this.queryParams.page = this.currentPage;
      }
    },

    mounted() {
      console.debug('mounted');
      window.onresize = () => this.calcTableStyle();
      this.getDataRemote();
      this.$on('onRefresh', this.onRefresh);
      this.$on('onSearch', this.onSearch);
      this.$on('onDelete', this.onDelete);
    },

    watch: {
      queryUrl(newProps, oldProps) {
        this.getDataRemote();
      }
    },

    methods: {
      getDataRemote() {
        if (this.queryUrl) {
          this.loading = true;
          this.$http.get(this.queryUrl, {
            params: Object.assign(
              {},
              (this.showPagination ? this.queryParams : {}),
              this.searchObject
            ),
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
                this.tableData = [];
                this.tableDataTotal = 0;
                if (res.body.code == 10107 && this.$auth) {
                    var vm  = this;
                    this.$alert('用户未登录','提示', {
                        type:'error',
                        callback: action => {
                            vm.$auth.logout(vm);
                        }
                    });
                } else {
                    this.$message.error((res.body.info || '服务器题了一个问题，正在寻找答案...'));
                }
              } else {
                this.tableData = res.body.data.listInfo;
                this.tableDataTotal = res.body.data.listTotal;
                if (this.tableDataTotal === 0) {
                  this.$message.info('没有符合条件的数据...');
                }
                this.$nextTick(() => this.calcTableStyle());
              }
            }, (res) => {
              this.loading = false;
              this.tableData = [];
              this.tableDataTotal = 0;
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
          if (this.deleteConfirm) {
            this.$confirm('将执行删除操作，是否继续？', '警告', {
              type: 'warning'
            }).then(() => {
              this.execDelete(params);
            }).catch(() => {
              console.debug('clicked:onDelete:cancel', params);
            });
          } else {
            this.execDelete(params);
          }
        } else {
          this.$message.error('组件没有提供删除地址');
        }
      },
      execDelete(params) {
        console.debug('clicked:onDelete:exec', params);
        this.$http.post(this.deleteUrl, { id: params }, {
          emulateJSON: true,
          before(xhr) {
            if (this.lastRequest) {
              this.lastRequest.abort();
            }
            this.lastRequest = xhr;
          }
        }).then((res) => {
          if (res.status !== 200 || res.body.code !== 0) {
            if (res.body.code == 10107 && this.$auth) {
                    var vm  = this;
                    this.$alert('用户未登录','提示', {
                        type:'error',
                        callback: action => {
                            vm.$auth.logout(vm);
                        }
                    });
                } else {
                    this.$message.error((res.body.info || '服务器题了一个问题，正在寻找答案...'));
                }
          } else {
            if (this.showPagination) {
              this.queryParams.page = 1;
            }
            this.getDataRemote();
            this.$message.success('删除成功');
          }
        }, (res) => {
          this.$message.error('服务器题了一个问题，正在寻找答案...');
        });
      },
      calcTableStyle() {
        console.debug('calcTableStyle:exec');
        if (this.width) {
          this.tableStyle = {
            width: this.width + 'px'
          }
        }
        if (this.maxHeight) {
          var elTableRect = this.$refs.elTable.$el.getBoundingClientRect();
          var elTableHeadRect = this.$refs.elTable.$el.querySelector('.el-table__header').getBoundingClientRect();
          var elTableBodyRect = this.$refs.elTable.$el.querySelector('.el-table__body').getBoundingClientRect();
          var elTableHeight = elTableBodyRect.height + elTableHeadRect.height;
          var elTableHeightWithPager = elTableHeight;
          var _x = 15;// 偏移量
          if (this.showPagination) {
            var elPagination = this.$refs.elPagination.$el.getBoundingClientRect();
            _x += elPagination.height + 5
            elTableHeightWithPager += elPagination.height
          }
          if (this.maxHeight == 'auto') {
            var bodyHeight = window.innerHeight;
            var _height = bodyHeight - elTableRect.top;
            if (_height < elTableHeightWithPager) {
              this.tableHeight = _height - _x;
            } else {
              this.tableHeight = elTableHeight;
            }
          } else {
            if (this.maxHeight < elTableHeightWithPager) {
              this.tableHeight = this.maxHeight;
            } else {
              this.tableHeight = elTableHeight;
            }
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
  .table-loading {
    width: 100%;
    height: 100%;
    position: absolute!important;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
