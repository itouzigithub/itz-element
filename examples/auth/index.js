
import vueCookie from 'vue-cookie';

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const COOKIE_EXPIRES = 0.25;

export default {

    install(Vue,options) {
        Vue.prototype.$auth = this;
    },

    login(vm,username,password,callBack,returnUrl) {
        vm.$http.post(LOGIN_URL,{username:username,password:password})
        .then((res) => {
            var data = res.data;
            if (data.code == 0) {
                this.setCookie(true,username);
                localStorage.setItem('authList',data.data.authList);
                var url = returnUrl ? returnUrl : '/';
                vm.$router.replace(url);
            } else if (data.code == 1) {
                this.deleteCookie();
                vm.$message({
                    showClose: true,
                    message: data.info,
                    type: 'error'
                });
            }
            callBack && callBack(res);
        }, (res) => {
            this.deleteCookie();
            vm.$message({
                showClose: true,
                message: '网络错误，请稍后重试',
                type: 'error'
            });
            callBack && callBack(res);
        });
    },

    logout(vm) {
        vm.$http.get(LOGOUT_URL)
        .then((res) => {
            this.deleteCookie();
            vm.$router.replace('/login');
        }, (res) => {
            this.deleteCookie();
            vm.$router.replace('/login');
        });
    },

    setCookie(isLogin,username) {
        vueCookie.set('isLogin',isLogin,COOKIE_EXPIRES);
        vueCookie.set('username',username,COOKIE_EXPIRES);
    },

    deleteCookie() {
        vueCookie.delete('isLogin');
        vueCookie.delete('username');
    },

    checkLogin() {
        var islogin = vueCookie.get('isLogin');
        return islogin == 'true' ? true : false;
    },
    checkAuth(path){
        var authList = this.getAuthList();
        var homePath = (process.env.NODE_ENV === 'production') ? '/app/index.html#' : '/app-dev/index.html#';
        if(process.env.NODE_ENV === 'production'){
            return (authList && authList.indexOf(homePath+path) != -1) ? true : false;
        }else{
            return true;
        }
    },
    getAuthList(){
        return localStorage.getItem('authList') ? localStorage.getItem('authList').split(',') : [];
    },
    getUsername() {
        return vueCookie.get('username');
    }

}