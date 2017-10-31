<style type="text/css">
.login {
    position: absolute;
    top: 80px;
    left: 0;
    bottom: 0;
    width: 100%;
}
.login-form {
    width: 360px;
    margin: 80px auto 0 auto;
    padding: 20px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    -webkit-transition: .2s;
    transition: .2s;
}
</style>
<template>
    <div>
        <main-header></main-header>
        <div class="login" @keyup.enter="login">
            <div class="login-form">
                <el-form class="form" :model="user" :rules="formRules" ref="loginForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="user.username" placeholder="请输入用户名" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="user.password" placeholder="请输入密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px" style="margin-top:36px;">
                        <el-button type="primary" @click.native.prevent="login" style="width:100%;">{{btnText}}</el-button>
                        <!-- <el-button type="warning" @click.native.prevent="resetForm">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user:{
                username: '',
                password: ''
            },
            isBtnLoading:false,
            formRules:{
                username:[
                    { required: true,message:'请输入用户名',trigger: 'blur'}
                ],
                password:[
                    { required: true,message:'请输入密码',trigger: 'blur'}
                ]
            }
        };
    },
    mounted: function() {

    },
    computed: {
        btnText() {
          if (this.isBtnLoading) return '登录中...';
          return '登录';
        }
    },
    methods: {
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                   this.isBtnLoading = true;
                   this.$auth.login(this,this.user.username,this.user.password,(res) =>{
                        this.isBtnLoading = false;
                   }); 
               } else {
                    return false;
               }
            })
            
        },
        resetForm() {
            this.$refs.loginForm.resetFields();
        }
    }
}
</script>
