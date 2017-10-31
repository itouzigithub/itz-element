<style lang="less">
.main-wrapper {
    box-sizing: border-box;
    padding: 60px 0 10px 200px;
    background-color: #f0f0f0;
    z-index: -1;
    overflow: auto;
    .content{
        margin: 10px;
    }
}
</style>
<template>
    <div>
        <side-nav :data="navsData"></side-nav>
        <main-header></main-header>
        <div class="main-wrapper">
            <el-card class="content">
                <router-view></router-view>
            </el-card>
        </div>
    </div>
</template>
<script>
import { navs } from '../route.config';
export default {
    data() {
        return {
            navsData: navs,
            isActive: true
        };
    },
    methods: {
        
    }
}
</script>
