<template>
	<div class="person">
		<p class="personTit">账户管理>认证信息</p>
		<div class="issue">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm fromItem" style="width: 100%;">
				 <div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>个人认证</div>
				  <div style="margin-bottom: 20px;"> 
					 <el-form-item label="账 号 :"  >
						 <span style="font-size: 16px;color: #333;"> {{phone}}</span>
					 </el-form-item>
					 <el-form-item label="姓 名 :" prop="name">
					   <el-input v-model="ruleForm.name" style="width: 300px;"  placeholder="请输入姓名" maxlength="12"></el-input>
					 </el-form-item>
					 <el-form-item label="身份证号 :" prop="idCard">
					   <el-input v-model="ruleForm.idCard" style="width: 300px;"  placeholder="请输入身份证号" maxlength="18"></el-input>
					 </el-form-item>
					 <el-form-item label="身份证正面 :" prop="frontPath">
					   <el-upload
					     class="avatar-uploader"
					     action="http://192.168.1.128:8080/ymw/account/picUpload?pic="
					     :show-file-list="false"
					     :on-success="handleAvatarSuccess"
					     :before-upload="beforeAvatarUpload">
						    <img v-if="ruleForm.frontPath" :src="ruleForm.frontPath" class="avatar">
						    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					    </el-upload>
					 </el-form-item>
					 <el-form-item label="身份证反面 :" prop="backPath">
					   <el-upload
					     class="avatar-uploader"
					     action="http://192.168.1.128:8080/ymw/account/picUpload?pic="
					     :show-file-list="false"
					     :on-success="handleAvatarSuccess1"
					     :before-upload="beforeAvatarUpload">
						    <img v-if="ruleForm.backPath" :src="ruleForm.backPath" class="avatar">
						    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					    </el-upload>
					 </el-form-item>
				 </div>
				 <div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>企业认证</div>
				 <div>
					<el-form-item label="企业账户 :" prop="company">
					   <el-input v-model="ruleForm.company" style="width: 300px;" placeholder="请输入企业名称" maxlength="20"></el-input>
					 </el-form-item>
					 <el-form-item label="开户银行 :" prop="bank" >
					   <el-input v-model="ruleForm.bank" style="width: 300px;" placeholder="请输入开户银行"></el-input>
					 </el-form-item>
					 <el-form-item label="银行卡号 :" prop="bankCard">
					   <el-input v-model="ruleForm.bankCard" style="width: 300px;" placeholder="请输入银行卡号"></el-input>
					 </el-form-item>
					 <el-form-item label="企业地址 :" prop="address">
					   <el-input v-model="ruleForm.address" style="width: 300px;" placeholder="请输入企业地址" maxlength="30"></el-input>
					 </el-form-item>
					 <el-form-item label="营业执照 :" prop="license">
					   <el-upload
					     class="avatar-uploader"
					     action="http://192.168.1.128:8080/ymw/account/picUpload?pic="
					     :show-file-list="false"
					     :on-success="handleAvatarSuccess2"
					     :before-upload="beforeAvatarUpload">
						    <img v-if="ruleForm.license" :src="ruleForm.license" class="avatar">
						    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					    </el-upload>
					 </el-form-item>
				 </div>
			    </el-form>
				<p class="submit" v-if="IsAuth == 0"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancel">取消</span><span style="margin-left: 200px;padding:5px 40px;" @click="inputSure('ruleForm')">保存</span></p>
		</div>
	</div>
</template>

