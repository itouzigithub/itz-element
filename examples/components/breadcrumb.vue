<template lang="html">
  <el-breadcrumb class="itz-breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :to="item" :key="'breadcrumb_'+index">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import configRouter from '../route.config';
export default {
  name: 'itz-breadcrumb',

  props:{
    data:Array
  },

  data() {
    return {
      navsData: configRouter.navs
    };
  },
  computed:{
    breadcrumbs:function() {
      debugger;
      var route = this.$parent.$route;

      return (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];
    }
  },
  mounted() {
    debugger;
    // this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];
  }
};
</script>

<style lang="less">
.itz-breadcrumb {
  height: 40px;
  line-height: 40px;
}
</style>
