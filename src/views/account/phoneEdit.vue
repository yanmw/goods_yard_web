<template>
	<div class="person">
		<p class="personTit">账户管理>修改手机号</p>
		<div class="issue">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm fromItem" >
					 <el-form-item label="原手机号码 :" >
					   <span style="font-size: 16px;color: #333;">{{phoneAccount}}</span>
					 </el-form-item>
					 <el-form-item label="新手机号码 :" prop="phone">
					   <el-input v-model="ruleForm.phone" style="width: 300px;" placeholder="请输入新手机号码" maxlength="11"></el-input>
					 </el-form-item>
					 <el-form-item label="登 录 密 码 :" prop="password">
					   <el-input v-model="ruleForm.password" style="width: 300px;" placeholder="请输入登录密码" maxlength="6"></el-input>
					 </el-form-item>
			    </el-form>
				<p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;"  @click="cancel">取消</span><span style="margin-left: 100px;padding:5px 40px;" @click="inputSure('ruleForm')">确认</span></p>
		</div>
	</div>
</template>

<script>
	import { modifyPhone } from '@/api/index'
	export default{
		data(){
			return{
				ruleForm: {
					type:'',
					id:'',
				    phone: '',
				    password:''
				 },
				 phoneAccount:'',
				 rules: {
				    phone: [{ required: true, message: '请输入新手机号码', trigger: 'blur' },],
				    password: [{ required: true, message: '请输入登录密码', trigger: 'blur' },],
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
				this.ruleForm.phone = ''
				this.ruleForm.password = ''
			},
			inputSure(formName){
				this.$refs[formName].validate((valid) => {
				    if (valid) {
						if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm.phone))){
						     this.$message.error("请输入正确的手机号")      
							 return
						  }
						if(isNaN(Number(this.ruleForm.password))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
						    this.$message.error('密码需全为数字格式')
							return
						}
				        modifyPhone(this.ruleForm).then((res) => {
				        	if (res.code == 200) {
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
			margin-bottom: 60px;
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
