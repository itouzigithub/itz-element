<style type="text/css">
    .header-wrapper {
        width: 100%;
        height: 50px;
        background-color: rgb(32, 160, 255);
    }
    .header-wrapper header {
        height: 100%;
        line-height: 50px;
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
        color: #fff;
    }
    .user-content li{
        margin-left: 20px;
        list-style: none;
        float: left;
    }
    .user-content li a{
        text-decoration: none;
        display: block;
        color: #fff;
        padding: 0 20px;
        opacity: .8;
    }
</style>
<template>
    <div class="header-wrapper">
        <header>
            <h1>DEMO</h1>
            <ul class="user-content">
                <li>Hi,admin</li>
                <li><a href="#" @click.prevent="logout">退出系统</a></li>
            </ul>
        </header>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            };
        },
        methods: {
            logout() {
            }
        }
    }
</script>