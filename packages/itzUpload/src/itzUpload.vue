<style type="text/css">
  .hideCover .el-dragger__cover__interact{
    display: none!important;
  }
  .itz-upload__img{
    width: 100%;
    margin-top: 11px;
  }
</style>
<template>
    <div>
      <img class="itz-upload__img" v-if="itzThumbnailMode && currentValue" :src="domain+currentValue">
      <el-upload
        v-if="mode != 'view'"
        :action="action"
        :type="type"
        :headers="headers"
        :data="data"
        :name="name"
        :multiple="multiple"
        :thumbnail-mode="thumbnail"
        :withCredentials="withCredentials"
        :showFileList="showList"
        :accept="accept"
        :drag="drag"
        :on-preview="previewHander"
        :beforeUpload="beforeUpload"
        :on-remove="removeHander"
        :on-change="onChange"
        :on-success="successHander"
        :on-error="errorHander"
        :on-progres="onProgres"
        :list-type="listType"
        :file-list="fileList"
        :auto-upload="autoUpload"
        ref="elupload"
        :http-request="httpRequest"
        :class="{hideCover:mode=='view'}"
        >
        <slot></slot>
        <slot name="tip"></slot>
      </el-upload>
      <input type="hidden" v-model="currentValue">
    </div>
</template>

<script type="text/babel">

    import ElUpload from 'element-ui/lib/upload';
    import emitter from '../../../src/mixins/emitter';

    function noop() {
    }
    export default {
        name: 'itz-upload',

        componentName:'itz-upload',

        mixins: [emitter],

        props: {
            value:{
              type:String,
              default:''
            },
            domain:{
              type: String,
              default() {
                return 'https://itzstatic.b0.upaiyun.com'
              }
            },
            action: {
              type: String,
              required: true
            },
            headers: {
              type: Object,
              default() {
                return {};
              }
            },
            data: Object,
            multiple: {
              type: Boolean,
              default: false
            },
            name: {
              type: String,
              default: 'file'
            },
            drag:{
              type: Boolean,
              default: false
            },
            withCredentials: Boolean,
            thumbnailMode: Boolean,
            itzThumbnailMode: Boolean,
            showFileList: {
              type: Boolean,
              default: true
            },
            accept: String,
            type: {
              type: String,
              default: 'select'
            },
            listType:{
               type: String,
              default: 'text'
            },
            beforeUpload: Function,
            onRemove: {
              type: Function,
              default: noop
            },
            onChange: {
              type: Function,
              default: noop
            },
            onPreview: {
              type: Function,
              default: noop
            },
            onSuccess: {
              type: Function,
              default: noop
            },
            onError: {
              type: Function,
              default: noop
            },
            onProgres:{
              type: Function,
              default: noop
            },
            autoUpload:{
              type:Boolean,
              default:true
            },
            httpRequest: Function
        },

        components: {
            ElUpload
        },

        data() {
            return {
                fileList:[],
                currentValue:this.value,
                mode:'insert'
            }
        },

        mounted: function() {
            
        },
        methods: {
            previewHander(file){
              this.onPreview(file);
            },
            removeHander(file,fileList){
              let values = this.currentValue.split(',').filter((item) => {
                return item != file.name; 
              });
              this.currentValue = values.join(',');

              this.onRemove(file,fileList);
            },
            successHander(response, file, fileList){
              if (response.code !== 0 ) {
                this.$refs.elupload.clearFiles();
                this.$message.error(response.info||'上传失败');
              } else {
                if (this.currentValue == '' || !this.multiple || this.itzThumbnailMode) {
                  this.currentValue = response.data.file_src;
                }else {
                  let values = this.currentValue.split(',');
                  values.push(response.data.file_src);
                  this.currentValue = values.join(',');
                }
                this.onSuccess(response, file, fileList);
              }
            },
            errorHander(err, response, file){
                this.onError(err, response, file);
            },
            clearFiles(){
              this.$refs.elupload.clearFiles();
            }
     
        },

        computed: {
            fileList(){
              let values = [];
              if(this.currentValue && this.currentValue != ''){
                values = this.currentValue.split(',').map(value => {
                  let item = {};
                  item.name = value;
                  item.url= this.domain+value;
                  return item;
                });
              }
              return values;
            },
            thumbnail(){
              return this.itzThumbnailMode ? false : this.thumbnailMode;
            },
            showList(){
              return this.itzThumbnailMode ? false : this.showFileList
            },
            mode(){
                var parent = this.$parent;
                while (parent.$options.componentName !== 'itz-form') {
                    parent = parent.$parent;
                }
                return parent.mode;
            }
        },

        watch: {
            'value'(val, oldValue) {
                this.currentValue = val;
            },
            'currentValue'(val) {
                this.$emit('input', val);
                this.$emit('change', val);
                this.dispatch('ElFormItem', 'el.form.change', [val]);
            }
        }
    
    };
</script>
