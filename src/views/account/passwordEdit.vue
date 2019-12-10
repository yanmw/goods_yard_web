<template>
	<div class="person">
		<p class="personTit">账户管理>修改登录密码</p>
		<div class="issue">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm fromItem" >
					 <el-form-item label="账 户 名 :" >
					   <span style="font-size: 16px;color: #333;">{{phoneAccount}}</span>
					 </el-form-item>
					 <el-form-item label="原登录密码 :" prop="password">
					   <el-input v-model="ruleForm.password" style="width: 300px;" maxlength="6" placeholder="请输入原登录密码"></el-input>
					 </el-form-item>
					 <el-form-item label="新登录密码 :" prop="newPassword">
					   <el-input v-model="ruleForm.newPassword" style="width: 300px;" maxlength="6" placeholder="请输入新登录密码"></el-input>
					 </el-form-item>
					 <el-form-item label="确 认 密 码 :" prop="quePassword">
					   <el-input v-model="ruleForm.quePassword" style="width: 300px;" maxlength="6" placeholder="请输入确认密码"></el-input>
					 </el-form-item>
			    </el-form>
				<p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancel">取消</span><span style="margin-left: 100px;padding:5px 40px;" @click="inputSure('ruleForm')">确认</span></p>
		</div>
	</div>
</template>

<script>
	import { modifyPwd } from '@/api/index'
	export default{
		data(){
			return{
				ruleForm: {
					type:'',
					id:'',
				    password: '',
				    newPassword:'',
					quePassword:''
				 },
				 phoneAccount:'',
				 rules: {
				    newPassword: [{ required: true, message: '请输入新登录密码', trigger: 'blur' }],
				    password: [{ required: true, message: '请输入原登录密码', trigger: 'blur' }],
				    quePassword: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
				 },
				 
			}
		},
		created() {
			this.ruleForm.type = sessionStorage.getItem("zlmenu");
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.ruleForm.id = info.id
			this.phoneAccount = info.phone
		},
		methods:{
			cancel(){
				this.ruleForm.password = ''
				this.ruleForm.newPassword = ''
				this.ruleForm.quePassword = ''
			},
			inputSure(formName){
				this.$refs[formName].validate((valid) => {
				    if (valid) {
						if(isNaN(Number(this.ruleForm.password))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
						    this.$message.error('原登录密码需全为数字格式')
							return
						}
						if(isNaN(Number(this.ruleForm.newPassword))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
						    this.$message.error('新登录密码需全为数字格式')
							return
						}
						if(isNaN(Number(this.ruleForm.quePassword))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
						    this.$message.error('确认密码需全为数字格式')
							return
						}
						if(this.ruleForm.newPassword != this.ruleForm.quePassword){
							this.$message.error('请确认两次密码一致');
							return false;
						}
				        modifyPwd(this.ruleForm).then((res) => {
				        	if (res.code == 200) {
				        	    // console.log(res)
								sessionStorage.removeItem('zlInfo');
								sessionStorage.removeItem('zlmenu');
				        		this.$message.success(res.msg+',返回登录');
								this.$router.push("/login")
								
				        	} else {
				        	    this.$message.error(res.msg);
				        	}
				        }).catch(() => {
				        	 this.loading = false
				        })
				    } else {
				        // console.log('error submit!!');
				        return false;
				    }
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.personTit{
		padding-top: 10px !important;
	}
	.authTit{
		margin-bottom: 40px;
		i{
			display: inline-block;
			width: 3px;
			height: 13px;
			background-color: #256ff8;
			vertical-align: bottom;
			margin-right: 8px;
			position: relative;
			top:-2px;
		}
	}
	.btn-ba{
		margin-left: 0!important;
		margin-right: 10px;
	}
	.issue{
		width: 98.5%;
		min-width: 1000px;
		background-color: #ffffff;
		background-image: linear-gradient(#ffffff, #ffffff), linear-gradient(#ffffff, #ffffff);
		background-blend-mode: normal, normal;
		box-shadow: 0px 2px 8px 0px rgba(54, 196, 209, 0.14);
		border-radius: 10px;
		padding: 20px;
		height: 740px;
	}
	.fromItem{
		margin: 0 auto;
		width: 430px;
		margin-top: 100px;
		.el-form-item{
			margin-bottom: 40px;
		}
	}
	.submit{
		text-align: center;
		margin-top: 40px;
		margin-bottom:60px;
		span{
			background: linear-gradient(-30deg, #2589ff 0%, #24d3ff 100%);
			background-blend-mode: normal, normal;
			border-radius: 20px;
			padding: 9px 70px;
			font-size: 16px;
			color: #fff;
			cursor: pointer;
		}
	}
</style>