<script>
    import { getAccountAuth , sendAccountAuth} from '@/api/index'
	export default{
		data(){
			return{
				ruleForm: {
					type:'',
					id:"",
				    phone: '',
				    name:'',
				    idCard:'',
					frontPath:'',
					backPath:'',
					company:'',
					bank:'',
					bankCard:'',
					address:'',
					license:''
				 },
				 phone:'',
				 rules: {
					phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
				    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
				    idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
				    frontPath: [{ required: true, message: '请上传身份证正面照片', trigger: 'blur' }],
				    backPath: [{ required: true, message: '请上传身份证反面照片', trigger: 'blur' }],
				    company: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
				    bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
				    bankCard: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
				    address: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
				    license: [{ required: true, message: '请上传营业执照照片', trigger: 'blur' }],
				 },
				 getInfo:{
					 id:'',
					 type:''
				 },
				 IsAuth:''
			}
		},
		created() {
			this.getInfo.type = sessionStorage.getItem("zlmenu");
			this.ruleForm.type = this.getInfo.type
			var info1 = sessionStorage.getItem("zlInfo");
			this.IsAuth = sessionStorage.getItem("zlIsAuth");
			var info = JSON.parse(info1)
			this.getInfo.id = info.id
			this.phone = info.phone
			this.ruleForm.id = info.id
			this.getAuth();
		},
		methods:{
			getAuth(){
				getAccountAuth(this.getInfo).then((res) => {
					if (res.code == 200) {
					    // console.log(res)
						if(res.data != null){
							this.ruleForm.phone= res.data.phone
							this.ruleForm.name= res.data.name
							this.ruleForm.idCard= res.data.idCard
							this.ruleForm.frontPath= res.data.frontPath
							this.ruleForm.backPath= res.data.backPath
							this.ruleForm.company= res.data.company
							this.ruleForm.bank= res.data.bank
							this.ruleForm.bankCard= res.data.bankCard
							this.ruleForm.address= res.data.address
							this.ruleForm.license= res.data.license
						}
					} else {
					    this.$message.error(res.msg);
					}
				}).catch(() => {
					 this.loading = false
				})
			},
			cancel(){
				this.ruleForm = {}
				this.ruleForm.type = this.getInfo.type
				var info1 = sessionStorage.getItem("zlInfo");
				var info = JSON.parse(info1)
				this.ruleForm.id = info.id
			},
			inputSure(formName){
				this.$refs[formName].validate((valid) => {
				    if (valid) {
						var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
						   if(reg.test(this.ruleForm.idCard) === false){  
						       this.$message.error("身份证输入不合法");  
						       return  false;  
						   } 
							if(isNaN(Number(this.ruleForm.bankCard))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
							    this.$message.error('银行卡号需全为数字格式')
								return
							}
							var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
							 var aa = this.ruleForm.name.replace(reg,"")
							if(aa.length > 6){
								   this.$message.error("请输入的姓名字符不大于6位")
								   return
							}
				        sendAccountAuth(this.ruleForm).then((res) => {
				        	if (res.code == 200) {
				        	    this.$message.success('操作成功');
				        		// this.ruleForm = {}
								this.getAuth();
								var account = JSON.stringify(res.data.account)
								sessionStorage.setItem('zlInfo',account)
								sessionStorage.setItem('zlIsAuth',res.data.isAuth)
								location.reload()
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
			handleAvatarSuccess(res, file) {
				console.log(file)
				if(res.code == 200){
					this.ruleForm.frontPath = res.msg
				}else{
					this.$message.error(res.msg);
				}
			  // this.image = file.raw.name;
			},
			handleAvatarSuccess1(res, file) {
				if(res.code == 200){
					this.ruleForm.backPath = res.msg
				}else{
					this.$message.error(res.msg);
				}
			  // URL.createObjectURL(file.raw);
			  // this.image = file.raw.name;
			},
			handleAvatarSuccess2(res, file) {
				if(res.code == 200){
					this.ruleForm.license = res.msg
				}else{
					this.$message.error(res.msg);
				}
			  // URL.createObjectURL(file.raw);
			  // this.image = file.raw.name;
			},
			beforeAvatarUpload(file) {
				console.log(file)
			  const isLt2M = file.size / 1024 / 1024 < 2;
			  if (!isLt2M) {
			    this.$message.error('上传头像图片大小不能超过 2MB!');
			  }
			  return isLt2M;
			}
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
		.el-form-item{
			display: inline-block;
			vertical-align: top;
			width: 49%;
			position: relative;
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
