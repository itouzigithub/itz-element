<style lang="less">
    .header-wrapper {
        position: fixed;
        padding-left: 200px;
        width: 100%;
        height: 60px;
        top: 0;
        z-index: 100;
        box-sizing: border-box;
        display: block;
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
</style>
<template>
    <div class="header-wrapper">
        <header>
            <div class="nav-con">
                <el-button :style="{transform: 'rotateZ(' + (this.hideMenuText ? '-90' : '0') + 'deg)'}" class="nav-con-button" type="text" icon="fa-bars"></el-button>
            </div>
            <div class="header-middle-con">
                
            </div>
            <div class="header-avator-con">
                
            </div>
            <!-- <ul class="user-content" v-show="isLogin">
                <li>Hi,{{username}}</li>
                <li><a href="#" @click.prevent="logout">退出系统</a></li>
            </ul> -->
        </header>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                hideMenuText:false,
                isLogin : true,
                username : 'caolong'
            };
        },
        methods: {
            logout() {
                // Auth.logout(this);
                // localStorage.clear();
            }
        }
    }
</script>
