<style type="text/css">
.side-nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;
    width: 200px;
    height: 100%;
    overflow: auto;
    background-color: #324157;
}
.side-nav .logo-con{
    height: 44px;
    padding: 8px;
    background: #39475a;
}
.side-nav h1{
    color: #fff;
    font-size: 26px;
    text-align: center;
    margin-top: 6px;
}
.side-nav .menu-link{
    color:#475669;
    text-decoration:none;
    display:inline-block;
    width:100%;
}

</style>
<template>
    <div class="side-nav">
        <div class="logo-con">
            <h1>内容管理系统</h1>
        </div>
        <div>
            <el-menu router @open="handleopen" theme="dark">
                <template v-for="(item, index) in data">
                    <el-menu-item v-if="item.type == 'link'" :index="'el-menu-link-'+index">
                        <i :class="item.iconClass"></i><a :href="item.path" target="_blank" class="menu-link">{{item.name}}</a>
                    </el-menu-item>
                    <el-menu-item v-else-if="!item.hideInSide && isShow(item.path)" :index="item.path">
                        <i :class="item.iconClass"></i>{{item.name}}
                    </el-menu-item>
                    <el-submenu :index="'sub-'+index.toString()" v-else="item.groups || item.children">
                        <template slot="title"><i :class="item.iconClass"></i>{{item.name}}</template>
                        <el-menu-item v-for="(childItem,childIndex) in item.children" :key="'el-menu-childitem_'+childIndex" v-if="!childItem.hideInSide && isShow(childItem.path)" :index="childItem.path">
                            <i :class="childItem.iconClass"></i>
                            <a v-if="childItem.type == 'link'" :href="childItem.path" target="_blank" class="menu-link">{{childItem.name}}</a>
                            <span v-else>{{childItem.name}}</span>
                        </el-menu-item>
                        <el-menu-item-group v-for="(group,groupIndex) in item.groups" :key="'el-menu-group_'+groupIndex" :title="group.groupName">
                            <el-menu-item v-for="(navItem,navIndex) in group.list" :key="'el-menu-navitem_'+navIndex" v-if="!navItem.hideInSide && isShow(navItem.path)" :index="navItem.path">
                                <i :class="navItem.iconClass"></i>{{navItem.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
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
        return {
            isCollapse: false,
            openObject: {},
            isActive:false
        };
    },
    methods: {
        isShow(path){
            return path ? true : false;
        },
        handleopen : function(index,indexpath) {
        }
    }
}
</script>
