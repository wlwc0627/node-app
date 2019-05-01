<template>
	<div class="fundlist">
		<div class="table_header">
			<el-form :inline="true" ref="add_data">
				<el-form-button class="btnRight">
					<el-button 
					  type="primary" 
					  size="small" 
					  icon="view" 
					  @click="handleAdd()">
						添加
					</el-button>
				</el-form-button>
			</el-form>
		</div>
		<div class="table_container">
			<el-table
	    	  v-if="tableData.length > 0"
	    	  :data="tableData"
	    	  style="width: 100%"
	    	  max-height="450"
			  border
	    	  >
	    	  	<el-table-column
				  label="序号"
				  type="index"
				  align="center"
				  width="50"
	    	  	>	
		    	</el-table-column>
		    	<el-table-column
				  prop="date"
				  label="创建时间"
				  width="230"
				  align="center"
		    	>	
		    	    <template slot-scope="scope">
					    <i class="el-icon-time"></i>
					    <span style="margin-left: 10px">{{ scope.row.date }}</span>
					</template>
		    	</el-table-column>
		    	<el-table-column
				  prop="type"
				  label="收支类型"
				  width="120"
				  align="center"
		    	>	
		    	</el-table-column>
		    	<el-table-column
				  prop="describe"
				  label="收支描述"
				  width="120"
				  align="center"
		    	>	
		    	</el-table-column>
		    	<el-table-column
				  prop="income"
			      label="收入"
				  width="100"
				  align="center"
		    	>	
		    	    <template slot-scope="scope">
		        		<span style="color:#00d053">{{ scope.row.income }}</span>
		     		</template>
		    	</el-table-column>
		    	<el-table-column
				  prop="expand"
				  label="支出"
				  width="100"
				  align="center"
		    	>	
		    	    <template slot-scope="scope">
		        		<span style="color:#f56767">{{ scope.row.expand }}</span>
		     		</template>
		    	</el-table-column>
		    	<el-table-column
				  prop="cash"
				  label="账户现金"
				  width="120"
				  align="center"
		        >	
		   	    	<template slot-scope="scope">
		       			<span style="color:#4db3ff">{{ scope.row.cash }}</span>
			   		</template>
	    	    </el-table-column>
	    	    <el-table-column
				  prop="remark"
				  label="备注"
				  width="140"
				  align="center"
	    	    >	
	    	    </el-table-column> 	
	    	    <el-table-column 
	    	      label="操作"
	    	      width="150"
	    	      align="center"
	    	      prop="operation"
	    	    >
	                <template slot-scope="scope">
	                  <el-button
	                  	type="primary"
	                    size="small"
	                    icon="edit"
	                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	                  <el-button
	                    size="small"
	                    type="danger"
	                    icon="delete"
	          		    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      			</template>
	    		</el-table-column>    
			</el-table>
		</div>
	</div>
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
				this.tableData = res.data;
			}).catch(err => console.log(err));
		},
		handleEdit (index,row) {
			console.log(123);
		},
		handleDelete(index, row){
			console.log(111);
		}
	}
}
</script>

<style scoped>
.fundlist{
	margin: 10px 10px auto 210px;
	border: 1px solid red;
	max-height: 500px;
	box-sizing: border-box;
	padding: 10px;
}

.btnRight{
	float: right;
}

.table_container{
	margin-top: 10px;
}
</style>