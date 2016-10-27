<template>
    <div>
        <h1>itz-element</h1>
        <p>A vue project.</p>
        <itz-table
            action-query="http://localhost:8888/list"
            border
            :page-size="10"
            :page-sizes="[10, 20, 30, 50]"
            :current-page="1"
            pagerPosition="center"
            selectionMode="single"
            height="456"
            :searchField="['name', 'borrowtype']"
        >
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
    }
</script>
