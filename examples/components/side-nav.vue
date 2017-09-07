<style type="text/css">
.side-nav {
    top: 50px;
    left: 0;
    bottom: 0;
    width: 200px;
    z-index: 10;
    padding-left: 0px;
    margin-right: 20px;
    overflow: auto;
    background-color: #eff2f7;
}
.side-nav .menu-link{
    color:#475669;
    text-decoration:none;
    display:inline-block;
    width:100%;
}
.box {
    position: absolute;
    width: 190px;
    height: 100%;
}

.boxshow {
    display:none;
}
.slip {
    border-right:10px solid lightgrey;
    position: absolute;
    z-index: 20;
    height: 100%;
}

.slipshow {
    margin-left: 190px;
}
#slipSwitch {
    position: absolute;
    top: 40%;
    z-index: 20;
    background: url("https://admin.itouzi.com/images/dataSystem/sliderOp.png") no-repeat;
    background-color: red;
    width: 10px;
    height: 30px;
    transition:1s;
}
.transImg {
    transform: rotate(180deg) scale(1);
}
</style>
<template>
    <div class="side-nav">
        <div>
            <el-menu router @open="handleopen" v-bind:class="{boxshow: isActive}" class="box">
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
        <div class="slip" v-bind:class="{slipshow: !isActive}">
            <span id="slipSwitch" v-bind:class="{transImg:isActive}" @click="test"></span>
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
        },
        test() {
            this.isCollapse = !this.isCollapse;
            if (this.isCollapse) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
            this.$emit('listen', this.isActive);
        }
    }
}
</script>
