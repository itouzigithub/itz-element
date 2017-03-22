
<style type="text/css">
    .simditor{
        border: 1px solid #C0CCDA;
        border-radius: 4px;
    }
    .simditor .simditor-wrapper,.simditor .simditor-toolbar{
        border-radius: 4px;
    }
    .simditor .simditor-body {
        min-height: 150px;
        max-height: 500px;
        position: relative;
        overflow: auto;
    }
</style>

<template>
    <div v-bind:style="style">
        <textarea :id="editorName" v-model="currentValue"></textarea>
    </div>
</template>

<script type="text/babel">
    import Simditor from 'simditor';
    import emitter from '../../../src/mixins/emitter';

    export default{
        name : 'itz-editor',
        mixins: [emitter],
        props: {
            value:{
                type:[String,Number],
                default:''
            },
            width:{
                type:String,
                default:'100%'

            },
            height:String,
            toolbar:{
                type:Array,
                default:function(){
                    return ['title','|','bold', 'italic', 'underline', 'strikethrough','fontScale',
                        'color', '|', 'ol', 'ul', 'blockquote', 'code', '|','alignment','indent', 'outdent','|',
                        'table','link', 'image'
                    ]//自定义工具栏
                }
            },
            uploadUrl:{
                type:String,
                default:''
            },
            placeholder:{
                type:String,
                default:''
            },
            toolbarFloat:{
                type:Boolean,
                default:false
            },
            toolbarFloatOffset:{
                type:Number,
                default:0
            },
            toolbarHidden:{
                type:Boolean,
                default:false
            },
            uploadParams:{
                type:[String,Number],
                default:''
            },
            pasteImage:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                editorName: 'editor_' + Math.random().toString(10).substr(2),
                editor:'',
                currentValue: this.value,
                upload:{
                    url: this.uploadUrl,
                    params:this.uploadParams,
                    fileKey:'upload_file',
                    connectionCount: 3,
                    leaveConfirm: '上传正在进行中，确定要离开页面吗？'
                }
            }
        },
        computed:{
            style() {
                var ref = {};
                ref.width = this.width;
                if(this.height) ref.height = this.height;
                return ref;
            }
        },
        mounted: function() {
            this.$nextTick(_ => {
              this.createEditor();
            });
        },
        updated: function(){
            
        },
        methods: {
            createEditor() {
                var _this = this;
                this.editor = new Simditor({
                    textarea: '#' + _this.editorName,
                    placeholder:_this.placeholder,
                    toolbar:_this.toolbar,
                    toolbarFloat:_this.toolbarFloat,
                    toolbarFloatOffset:_this.toolbarFloatOffset,
                    toolbarHidden:_this.toolbarHidden,
                    pasteImage:_this.pasteImage,
                    upload:_this.upload
                });
                this.editor.on('valuechanged', function(e,src) {
                    e.preventDefault();
                    _this.currentValue = _this.editor.getValue();
                    _this.$emit('input', _this.currentValue);
                    _this.$emit('change', _this.currentValue);
                    _this.dispatch('ElFormItem', 'el.form.change', [_this.currentValue]);
                });
                this.editor.on('blur', function(event) {
                    _this.handleBlur(event);
                });
            },
            handleBlur(event) {
                this.$emit('blur', event);
                this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
            }
        },
        watch: {
            'value'(val, oldValue) {
                if (this.currentValue != val) {
                    setTimeout(()=>{
                        this.editor.setValue(val);
                    },0);
                }
            }
        }
    }

</script>