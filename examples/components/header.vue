<style type="text/css">
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
        <i class="el-icon-fa-hand-o-right"></i>
        <header>
            <ul class="user-content" v-show="isLigin">
                <li>Hi,{{username}}</li>
                <li><a href="#" @click.prevent="logout">退出系统</a></li>
            </ul>
        </header>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isLigin : true,
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
