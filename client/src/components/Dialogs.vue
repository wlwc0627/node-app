<template>
	<div class="dialogs">
		<el-dialog
		  :title="dialogs.title" 
		  :visible.sync="dialogs.show"
		  :close-on-click-modal="true"
		  :close-on-press-escape="false"
		  :modal-append-to-body="false"
		  :center="true"
		>
			<div class="form">
				<el-form
				  ref="form"
				  :model="formData"
				  :rules="form_rules"
				  label-width="120px"
				  style="margin: 10px; width: auto;"
				>					
				    <el-form-item label="收支类型:">
					    <el-select v-model="formData.type" placeholder="请选择收支类型">
					        <el-option 
					          v-for="(formtype, index) in format_type_list" 
					          :key="index"
							  :label="formtype"
					          :value="formtype"
					        >
					        </el-option>
					    </el-select>
				    </el-form-item>
				    <el-form-item prop="income" label="收入:">
				    	<el-input type="income" v-model="formData.income"></el-input>
				    </el-form-item>
				    <el-form-item prop="expand" label="支出:">
				    	<el-input type="expand" v-model="formData.expand"></el-input>
				    </el-form-item>
				    <el-form-item prop="cash" label="现金:">
				    	<el-input type="cash" v-model="formData.cash"></el-input>
				    </el-form-item>
				    <el-form-item prop="describe" label="收支描述:">
				    	<el-input type="describe" v-model="formData.describe"></el-input>
				    </el-form-item>
				    <el-form-item prop="remark" label="备注:">
				    	<el-input type="textarea" v-model="formData.remark"></el-input>
				    </el-form-item>
				    <el-form-item>
				    	<el-button type="primary" @click="submitForm('form')">提交</el-button>
				    	<el-button @click="dialogs.show=false">取消</el-button>
				    </el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'Dialogs',
	data () {
		return {
			format_type_list: [
				"提现",
				"提现手续费",
				"充值",
				"优惠券",
				"充值礼券",
				"转账"
			],
			form_rules: {
				describe: [
					{
						required: true,
						message: '收支描述不能为空',
						trigger: 'blur'
					}
				],
				income: [
					{
						required: true,
						message: '收入不能为空',
						trigger: 'blur'
					}
				],
				expand: [
					{
						required: true,
						message: '支出不能为空',
						trigger: 'blur'
					}
				],
				cash: [
					{
						required: true,
						message: '账户现金不能为空',
						trigger: 'blur'
					}
				]
			}
		}
	},
	props: {
		dialogs: Object,
		formData: Object
	},
	methods: {
		submitForm (form) {
			this.$refs[form].validate(valid => {
				if(valid){
					const url = this.dialogs.options == 'add' ? 'add' : `edit/${this.formData.id}`
					this.$axios.post(`/api/profile/${url}`, this.formData)
						.then(res => {
							//添加成功
							this.$message({
								message: '添加资金信息成功！',
								type: 'success'
							});
							//隐藏对话框
							this.dialogs.show = false;
							this.$emit('update');
						});
				}
			})
		}
	}
}
</script>

<style scoped>
</style>