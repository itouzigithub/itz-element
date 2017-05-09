<style type="text/css">
    .itz-form{
        /*position: relative;*/
    }
    .itz-form-wrapper{
        padding: 10px 18px 18px 18px;
        border:1px solid rgb(234, 238, 251); 
        border-radius: 4px;
        overflow: auto;
    }
    .itz-form-header{
        height: 30px;
        line-height: 30px;
        border-bottom:1px solid rgb(234, 238, 251);
        margin-bottom: 19px; 
    }
    .itz-form-header h4{
        float: left;
        margin: 0;
    }
    .itz-form-header .back{
        float: right;
        margin-right: 20px;
        font-size: 18px;
        padding: 6px 0 0 0;
    }
    .itz-form .itz-form-button-group{
        width: 150px;
        margin: 10px auto;
    }
</style>
<template>
    <div class="itz-form">
        <el-dialog 
            :title="dialogTitle"
             v-if="!blank" 
             custom-class="form-dialog" 
             v-model="formDialogShow" 
             :size="dialogSize" 
             :close-on-click-modal="closeOnClickModal" 
             :top="top">
            <el-form
            :model="model"
            :rules="rules"
            :type="type"
            v-loading="loading"
            element-loading-text="加载中..."
            :labelPosition="labelPosition"
            :labelWidth="labelWidth"
            :labelSuffix="labelSuffix"
            :inline="inline"
            ref="elForm"
            >
            <slot></slot>
            </el-form>
            <span class="dialog-footer" slot="footer" v-if="mode=='insert' || mode=='edit'">
                <el-button @click.native.prevent="setDataRemote">保存</el-button>
            </span>
        </el-dialog>
        <div class="itz-form-wrapper" v-loading="loading" element-loading-text="加载中..." v-else>
            <div class="itz-form-header">
                <h4>{{this.dialogTitle}}</h4>
                <el-button type="text" class="el-icon-arrow-left back" @click.native.prevent="close">返回</el-button>
            </div>
            <el-form
            :model="model"
            :rules="rules"
            :type="type"
            :labelPosition="labelPosition"
            :labelWidth="labelWidth"
            :labelSuffix="labelSuffix"
            :inline="inline"
            ref="elForm"
            >
            <slot></slot>
            </el-form>
            <slot name="footer" v-if="mode=='insert' || mode=='edit'">
                <div class="itz-form-button-group">
                    <el-button type="primary" @click.native.prevent="setDataRemote">保存</el-button>
                    <el-button type="warning" @click.native.prevent="close">取消</el-button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script type="text/babel">

    import Elform from 'element-ui/lib/form';
    import Elbutton from 'element-ui/lib/button';
    import emitter from '../../../src/mixins/emitter';

    export default {
        name: 'itz-form',

        componentName:'itz-form',

        mixins: [emitter],

        props: {
            actionQuery: {
                type: String,
                default: ''
            },

            actionCreate: {
                type: String,
                default: ''
            },

            actionUpdate: {
                type: String,
                default: ''
            },
            callbackUrl : {
                type: String,
                default: ''
            },
            title: String,

            formType: String,

            model: Object,

            rules: Object,

            type: String,

            labelPosition: String,

            labelWidth: String,

            labelSuffix: {
                type: String,
                default: ''
            },
            blank:{
                type:Boolean,
                default:false
            },
            dialogSize: {
                type: String,
                default: 'tiny'
            },
            closeOnClickModal:{
                type:Boolean,
                default:true
            },
            top:{
                type:String,
                default:'15%'
            },
            currentMode:{
                type:String,
                default:'insert'
            },

            beforeSubmit:{
                type:Function,
                default:function() {
                    return true;
                }
            },
            afterSubmit:{
                type:Function,
                default:function() {
                    return true;
                }
            },
            autoClose:{
                type:Boolean,
                default: true
            },
            submitError:{
                type:Function,
                default:function() {
                    return true;
                }
            },

            inline: Boolean
        },

        components: {
            Elform,
            Elbutton
        },

        data() {
            return {
                formDialogShow: false,
                dialogTitle: '',
                params: '',
                mode: this.currentMode,
                hasSubmitted: false,
                defaultModel:{},
                loading:false
            }
        },
        beforeMount() {
            if (this.blank) {
                var query = this.$route.query;
                if (query.mode == 'edit') {
                    this.onEdit(query);
                }else if (query.mode == 'view') {
                    this.onView(query);
                }else {
                    this.onInsert();
                }
            }
        },

        mounted: function() {
            this.defaultModel = this.extend({},this.model,true);
            this.$on('onInsert', this.onInsert);
            this.$on('onEdit', this.onEdit);
            this.$on('onView', this.onView);
        },

        methods: {
            handleReset: function() {
                if (this.$refs.elForm && 'resetFields' in this.$refs.elForm) {
                   this.$refs.elForm.resetFields();
                }
                this.$emit('fillModel', this.defaultModel);
            },
            onInsert: function() {
                this.hasSubmitted = false;
                this.formDialogShow = true;
                this.handleReset();
                this.changeMode('insert');
                this.dialogTitle = "新增" + this.title;
                this.$nextTick(() => {
                    if (this.$el && 'querySelector' in this.$el && this.$el.querySelector('.el-tabs__header') && this.$el.querySelector('.el-tabs__header').style && this.$el.querySelector('.el-tabs__header').style.display != 'none') {
                        this.$el.querySelector('.el-tabs__header').style.display='none';
                    }
                });
            },
            onEdit: function(params) {
                if (!params || params.length == 0) {
                  this.$message.error('请选择行！');
                  return false;  
                }
                this.hasSubmitted = false;
                this.formDialogShow = true;
                this.changeMode('edit');
                this.handleReset();
                if (this.actionQuery) {
                    this.params = params;
                    this.getDataRemote();
                }else {
                    this.$emit('fillModel', this.extend({},params,true));
                }
                this.dialogTitle = "修改" + this.title;
                this.$nextTick(() => {
                    if (this.$el && 'querySelector' in this.$el && this.$el.querySelector('.el-tabs__header') && this.$el.querySelector('.el-tabs__header').style && this.$el.querySelector('.el-tabs__header').style.display != 'none') {
                        this.$el.querySelector('.el-tabs__header').style.display='none';
                    }
                });

            },
            onView: function(params) {
                if (!params || params.length == 0) {
                  this.$message.error('请选择行！');
                  return false;  
                }
                this.formDialogShow = true;
                this.changeMode('view');
                this.handleReset();
                if (this.actionQuery) {
                    this.params = params;
                    this.getDataRemote();
                }else {
                    this.$emit('fillModel', this.extend({},params,true));
                }
                this.dialogTitle = "查看" + this.title;
                this.$nextTick(() => {
                    if (this.$el && 'querySelector' in this.$el && this.$el.querySelector('.el-tabs__header') && this.$el.querySelector('.el-tabs__header').style && this.$el.querySelector('.el-tabs__header').style.display == 'none') {
                        this.$el.querySelector('.el-tabs__header').style.display='block';
                    }
                });
            },
            extend: function(o,n,override) {
                for (var p in n) {
                    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) {
                        o[p] = n[p];
                    }
                }
                return o;
            },
            getDataRemote: function() {
                var vm = this;
                if (this.mode == 'edit' || this.mode == 'view') {
                    if (this.actionQuery) {
                        this.loading = true;
                        this.$http.get(this.actionQuery, {params: this.params})
                        .then((res) => {
                            this.loading = false;
                            if (res.status !== 200 || res.body.code !== 0) {
                                this.$message.error((res.body.info || '服务器题了一个问题，正在寻找答案...'));
                            } else {
                                vm.$emit('fillModel', res.body.data.listInfo);
                            }
                        }, (res) => {
                            this.loading = false;
                            console.error(res);
                        });
                    }
                }
        
            },
            save:function(){
                this.setDataRemote();
            },
            setDataRemote: function() {
                this.$refs.elForm.validate((valid) => {
                    if (valid && !this.hasSubmitted && !this.loading) {
                        this.hasSubmitted = true;
                        var vm = this;
                        var url = '';
                        if (this.mode == 'insert') {
                            url = this.actionCreate; 
                        } else if (this.mode == "edit") {
                            url = this.actionUpdate;
                        }
                        if (url) {
                            this.beforeSubmit && this.beforeSubmit(this.model);
                            this.$http.post(url, this.model)
                            .then((res) => {
                                if (res.status !== 200 || res.body.code !== 0) {
                                    var msg = res.body.info||res.body.msg;
                                    this.$message({
                                        showClose: true,
                                        message: this.dialogTitle + '失败，' + msg,
                                        type: 'error'
                                    });
                                    this.hasSubmitted = false;
                                    this.submitError && this.submitError(res);
                                    vm.$emit('submitError', res);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: this.dialogTitle + '成功'
                                    });
                                    this.formDialogShow = false;
                                    vm.$emit('formSubmit', true);
                                    this.afterSubmit && this.afterSubmit(true);
                                    this.autoClose && this.close();
                                }
                            }, (res) => {
                                this.submitError && this.submitError(res);
                                vm.$emit('submitError', res);
                                this.hasSubmitted = false;
                                var msg = res.body.info||res.body.msg;
                                this.$message({
                                    showClose: true,
                                    message: this.dialogTitle + '失败，' + msg,
                                    type: 'error'
                                });
                                console.error(res)
                            });
                        }
                    } else {
                        this.hasSubmitted = false;
                        console.log('valid false');
                        return false;
                    }
                }); 
            },
            changeMode(mode) {
                this.mode = mode;
            },
            close(){
                if (this.blank) {
                    if (this.callbackUrl) {
                        this.$router.replace(this.callbackUrl);
                    }else{
                        this.$router.go(-1);
                    }
                }
            }
     
        },

        computed: {
            
        },

        watch: {

        }
    
    };
</script>
