<style type="text/css">
    .el-form-item__html p{
        margin: 0;
        padding: 0;
    }
    .el-form-item__img{
        padding: 11px 0;
    }
    .el-form-item.view{
        margin-bottom: 0px;
    }
</style>
<template>
    <div class="itz-form-item" v-if="isShow">
        <div v-if="mode=='view'">
            <div class="el-form-item view" :class="{
                'is-required': required
                }">
                <label class="el-form-item__label" v-bind:style="labelStyle" v-if="label">
                  {{label + form.labelSuffix}}
                </label>
                <div class="el-form-item__content" v-bind:style="contentStyle">
                    <div v-if="special=='custom'">
                      <slot></slot>
                    </div>
                    <div class="el-form-item__html" v-else-if="special == 'html'" v-html="afterFormatter"></div>
                    <div class="el-form-item__img" v-else-if="special == 'img'">
                        <img :src="afterFormatter" alt="">
                    </div>
                    <span v-else-if="special!='custom'">{{afterFormatter}}</span>
                </div>
            </div>
        </div>
        <div v-if="mode!='view'">
            <el-form-item
            :label="label"
            :labelWidth="labelWidth"
            :prop="prop"
            :required="required"
            :rules="rules"
            >
            <slot></slot>
            </el-form-item>
        </div>
    </div>

</template>

<script type="text/babel">

    import ElformItem from 'element-ui/lib/form-item';


    export default {
        name: 'itz-form-item',

        componentName:'itz-form-item',

        props: {

            label: String,

            labelWidth: String,

            prop: String,

            required: Boolean,

            rules: [Object, Array],

            displayMode: {
                type:String,
                default:'insert,edit,view'
            },

            currentMode: {
                type:String,
                default:'insert'
            },

            viewModel: [String,Number,Date],

            special: String,

            formatter: [Object,Function],

            formatterItem: String

        },

        components: {
            ElformItem
        },

        data() {
            return {
                mode : this.currentMode
            }
        },
        beforeMount(){
            
        },

        mounted() {

        },
        beforeUpdate: function() {
            this.calcSelectWidth();
        },
        methods: {
            calcSelectWidth: function(){

                let selectNode = null;
                if (this.$el && 'querySelector' in this.$el) {
                    selectNode = this.$el.querySelector('.el-select');
                }
                if (selectNode) {
                    let _width = selectNode.clientWidth;
                    Array.prototype.slice.call(selectNode.querySelectorAll('.el-select-dropdown')).map(($el) => {
                    $el.style.width = _width + 'px';
                })
                }
            }
     
        },

        computed: {
            isShow() {
                return (this.displayMode && this.displayMode.indexOf(this.mode) > -1) ? true : false;
            },
            form() {
                var parent = this.$parent;
                while (parent.$options.componentName !== 'ElForm') {
                    parent = parent.$parent;
                }
                return parent;
            },
            labelStyle() {
                var ret = {};
                var labelWidth = this.labelWidth || this.form.labelWidth;
                if (labelWidth) {
                    ret.width = labelWidth;
                }
                return ret;
            },
            contentStyle() {
                var ret = {};
                var labelWidth = this.labelWidth || this.form.labelWidth;
                if (labelWidth) {
                    ret.marginLeft = labelWidth;
                    ret.display = 'flex';
                }
                return ret;
            },
            afterFormatter() {
                let val = this.viewModel || this.form.model[this.prop];
                if (this.formatter && typeof this.formatter == 'function') {
                    val = this.formatter(val);
                }else if (this.formatter && this.formatterItem) {
                    if (this.formatterItem.indexOf('|') > -1) {
                        let array = this.formatterItem.split('|');
                        for (var i = 0; i < array.length; i++) {
                            val = this.formatter[array[i].replace(/\s+/g,"")](val);
                        }
                    } else {
                        val = this.formatter[this.formatterItem](val);
                    }
                }
                return val;
            },
            mode(){
                var parent = this.$parent;
                while (parent.$options.componentName !== 'itz-form') {
                    parent = parent.$parent;
                }
                return parent.mode || this.currentMode;
            }
        },

        watch: {

        }
    
    };
</script>
