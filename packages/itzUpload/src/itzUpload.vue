<template>
    <el-upload
      action=""
      type="select"
      :multiple="false"
      :thumbnail-mode="true"
      >
    </el-upload>
</template>

<script type="text/babel">

    import ElUpload from 'element-ui/lib/upload';

    function noop() {
    }
    export default {
        name: 'itz-upload',

        props: {
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
            multiple: Boolean,
            name: {
              type: String,
              default: 'file'
            },
            withCredentials: Boolean,
            thumbnailMode: Boolean,
            showUploadList: {
              type: Boolean,
              default: true
            },
            accept: String,
            type: {
              type: String,
              default: 'select'
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
            defaultFileList: {
              type: Array,
              default() {
                return [];
              }
            }
        },

        components: {
            ElUpload
        },

        data() {
            return {
                
            }
        },

        mounted: function() {
            
        },
        methods: {
            
     
        },

        computed: {
            
        },

        watch: {

        }
    
    };
</script>
