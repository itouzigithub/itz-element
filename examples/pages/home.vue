<style lang="less">
.side-nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;
    width: 200px;
    height: 100%;
    overflow: auto;
    background-color: #324157;
    transition: width .3s;
}
.side-nav .logo-con{
    padding: 8px;
    background: #39475a;
}
.side-nav h1{
    color: #fff;
    font-size: 25px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    white-space: nowrap;
}
.side-nav .menu-link{
    color:#475669;
    text-decoration:none;
    display:inline-block;
    width:100%;
}
.header-wrapper {
    position: fixed;
    padding-left: 200px;
    width: 100%;
    height: 60px;
    top: 0;
    z-index: 100;
    box-sizing: border-box;
    display: block;
    box-shadow: 0 2px 1px 1px hsla(0,0%,39%,.1);
    transition: padding .3s;
}
.header-wrapper header {
    height: 100%;
    line-height: 50px;
    background-color: #fff;
    position: relative;
    .nav-con{
        margin: 6px;
        display: inline-block;
        &-button{
            padding: 6px 10px;
            .el-icon-fa-bars{
                font-size: 25px!important;
            }
        }
    }
    .header-middle-con{
        position: absolute;
        left: 60px;
        top: 0;
        right: 340px;
        bottom: 0;
        padding: 10px;
        overflow: hidden;
    }
    .header-avator-con{
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 300px;
    }
}
.header-wrapper h1 {
    float: left;
    color: #fff;
    font-size: 26px;
    margin-left: 24px;
}
.user-content {
    float: right;
    margin-right: 20px;
    color: #333;
}
.user-content li{
    margin-left: 20px;
    list-style: none;
    float: left;
}
.user-content li a{
    text-decoration: none;
    display: block;
    color: #333;
    padding: 0 20px;
    /*opacity: .8;*/
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
}
.main-wrapper {
    box-sizing: border-box;
    padding: 60px 0 10px 200px;
    background-color: #f0f0f0;
    z-index: -1;
    overflow: auto;
    transition: padding .3s;
    .content{
        margin: 10px;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
}
</style>
<template>
    <div>
        <div class="side-nav" :style="{width: hideMenuText?'64px':'200px', overflow: hideMenuText ? 'visible' : 'auto'}">
            <div class="logo-con">
                <h1 v-show="!hideMenuText">会员管理系统</h1>
                <h1 v-show="hideMenuText">会</h1>
            </div>
            <div>
                <el-menu :collapse="hideMenuText" router @open="handleopen" theme="dark">
                    <template v-for="(item, index) in navsData">
                        <el-menu-item v-if="item.type == 'link'" :index="'el-menu-link-'+index">
                            <i :class="item.iconClass"></i><a slot="title" :href="item.path" target="_blank" class="menu-link">{{item.name}}</a>
                        </el-menu-item>
                        <el-menu-item v-else-if="!item.hideInSide && isShow(item.path)" :index="item.path">
                            <i :class="item.iconClass"></i><span slot="title">{{item.name}}</span>
                        </el-menu-item>
                        <el-submenu :index="'sub-'+index.toString()" v-else="item.groups || item.children">
                            <template slot="title"><i :class="item.iconClass"></i><span slot="title">{{item.name}}</span></template>
                            <el-menu-item v-for="(childItem,childIndex) in item.children" :key="'el-menu-childitem_'+childIndex" v-if="!childItem.hideInSide && isShow(childItem.path)" :index="childItem.path">
                                <i :class="childItem.iconClass"></i>
                                <a slot="title" v-if="childItem.type == 'link'" :href="childItem.path" target="_blank" class="menu-link">{{childItem.name}}</a>
                                <span slot="title" v-else>{{childItem.name}}</span>
                            </el-menu-item>
                            <el-menu-item-group v-for="(group,groupIndex) in item.groups" :key="'el-menu-group_'+groupIndex">
                                <span slot="title">{{group.groupName}}</span>
                                <el-menu-item v-for="(navItem,navIndex) in group.list" :key="'el-menu-navitem_'+navIndex" v-if="!navItem.hideInSide && isShow(navItem.path)" :index="navItem.path">
                                    <i :class="navItem.iconClass"></i>
                                    <span slot="title">{{navItem.name}}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                </el-menu>
            </div>
        </div>
        <div class="header-wrapper" :style="{paddingLeft: hideMenuText?'64px':'200px'}">
            <header>
                <div class="nav-con">
                    <el-button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" class="nav-con-button" type="text" icon="fa-bars" @click="toggleMenu"></el-button>
                </div>
                <div class="header-middle-con">
                    <itz-breadcrumb></itz-breadcrumb>
                </div>
                <div class="header-avator-con">
                    
                </div>
                <!-- <ul class="user-content" v-show="isLogin">
                    <li>Hi,{{username}}</li>
                    <li><a href="#" @click.prevent="logout">退出系统</a></li>
                </ul> -->
            </header>
        </div>
        <div class="main-wrapper" :style="{paddingLeft: hideMenuText?'64px':'200px'}">
            <transition :name="transitionName">
                <router-view class="content"></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import { navs } from '../route.config';
import itzBreadcrumb from '../components/breadcrumb';
export default {
    components: {
      itzBreadcrumb
    },
    data() {
        return {
            navsData: navs,
            transitionName: 'slide-left',
            hideMenuText:false,
            isLogin : true,
            username : 'caolong'
        };
    },
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    methods: {
        isShow(path){
            return path ? true : false;
        },
        logout() {
            // Auth.logout(this);
            // localStorage.clear();
        },
        toggleMenu () {
            this.hideMenuText = !this.hideMenuText;
        },
        handleopen : function(index,indexpath) {
        }
    }
}
</script>
