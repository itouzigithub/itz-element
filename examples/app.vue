<style>
html,
body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    margin: 0;
    padding: 0;
    height: 100%;
    background: #f0f0f0;
}

h1,
ul {
    margin: 0;
    padding: 0;
}

ul li {
    list-style: none;
}

#app {
    height: 100%;
    position: relative;
    background: #f0f0f0;
}
.el-select-dropdown {
    z-index: 10000!important;
}
.el-dialog__wrapper .el-form .el-tabs__content {
    white-space: normal;
}
.el-dialog__wrapper .el-form .el-tabs {
    display: block;
}
.el-table .el-table__body-wrapper{
    /*overflow-x: hidden!important;*/
}
.clearfix:after,.clearfix:before {
    display: table;
    content: ""
}
.clearfix:after {
    clear: both
}
</style>
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {

        };
    },
    mounted: function() {
    }
};
</script>
