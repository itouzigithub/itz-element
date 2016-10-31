<template>
  <div>
    <h1>itz-element</h1>
    <p>A vue project.</p>
    <itz-table
      query-url="http://localhost:8888/list"
      delete-url="http://localhost:8888/list/delete"
      border
      :current-page="1"
      pagerPosition="start"
      selectionMode="multiple"
      :searchObject="searchObject"
      ref="myTable">
      <div slot="searchs">
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
      </div>
      <div slot="buttons">
        <el-form-item>
          <el-button type="primary" @click.native.prevent="onSearch">查询</el-button>
          <el-button type="success" @click.native.prevent="openInsertDialog">新增</el-button>
          <el-button type="warning" @click.native.prevent="openEditDialog">修改</el-button>
          <el-button type="primary" @click.native.prevent="openViewDialog">查看</el-button>
          <el-button type="danger" @click.native.prevent="onDelete">删除</el-button>
        </el-form-item>
        </div>
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
    </itz-table>
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
        ]
      };
    },
    methods: {
      onSearch() {
        console.debug('onSearch:emit');
        this.$refs.myTable.$emit('onSearch', true);
      },
      onDelete() {
        console.debug('onDelete:emit');
        this.$refs.myTable.$emit('onDelete', true);
      },
      openInsertDialog() {
        console.debug('openInsertDialog:clicked');
      },
      openEditDialog() {
        console.debug('openEditDialog:clicked');
      },
      openViewDialog() {
        console.debug('openViewDialog:clicked');
      }
    }
  };
</script>
