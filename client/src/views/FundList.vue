<template>
	<div class="fundlist">
		<div class="table_header">
			<el-form :inline="true" ref="add_data" :model="search_data">
				<el-form-item label="按照时间筛选:">
					<el-date-picker
				      v-model="search_data.startTime"
				      type="datetime"
				      placeholder="选择起始时间"
				  	>
				    </el-date-picker>
				     - 
				    <el-date-picker
				      v-model="search_data.endTime"
				      type="datetime"
				      placeholder="选择结束时间"
				  	>
				    </el-date-picker>
				    <el-button 
					  type="primary" 
					  size="small" 
					  icon="search"
					  class='search' 
					  @click="handleSearch()">
						搜索
					</el-button>
				</el-form-item>		
				<el-button 
				  type="primary" 
				  size="small" 
				  icon="view" 
				  class="btnRight"
				  v-if="user.identity == 'manager'"
				  @click="handleAdd()">
					添加
				</el-button>
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
				  width="110"
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
	                    @click="handleEdit(scope.$index, scope.row)"
	                    v-if="user.identity == 'manager'">
	                	编辑
	                  </el-button>
	                  <el-button
	                    size="small"
	                    type="danger"
	                    icon="delete"
	                    v-if="user.identity == 'manager'"
	          		    @click="handleDelete(scope.$index, scope.row)">
	          			删除
	          		  </el-button>
	      			</template>
	    		</el-table-column>    
			</el-table>
			<el-row>
				<el-col :span='24'>
					<div class="pagination">
					    <el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="paginations.page_index"
					      :page-sizes="paginations.page_sizes"
					      :page-size="paginations.page_size"
					      :layout="paginations.layout"
					      :total="paginations.total">
					    </el-pagination>						
					</div>
				</el-col>
			</el-row>
		</div>
		<Dialogs :formData="formData" :dialogs="dialogs" @update='getProfile()'></Dialogs>
	</div>
</template>

<script>
import Dialogs from '../components/Dialogs';
export default {
	name: "FundList",
	data () {
		return {
			search_data: {
				startTime: '',
				endTime: ''
			},
			filterTableData: [],
			paginations: {
				page_index: 1,									//当前位于那一页
				total: 0,										//总数
				page_size: 5,									//一页显示多少条
				page_sizes: [5,10,15,20],						//每页显示多少条
				layout: 'total,sizes,prev,pager,next,jumper'	//翻页属性
			},
			tableData: [],
			allTableData: [],
			dialogs: {
				show: false,
				title: '',
				options: 'edit'
			},
			formData: {
				type: '',
				describe: '',
				income: '',
				expand: '',
				cash: '',
				remark: '',
				id: ''
			}
		}
	},
	computed: {
		user () {
			return this.$store.getters.user;
		}
	},
	components: {
		Dialogs
	},
	created () {
		this.getProfile();
	},
	methods: {
		getProfile () {
			//通过接口获取数据
			this.$axios.get("/api/profile").then(res => {
				this.allTableData = res.data;
				this.filterTableData = res.data;
				//设置分页数据
				this.setPaginations();

			}).catch(err => console.log(err));
		},
		setPaginations () {
			// 分页属性设置
			this.paginations.total      = this.allTableData.length;
			this.paginations.page_index = 1;
			this.paginations.page_size  = 5;

			//设置默认的分页数据
			this.tableData  = this.allTableData.filter((item, index) => {
				return index < this.paginations.page_size;
			})
		},
		handleAdd () {
			this.dialogs = {
				title: '添加资金信息',
				options: 'add',
				show: 'true'
			};

			this.formData = {
				type: '',
				describe: '',
				income: '',
				expand: '',
				cash: '',
				remark: '',
				id: ''
			}
		},
		handleEdit (index,row) {
			this.dialogs = {
				title: '修改资金信息',
				options: 'edit',
				show: 'true'
			};

			this.formData = {
				type: row.type,
				describe: row.describe,
				income: row.income,
				expand: row.expand,
				cash: row.cash,
				remark: row.remark,
				id: row._id
			}
		},
		handleDelete(index, row){
			this.$axios.delete(`/api/profile/delete/${row._id}`)
				.then(res => {
					this.$message({
						message: '删除信息成功',
						type: 'success'
					});
					this.getProfile();
				})
		},
		handleSizeChange (page_size) {
			this.paginations.page_index = 1;
			this.paginations.page_size  = page_size;
			this.tableData = this.allTableData.filter((item, index) => {
				return index < page_size;
			})
		},
		handleCurrentChange (page) {
			//获取当前页
			let index = this.paginations.page_size * (page - 1);
			//获取数据的总数
			let nums  = this.paginations.page_size * page;
			//容器
			let tables = [];

			for(let i=index; i< nums; i++){
				if(this.allTableData[i]){
					tables.push(this.allTableData[i]);
				}
				this.tableData = tables;
			}
		},
		handleSearch () {
			if(!this.search_data.startTime || !this.search_data.endTime){
				this.$message({
					type: 'warning',
					message: '请选择正确的时间段'
				});
				this.getProfile();
				return ;
			}

			const sTime = this.search_data.startTime.getTime();
			const eTime = this.search_data.endTime.getTime();

			this.allTableData = this.filterTableData.filter(item => {
				let date = new Date(item.date);
				let time = date.getTime();
				return time >= sTime && time <= eTime;
			})

			this.setPaginations();
		}
	}
}
</script>

<style scoped>
.fundlist{
	margin: 10px 10px auto 210px;
	max-height: 500px;
	box-sizing: border-box;
	padding: 10px;
}
.table_header{
	width: 100%;
	height: 40px;
	padding-right: 10px;
	padding-top: 5px;
}

.btnRight{
	float: right;
}

.table_container{
	margin-top: 10px;
}

.el-pagination{
	text-align: center;
	margin-top: 10px;
}

.search{
	margin-left: 10px;
}
</style>