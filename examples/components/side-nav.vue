<style type="text/css">
.side-nav {
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 180px;
    z-index: 10;
    padding-left: 0px;
    margin-right: 20px;
    overflow: auto;
    background-color: #eff2f7;
}
</style>
<template>
    <div class="side-nav">
        <el-menu router v-for="(item, index) in data" :key="item.path" @open="handleopen">
            <el-menu-item v-if="!item.hideInSide && isShow(item.path)" :index="item.path">{{item.name}}</el-menu-item>
            <el-submenu :index="'sub-'+index.toString()" v-else="item.groups || item.children">
                <template slot="title">{{item.name}}</template>
                <el-menu-item v-for="childItem in item.children" v-if="!childItem.hideInSide && isShow(childItem.path)" :key="childItem.path" :index="childItem.path">
                    {{childItem.name}}
                </el-menu-item>
                <el-menu-item-group v-for="group in item.groups" :key="group.groupName" :title="group.groupName">
                    <el-menu-item v-for="navItem in group.list" v-if="!navItem.hideInSide && isShow(navItem.path)" :key="navItem.path" :index="navItem.path">
                        {{navItem.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    props: {
        data: Array,
        base: {
            type: String,
            default: ''
        }
    },
    data() {
        return {};
    },
    methods: {
        isShow(path){
            return true;
        },
        handleopen : function(index,indexpath) {
        }
    }
}
</script>
