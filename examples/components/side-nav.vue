<style type="text/css">
.side-nav {
    top: 50px;
    left: 0;
    bottom: 0;
    z-index: 10;
    padding-left: 0px;
    margin-right: 20px;
    overflow: auto;
    background-color: #eff2f7;
}
.box {
    position: absolute;
    width: 170px;
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
    margin-left: 170px;
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
            <el-menu router v-bind:class="{boxshow: isActive}" @open="handleopen" mode="vertical" class="box">
                <div v-for="(item, index) in data" :key="'el-menu-item_'+index">
                    <el-menu-item v-if="!item.hideInSide && isShow(item.path)" :index="item.path">{{item.name}}</el-menu-item>
                    <el-submenu :index="'sub-'+index.toString()" v-else="item.groups || item.children">
                        <template slot="title">{{item.name}}</template>
                        <el-menu-item v-for="(childItem,childIndex) in item.children" :key="'el-menu-childitem_'+childIndex" v-if="!childItem.hideInSide && isShow(childItem.path)" :index="childItem.path">
                            {{childItem.name}}
                        </el-menu-item>
                        <el-menu-item-group v-for="(group,groupIndex) in item.groups" :key="'el-menu-group_'+groupIndex" :title="group.groupName">
                            <el-menu-item v-for="(navItem,navIndex) in group.list" :key="'el-menu-navitem_'+navIndex" v-if="!navItem.hideInSide && isShow(navItem.path)" :index="navItem.path">
                                {{navItem.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </div>
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
            return true;
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
