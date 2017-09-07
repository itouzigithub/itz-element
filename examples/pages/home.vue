<style type="text/css">
.main-wrapper {
    position: absolute;
    top: 70px;
    bottom: 0;
    right: 20px;
    left: 30px;
    overflow: auto;
}

.autoleft {
    left: 220px;
}

</style>
<template>
    <div>
        <main-header></main-header>
        <side-nav :data="navsData" v-on:listen="getListenValue"></side-nav>
        <div class="main-wrapper" v-bind:class="{autoleft: isActive}">
            <router-view class="content"></router-view>
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
        getListenValue:function (data) {
                            console.log(data);
                           if (data) {
                               this.isActive = false;
                           } else {
                               this.isActive = true;
                           }
                        }
    }
}
</script>
