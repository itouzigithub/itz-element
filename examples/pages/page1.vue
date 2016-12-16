<template>
  <div>
    <itz-table
      query-url="http://localhost:8888/list"
      delete-url="http://localhost:8888/list/delete"
      primary-key="id"
      :delete-confirm="true"
      border
      max-height="auto"
      :search-object="searchObject"
      pager-position="center"
      @current-change="handleChange"
      ref="myTable">
      <el-form slot="options" :inline="true">
        <el-row type="flex" justify="space-between">
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="searchObject.name" placeholder="贷款项目名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchObject.type" placeholder="产品类型" clearable>
                <el-option
                  v-for="op in this.typeOptions"
                  :label="op.label"
                  :value="op.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" justify="end">
              <el-form-item>
                <el-button type="primary" @click.native.prevent="onSearch">查询</el-button>
                <el-button type="success" @click.native.prevent="openInsertDialog">新增</el-button>
                <el-button type="warning" @click.native.prevent="openEditDialog">修改</el-button>
                <el-button type="primary" @click.native.prevent="openViewDialog">查看</el-button>
                <el-button type="danger" @click.native.prevent="onDelete">删除</el-button>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        property="name"
        label="贷款项目名称">
      </el-table-column>
      <el-table-column
        property="type"
        label="产品类型">
      </el-table-column>
      <el-table-column
        property="borrowtype"
        label="借款模式">
      </el-table-column>
      <el-table-column
        property="enterprise"
        label="借款企业">
      </el-table-column>
      <el-table-column
        label="操作"
        inline-template
        width="200%">
        <div>
          <el-button type="warning" @click.native.prevent="openEditDialog(row,$index)">修改</el-button>
          <el-button type="primary" @click.native.prevent="openViewDialog(row,$index)">查看</el-button>
        </div>
      </el-table-column>
    </itz-table>
    <itz-form
        title="项目"
        :model="formItem"
        ref="myForm"
        :rules="rules"
        dialog-size="small"
        :close-on-click-modal="false"
        actionQuery="http://localhost:8888/find"
        actionCreate="http://localhost:8888/save"
        actionUpdate="http://localhost:8888/save">
            <itz-form-item display-mode="insert,edit" label="ID" label-width="120px" prop="id" style="display:none;">
               <el-input v-model="formItem.id" placeholder="序号" auto-complete="off" :disabled="true"></el-input>
            </itz-form-item>
            <itz-form-item display-mode="insert,edit,view"  :view-model="formItem.name" label="贷款项目名称：" label-width="120px" prop="name">
                <el-input v-model="formItem.name" placeholder="请输入贷款项目名称" auto-complete="off"></el-input>
            </itz-form-item>
            <itz-form-item display-mode="insert,edit,view"  :view-model="formItem.type" label="产品类型：" label-width="120px" prop="type">
                <el-select v-model="formItem.type" placeholder="请选择产品类型">
                    <el-option label="省心计划（小贷类）A套餐" value="省心计划（小贷类）A套餐"></el-option>
                    <el-option label="省心计划（典当类）C套餐" value="省心计划（典当类）C套餐"></el-option>
                    <el-option label="爱担保" value="爱担保"></el-option>
                </el-select>
            </itz-form-item>
            <itz-form-item display-mode="insert,edit,view" :view-model="formItem.text" label="借款企业：" label-width="120px"  prop="text">
                <el-input v-model="formItem.text" type="textarea" placeholder="请输入借款企业" auto-complete="off"></el-input>
            </itz-form-item>
            <itz-form-item display-mode="insert,edit,view" :view-model="formItem.text" label="借款企业：" label-width="120px"  prop="text">
                <itz-upload>
                  
                </itz-upload>
            </itz-form-item>
            <itz-form-item display-mode="insert,edit,view" :view-model="formItem.enterprise" label="借款企业：" label-width="120px"  prop="enterprise">
                <itz-editor v-model="formItem.enterprise" upload-url="http://newuser.itouzi.com/default/common/UploadFile?type=article&water_flag=0&simditor=1"></itz-editor>
            </itz-form-item>
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
          text:''
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
        this.$refs.myForm.$on('formSubmit', (newModel) => {
            this.$refs.myTable.$emit('onRefresh', true);
        })
    },
    methods: {
      onSearch() {
        console.debug('onSearch:emit');
        this.$refs.myTable.$emit('onSearch', true);
      },
      handleChange(row,oldRow) {

      },
      onDelete() {
        console.debug('onDelete:emit');
        this.$refs.myTable.$emit('onDelete');
      },
      openInsertDialog() {
        // this.$refs.myForm.$emit('onInsert', true);
        this.$router.push({path:'/forms/form1',query:{mode:'insert'}});
      },
      openEditDialog(row,$index) {
        var _row = $index != undefined ? row : this.$refs.myTable.rowSelected;
        // this.$refs.myForm.$emit('onEdit', _row);
        this.$router.push({path:'/forms/form1',query:{id:_row.id,mode:'edit'}});
      },
      openViewDialog(row,$index) {
        var _row = $index != undefined ? row : this.$refs.myTable.rowSelected;
        // this.$refs.myForm.$emit('onView', _row);
        this.$router.push({path:'/forms/form1',query:{id:_row.id,mode:'view'}});
      }
    }
  };
</script>
