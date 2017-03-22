<style type="text/css">
.main-wrapper {
    position: absolute;
    top: 70px;
    bottom: 0;
    left: 200px;
    right: 20px;
    overflow: auto;
}
</style>
<template>
    <div>
        <main-header></main-header>
        <side-nav :data="navsData"></side-nav>
        <div class="main-wrapper">
            <router-view class="content"></router-view>
        </div>
    </div>
</template>
<script>
import { navs } from '../route.config';
export default {
    data() {
        return {
            navsData: navs
        };
    },
    methods: {
    }
}
</script>
