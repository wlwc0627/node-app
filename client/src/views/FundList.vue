<template>
	<el-table
    :data="tableData"
    style="width: 100%">
        <el-table-column
          label="日期"
          width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>米斯特吴</p>
                    <p>住址: 北京</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">xxxx</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
	name: "FundList",
	data () {
		return {
			tableData: []
		}
	},
	created () {
		this.getProfile();
	},
	methods: {
		getProfile () {
			//通过接口获取数据
			this.$axios.get("/api/profile").then(res => {
				console.log(res);
			}).catch(err => console.log(err));
		}
	}
}
</script>