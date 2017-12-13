<style scoped>
    .el-input,.el-select{
      width: 360px;
    }
    .add-options{

    }
    .add-options .serial{
        height: 36px;
        text-align: center;
        line-height: 36px;
    }
    /*.option-card{
      width: 360px;
    }*/
    .line,.unit{
      text-align: center;
      height: 36px;
      line-height: 36px;
      float: left;
      margin: 0px 10px;
    }
    .inline .itz-form-item{
      float: left;
    }
    .inline .itz-form-item+.itz-form-item{
      margin-left: 10px;
    }
    .unit{
      margin-left: 10px;
      float: left;
    }
</style>
<style type="text/css">
    .options-select .el-input__inner{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
</style>
<template>
    <div>
        <itz-form
                title="问题"
                :model="formItem"
                ref="typeForm"
                :rules="rules"
                :blank="true"
                label-width="160px"
                actionQuery="/"
                actionCreate="/survey/index/AddQuestion"
                actionUpdate="/survey/index/EditQuestion">
                <el-collapse :value="['add','addOptions']">
                <el-collapse-item title="问题内容" name="add">
                    <el-row>
                        <el-col :span="12">
                            <itz-form-item label="题目" prop="question">
                                <el-input v-model="formItem.question" placeholder="请输入题目"></el-input>
                            </itz-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <itz-form-item label="问题类型" prop="type">
                                <el-select v-model="formItem.type" placeholder="请选择问题类型" clearable>
                                    <el-option
                                        label="单选题"
                                        :value="0">
                                    </el-option>
                                    <el-option
                                        label="多选题"
                                        :value="2">
                                    </el-option>
                                    <el-option
                                        label="填空题"
                                        :value="1">
                                    </el-option>
                                    <el-option
                                        label="混合题"
                                        :value="3">
                                    </el-option>
                                </el-select>
                            </itz-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <itz-form-item  label="问题性质" prop="title_tag_id">
                                <el-select v-model="formItem.title_tag_id" placeholder="请选择问题性质" clearable>
                                    <el-option
                                        v-for="(item,index) in titleTag"
                                        :key="'form_title_tag_id_'+item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </itz-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <itz-form-item label="排序值" prop="sort">
                                <el-input v-model="formItem.sort" placeholder="请输入排序值"></el-input>
                            </itz-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item class="add-options" v-if="formItem.type!=1" title="问题选项" name="addOptions">
                    <itz-form-item label="选项" prop="option">
                        <el-button type="primary" icon="plus" size="small" @click="addOption"></el-button>
                    </itz-form-item>
                    <el-row style="margin-left:100px;margin-bottom:20px;" v-for="(item,index) in formItem.option" :key="'form_option_'+index" :gutter="10">
                        <el-col :span="1">
                            <div class="serial">{{item.option_serial}}.</div>
                        </el-col>
                        <el-col :span="3">
                            <el-select style="width:100%;" v-model="item.option_type" placeholder="选项类型">
                                <el-option
                                    label="单选题"
                                    :value="1">
                                </el-option>
                                <el-option
                                    label="填空题"
                                    :value="2">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-input style="width:100%;" v-model="item.option_content" placeholder="">
                                <template slot="prepend">内容</template>
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-input style="width:100%;" v-model="item.option_point" placeholder="">
                                <template slot="prepend">分数</template>
                            </el-input>
                        </el-col>
                        <el-col :span="9">
                            <div class="el-input-group">
                                <div class="el-input-group__prepend">标签</div>
                                <el-select
                                    v-model="item.tags"
                                    multiple
                                    filterable
                                    allow-create
                                    style="width:100%;"
                                    class="options-select"
                                    placeholder="标签">
                                    <el-option
                                        v-for="(item,index) in optionTags"
                                        :key="'form_option_tag_id_'+index"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </itz-form>
    </div>
</template>

<script>
    export default {
        components:{
        },
        data() {
            
            return {

                formItem:{
                    title_tag_id:'',
                    question:'',
                    type:0,
                    sort:'',
                    option:[{
                        option_type:1,
                        option_serial:'A',
                        option_content:'没有',
                        option_point:30,
                        tags:[{
                            id:'1',
                            name:'爱花钱'
                        },{
                            id:'2',
                            name:'有钱人'
                        }]
                    }]
                },

                titleTag:[],
                optionTags:[{
                    id:'1',
                    name:'爱花钱'
                },{
                    id:'2',
                    name:'有钱人'
                },{
                    id:'3',
                    name:'有钱人1'
                },{
                    id:'4',
                    name:'有钱人2'
                }],
                
                mode:this.$route.query.mode,
                
                rules:{
                    
                },
            };
        },
        mounted() {
            this.getTitleTag();
        },
        methods: {
            getTitleTag(){
                this.$http.get('/survey/index/GetQuestionTag')
                .then((res) => {
                    if (res.body.code !== 0) {
                        this.$message.error(res.body.data.info || '获取来源数据失败');
                    }else {
                        for(var key in res.body.data.info){
                            this.titleTag.push({value:key,label:res.body.data.info[key]});
                        }
                    }
                },(res) => {
                    this.$message.error('获取来源数据失败');
                });
            },
            addOption(){
                // this.formItem.option.push({
                //     option_type:1,
                //     option_serial:'A',
                //     option_content:'没有',
                //     option_point:30,
                //     tag_id:[{
                //         id:'',
                //         name:'爱花钱'
                //     },{
                //         id:'',
                //         name:'有钱人'
                //     }]
                // });
            }
        },
        watch: {
            
        }
    };
</script>