<style type="text/css">
  /*.el-input,.el-select{
      width: 360px;
  }*/
  .itz-form .el-form{
    background-color: #f9fafc;
    box-sizing: border-box;
    border: 1px solid #e0e6ed;
    padding: 10px 15px;
  }
</style>
<template>
  <div>
    <itz-form
        title="项目"
        :model="formItem"
        ref="myForm"
        :rules="rules"
        dialog-size="large"
        :close-on-click-modal="false"
        top="10px"
        :blank="true"
        :afterSubmit="afterSubmit"
        :autoClose="false"
        callbackUrl="/page2"
        actionQuery="http://localhost:8888/find"
        actionCreate="http://localhost:8888/save"
        actionUpdate="http://localhost:8888/save">
            <itz-form-item display-mode="insert,edit" label="ID" label-width="120px" prop="id" style="display:none;">
               <el-input v-model="formItem.id" placeholder="序号" auto-complete="off" :disabled="true"></el-input>
            </itz-form-item>
            <itz-form-item display-mode="insert,edit,view" label="贷款项目名称：" label-width="120px" prop="name">
                <el-input v-model="formItem.name" placeholder="请输入贷款项目名称" auto-complete="off"></el-input>
            </itz-form-item>
            <itz-form-item display-mode="insert,edit,view" label="产品类型：" label-width="120px" prop="type">
                <el-select v-model="formItem.type" placeholder="请选择产品类型">
                    <el-option label="省心计划（小贷类）A套餐" value="省心计划（小贷类）A套餐"></el-option>
                    <el-option label="省心计划（典当类）C套餐" value="省心计划（典当类）C套餐"></el-option>
                    <el-option label="爱担保" value="爱担保"></el-option>
                </el-select>
            </itz-form-item>
            <itz-form-item display-mode="insert,edit,view" :view-model="formItem.text" label="借款企业：" label-width="120px"  prop="text">
                <el-input v-model="formItem.text" type="textarea" placeholder="请输入借款企业" auto-complete="off"></el-input>
            </itz-form-item>
            <itz-form-item label="借款时间：" label-width="120px"  prop="time">
                <el-date-picker
                  v-model="formItem.time"
                  type="date"
                  format="yyyy/MM/dd"
                  placeholder="请选择时间">
                </el-date-picker>
                <el-input v-model="formItem.time" type="textarea" placeholder="请输入借款时间" auto-complete="off"></el-input>
            </itz-form-item>
            <!-- <itz-form-item display-mode="insert,edit,view" :view-model="formItem.text" label="借款企业：" label-width="120px"  prop="text" special='custom'>
                <itz-upload
                  action="http://newuser.itouzi.com/default/common/UploadFile?type=article&water_flag=0"
                  :multiple="false"
                  v-model="formItem.text"
                  >
                  <el-button size="small" type="primary">点击上传</el-button>
                </itz-upload>
            </itz-form-item> -->
            <itz-form-item label="借款企业：" label-width="120px"  prop="enterprise" special="html">
                <itz-editor v-model="formItem.enterprise" upload-url="http://newuser.itouzi.com/default/common/UploadFile?type=article&water_flag=0&simditor=1"></itz-editor>
            </itz-form-item>
            <div class="itz-form-button-group" slot="footer">
                    <el-button type="primary" @click.native.prevent="formSave">保存</el-button>
                </div>
        </itz-form>
        
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchObject: {
          name: '',
          type: ''
        },
        formItem:{
          id:-1,
          name: '',
          type:'',
          enterprise:'',
          text:'',
          time:''
        },
        currentmode: '',
        typeOptions: [
          {
            label: '担保',
            value: '担保'
          },
          {
            label: '收藏',
            value: '收藏'
          },
          {
            label: '融租',
            value: '融租'
          },
          {
            label: '保理',
            value: '保理'
          },
          {
            label: '省心',
            value: '省心'
          }
        ],
        rules:{
          enterprise:[
            {required:true,message:'请输入借款企业',trigger: 'blur'}
          ],
          text:[
            {required:true,message:'请输入借款企业',trigger: 'blur'}
          ]
        }
      };
    },
    mounted() {
        this.$refs.myForm.$on('fillModel', (newModel) => {
            this.formItem = newModel;
        })
    },
    methods: {
        resetForm(){
          this.$refs.myForm.handleReset();
        },
        afterSubmit(){
          this.$refs.myForm.close();
          return false;

        },
        formSave(){
          this.$refs.myForm.save();
        }
    }
  };
</script>
