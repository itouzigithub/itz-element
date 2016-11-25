<template>
    <div class="itz-form">
        <el-dialog :title="dialogTitle" custom-class="form-dialog" v-model="formDialogShow" :size="dialogSize">
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
            <span class="dialog-footer" slot="footer" v-if="mode=='create' || mode=='update'">
                <el-button @click.native.prevent="setDataRemote">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/babel">

    import Elform from 'element-ui/lib/form';
    import Elbutton from 'element-ui/lib/button';

    export default {
        name: 'itz-form',

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
            dialogSize: {
                type: String,
                default: 'tiny'
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
                mode: '',
                hasSubmitted: false,
                defaultModel:{}
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
                this.mode = "create";
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
                this.mode = "update";
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
                this.mode = "view";
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
                if (this.mode == 'update' || this.mode == 'view') {
                    if (this.actionQuery) {
                        this.$http.get(this.actionQuery, {params: this.params})
                        .then((res) => {
                            if (res.status !== 200 || res.body.code !== 0) {
                                this.$message.error((res.body.info || '服务器题了一个问题，正在寻找答案...'));
                            } else {
                                console.debug('onEditInfoUpdate:emit', this, vm)
                                vm.$emit('fillModel', res.body.data.listInfo);
                            }
                        }, (res) => {
                            console.error(res)
                        });
                    }
                }
        
            },
      
            setDataRemote: function() {
                this.$refs.elForm.validate((valid) => {
                    if (valid && !this.hasSubmitted) {
                        this.hasSubmitted = true;
                        var vm = this;
                        var url = '';
                        if (this.mode == 'create') {
                            url = this.actionCreate; 
                        } else if (this.mode == "update") {
                            url = this.actionUpdate;
                        }
                        if (url) {
                            this.$http.post(url, this.model, {emulateJSON: true})
                            .then((res) => {
                                if (res.status !== 200 || res.body.code !== 0) {
                                    this.$message({
                                        showClose: true,
                                        message: this.dialogTitle + '失败，' + res.body.info,
                                        type: 'error'
                                    });
                                    this.hasSubmitted = false;   
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: this.dialogTitle + '成功'
                                    });
                                    this.formDialogShow = false;
                                    vm.$emit('formSubmit', true);
                                }
                            }, (res) => {
                                console.error(res)
                            });
                        }
                    } else {
                        console.log('valid false');
                        return false;
                    }
                }); 
            }
     
        },

        computed: {
            
        },

        watch: {

        }
    
    };
</script>
