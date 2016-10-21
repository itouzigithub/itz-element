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
    <slot name="pagenation"></slot>
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
      customBackgroundColors: Array
    },

    components: {
      Eltable
    },

    data() {
      return {
        tableData:this.data
      }
    },

    mounted: function() {
      this.getDataRemote();
    },

    methods: {
      getDataRemote: function() {
        if (this.actionQuery) {
          this.$http.get(this.actionQuery)
            .then((res) => {
                this.tableData = res.data.list;
            }, (res) => {

            });
        }
      }
    }
  };
</script>
