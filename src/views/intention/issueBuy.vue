<template>
	<div class="person">
		<p class="personTit" v-if="edit">买货管理>意向购买>发布求购</p>
		<p class="personTit" v-else>买货管理>意向购买>编辑求购</p>
		<div class="issue">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm fromItem" style="width: 100%;">
				 <div class="lala" style="letter-spacing: 1px;color: #333333;font-size: 18px;margin-bottom: 20px;"><i></i> 货品基本信息</div>
				 <div>
				  <el-form-item label="标 题 :" prop="title">
				    <el-input v-model="ruleForm.title" style="width: 300px;" maxlength="30" placeholder="请输入标题"></el-input>
				  </el-form-item>
				  <el-form-item label="货品种类 :" prop="category" style="width: 100%;">
					  <el-input v-model="ruleForm.category" style="width: 300px;" maxlength="12" placeholder="请输入货品种类"></el-input>
				   <!-- <el-radio-group v-model="ruleForm.category">
				        <el-radio v-for="item in tabSpan" :label="item.category">{{item.category}}</el-radio>
				      </el-radio-group> -->
				  </el-form-item>
					 <el-form-item label="需求数量 :" prop="amount">
					   <el-input v-model="ruleForm.amount"  style="width: 300px;" placeholder="请输入需求数量"></el-input> (吨)
					 </el-form-item>
					 <el-form-item label="需求厂家 :" prop="company">
					   <el-input v-model="ruleForm.company" style="width: 300px;" placeholder="请输入需求厂家" readonly></el-input> 
					 </el-form-item>
					 <el-form-item label="目的地 :" prop="destination" >
					   <el-cascader
					       v-model="value"
					       :options="options"
					       @change="handleChange"
					   	:props="props" style="width: 300px;" placeholder="请选择目的地"></el-cascader> 
					 </el-form-item>
					 <el-form-item label="截止日期 :" prop="expiryDate">
					    <el-date-picker v-model="ruleForm.expiryDate" type="datetime" :picker-options="expireTimeOption" style="width: 300px;" placeholder="请选择截止日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker> 
					 </el-form-item>
				 </div>
				 <div class="lala" style="letter-spacing: 1px;color: #333333;font-size: 18px;margin-bottom: 20px;"><i></i> 联系人信息</div>
				 <div>
					<el-form-item label="联 系 人 :" prop="contacts">
					   <el-input v-model="ruleForm.contacts" style="width: 300px;" maxlength="12" placeholder="请输入联系人"></el-input>
					 </el-form-item>
					 <el-form-item label="联系电话 :" prop="phone">
					   <el-input   v-model="ruleForm.phone" style="width: 300px;" maxlength="11" placeholder="请输入联系电话"></el-input>
					 </el-form-item>
				 </div>
			</el-form>
		    <p class="submit" v-if="edit"><span @click="submit('ruleForm')">发布</span></p>
		    <p class="submit" v-else><span @click="submitEdit('ruleForm')">修改</span></p>
		</div>
	</div>
</template>

<script>
	import { selectGoodsCategory, purchaseAddPurchase,purchaseSelectPurchase, purchaseUpdatePurchase} from '../../api/index.js'
	import Area from '../../util/city.js'
	export default{
		components:{
			Area
		},
		data(){
			let patter = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
			let isNumber = (rule, value, callback) => {
			  if (!patter.test(value)) {
			    return callback(new Error('必须为非负整数或至多保留两位小数'))
			  }else if(value > 10000){
				  return callback(new Error('请输入小于等于10000的值'))
			  }else if(value <= 0){
				  return callback(new Error('请输入大于0的值'))
			  } else {
			    callback()
			  }
			};
			return{
				expireTimeOption: {
				    disabledDate(date) {
				       return date.getTime() <= Date.now();
				    }
				},
				ruleForm: {
					userId:'',
					title:'',
					category:'',
					amount:'',
					company:'',
				    destination:'',
				    expiryDate:'',
					phone:'',
					contacts:''
				 },
				 tabSpan:[],
				 address:[],
				 options:'',
				 value:'',
				 edit:true,
				 rules: {
				    category: [{ required: true, message: '请输入货品种类', trigger: 'blur' }],
				    expiryDate: [{ required: true, message: '请选择截止日期', trigger: 'change' }],
				    destination: [{ required: true, message: '请选择目的地', trigger: 'change' }],
				    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
				    amount: [{ required: true, message: '请输入需求数量', trigger: 'blur' },{ validator:isNumber,trigger: "blur"}],
				    company: [{ required: true, message: '请输入需求厂家', trigger: 'blur' }],
				    phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
				    contacts: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
				 },
				 props: {
				 	label: 'value',
				 	children: 'children'
				 },
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.ruleForm.userId = info.id
			this.ruleForm.company = info.company
			this.getCategorys()
			// this.getCategory()
			this.options = Area.areaList
			if(JSON.stringify(this.$route.query) != '{}'){
				this.edit = false
				this.getId()
			}
		},
		methods:{
			getCategorys(){
				selectGoodsCategory({userId:this.ruleForm.userId}).then((res) => {
				    if (res.code == 200) {
				        this.tabSpan = res.data
				    } else {
						this.$message.error(res.msg);
				        this.tabSpan = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getId(){
				purchaseSelectPurchase({id:this.$route.query.id}).then((res) => {
				 	  if(res.code == 200){
						  this.ruleForm = res.data
						  this.value = JSON.parse(res.data.destination)
				 	  }else {
						this.$message.error(res.msg);
				        this.ruleForm = []
				    }
				}).catch(function(res) {
				 		// console.log(res)
				   })
			},
			handleChange(value) {
			  this.ruleForm.destination = JSON.stringify(value)
			},
			submit(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm.phone))){
					     this.$message.error("请输入正确的手机号")      
						 return
					  }
					  var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					   var aa = this.ruleForm.contacts.replace(reg,"")
					  if(aa.length > 6){
					  	   this.$message.error("请输入的联系人字符不大于6位")
					  	   return
					  }
			      purchaseAddPurchase(this.ruleForm).then((res) => {
				    if (res.code == 200) {
				        this.$message.success(res.msg);
						// this.ruleForm = {}
						this.$router.push('/personal/listBuy')
				    } else {
						this.$message.error(res.msg);
				    }
				  }).catch(() => {
				        this.loading = false
				  })
			    }
			  });
			},
			submitEdit(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm.phone))){
					     this.$message.error("请输入正确的手机号")      
						 return
					  }
					  var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					   var aa = this.ruleForm.contacts.replace(reg,"")
					  if(aa.length > 6){
					  	   this.$message.error("请输入的联系人字符不大于6位")
					  	   return
					  }
			      purchaseUpdatePurchase(this.ruleForm).then((res) => {
				    if (res.code == 200) {
				        this.$message.success(res.msg);
				        this.getId()
						this.$router.push('/personal/listBuy')
				    } else {
						this.$message.error(res.msg);
				    }
				  }).catch(() => {
				        this.loading = false
				  })
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
	.issue{
		width: 98.5%;
		min-width: 1000px;
		background-color: #ffffff;
		box-shadow: 0px 2px 8px 0px rgba(37, 111, 248, 0.14);
		border-radius: 5px;
		border: solid 1px #256ff8;
		padding: 20px;
	}
	.fromItem{
		.el-form-item{
			display: inline-block;
			width: 49%;
		}
	}
	.lala{
		i{
			display: inline-block;
			width: 3px;
			height: 13px;
			background-color: #256ff8;
			vertical-align: bottom;
			margin-right: 8px;
			position: relative;
			top:-5px;
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
