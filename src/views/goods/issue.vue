<template>
	<div class="person">
		<p class="personTit" v-if="edit">货品管理>发布货品</p>
		<p class="personTit" v-else>货品管理>编辑货品</p>
		<div class="issue">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm fromItem" style="width: 100%;">
				 <div class="lala" style="letter-spacing: 1px;color: #333333;font-size: 18px;margin-bottom: 20px;"><i></i>货品基本信息</div>
				  <el-form-item label="货品种类 :" prop="category" style="width: 100%;">
				    <el-radio-group v-model="ruleForm.category" @change="getCategory()">
						<el-radio v-for="item in tabSpan" :label="item.category" style="margin:15px 25px 10px 0">{{item.category}}</el-radio>
				      </el-radio-group>
				  </el-form-item>
				  <div style="margin-bottom: 20px;"> 
					 <el-form-item label="货品型号 :" prop="model" >
					   <el-select v-model="ruleForm.model" placeholder="请选择货品型号" style="width: 300px;" @change="onSelectedDrug($event)">
					     <el-option
					           v-for="item in modela"
					           :key="item.model"
					           :label="item.model"
					           :value="item.model">
					         </el-option>
					   </el-select>
					 </el-form-item>
					 <el-form-item label="货源厂家 :" prop="supplier">
					   <el-input v-if="role == 2" v-model="ruleForm.supplier" style="width: 300px;" readonly ></el-input>
					   <el-select v-else v-model="ruleForm.supplier" placeholder="请选择货源厂家" style="width: 300px;">
					     <el-option
					           v-for="item in supplier"
					           :key="item.supplier"
					           :label="item.supplier"
					           :value="item.supplier">
					         </el-option>
					   </el-select>
					 </el-form-item>
					 <el-form-item label="货 源 地 :" prop="address">
						 <el-cascader
						     v-model="address"
						     :options="options"
						     @change="handleChange"
						 	:props="props" style="width: 300px;" placeholder="请选择货源地"></el-cascader> 
					 </el-form-item>
					 <el-form-item label="货品单价 :" prop="price">
					   <el-input  v-model="ruleForm.price" style="width: 300px;" placeholder="请输入货品单价" ></el-input> (元/吨)
					 </el-form-item>
					 <el-form-item label="库存数量 :" prop="stock">
					   <el-input  v-model="ruleForm.stock" style="width: 300px;" placeholder="请输入库存数量"></el-input> (吨)
					 </el-form-item>
				 </div>
				 <div class="lala" style="letter-spacing: 1px;color: #333333;font-size: 18px;margin-bottom: 20px;"><i></i>其他信息</div>
				 <div>
					<el-form-item label="业 务 员 :" prop="salesman">
					   <el-input v-model="ruleForm.salesman" style="width: 300px;" placeholder="请输入业务员" maxlength="12"></el-input>
					 </el-form-item>
					 <el-form-item label="联系电话 :" prop="phone">
					   <el-input   v-model="ruleForm.phone" style="width: 300px;" maxlength="11" placeholder="请输入联系电话" ></el-input>
					 </el-form-item>
					<el-form-item label="备  注 :">
					  <el-input type="textarea" v-model="ruleForm.remarks" style="width: 100%;" maxlength="100" placeholder="请输入备注"></el-input>
					</el-form-item>
				 </div>
				 
			    </el-form>
				<p class="submit" v-if="edit"><span @click="submit('ruleForm')">发布</span></p>
				<p class="submit" v-else><span @click="submitEdit('ruleForm')">修改</span></p>
		</div>
	</div>
</template>

<script>
	import {selectGoodsCategory, getModelByCategory,getSuppliers, issueGoods,selectGoodsID, issueGoodsEdit} from '../../api/index.js'
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
			  } else if(value <= 0){
				  return callback(new Error('请输入大于0的值'))
			  } else {
			    callback()
			  }
			};
			return{
				ruleForm: {
					creator:'',
					category:'',
					model:'',
				    supplier: '',
				    address:'',
				    price:'',
					stock:'',
					salesman:'',
					phone:'',
					remarks:''
				 },
				 address:[],
				 tabSpan:[],
				 modela:'',
				 options:'',
				 supplier:'',
				 role:'',
				 edit:true,
				 getCarte:'',
				 rules: {
				    category: [{ required: true, message: '请选择货品种类', trigger: 'change' }],
				    model: [{ required: true, message: '请选择货品型号', trigger: 'change' }],
				    supplier: [{ required: true, message: '请选择货源厂家', trigger: 'change' }],
				    address: [{ required: true, message: '请选择货源地', trigger: 'change' }],
				    price: [{ required: true, message: '请输入货品单价', trigger: 'blur' },{ validator:isNumber,trigger: "blur"}],
				    stock: [{ required: true, message: '请输入库存数量', trigger: 'blur' },{ validator:isNumber,trigger: "blur"}],
				    salesman: [{ required: true, message: '请输入业务员', trigger: 'blur' }],
				    phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
				    remrks: [{ required: true, message: '请输入备注', trigger: 'blur' }],
				 },
				 props: {
				 	label: 'value',
				 	children: 'children'
				 },
				 info:''
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.info = info
			this.ruleForm.creator = info.id
			this.getCategorys()
			if(info.role == 2){
				this.ruleForm.supplier = info.company
			}
			this.role = info.role
			this.options = Area.areaList
			if(JSON.stringify(this.$route.query) != '{}'){
				this.edit = false
				this.getId()
			}
			// let fields =  this.$refs.ruleForm
			// console.log(fields)
			
			// for (let i = 0; i < fields.length; i++) {
			//   if (fields[i].prop === prop) {
			//     // 通过唯一的prop属性值相同来判别是哪个输入框
			//     fields[i].resetField()
			//     break
			//   }
			// }
		},
		methods:{
			getCategorys(){
				selectGoodsCategory({userId:this.ruleForm.creator}).then((res) => {
				    if (res.code == 200) {
				        this.tabSpan = res.data
						// this.ruleForm.category = res.data[0].category
						// this.getCategory()
						// console.log(this.ruleForm.category)
				    } else {
						this.$message.error(res.msg);
				        this.tabSpan = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getId(){
				selectGoodsID({id:this.$route.query.id}).then((res) => {
				 	  if(res.code == 200){
						  this.ruleForm = res.data
						  this.getCarte = res.data.category
						  this.address = JSON.parse(res.data.address)
						  if(this.role == 2){
						  	this.ruleForm.supplier = this.info.company
						  }
						  // if(this.role == 1){
							 //  this.ruleForm.supplier = ''
						  // }
						  this.getCategory()
				 	  }else {
						this.$message.error(res.msg);
				        this.ruleForm = []
				    }
				}).catch(function(res) {
				 		// console.log(res)
				   })
			},
			getCategory(){
				if(this.role == 1){
					getModelByCategory({category:this.ruleForm.category}).then((res) => {
					 	  if(res.code == 200){
							  this.modela = res.data
							  // if(JSON.stringify(this.$route.query) != '{}'){
							  	if(this.ruleForm.category != this.getCarte){
							  		 this.ruleForm.model = ''
							  		 if(this.role == 1){
							  		 	  this.ruleForm.supplier = ''
							  		 }
									  this.getCarte = this.ruleForm.category
							  	}
							  // }
							  
					 	  }else {
							this.$message.error(res.msg);
					        this.modela = []
					    }
					}).catch(function(res) {
					 		// console.log(res)
					   })
				}else if(this.role == 2){
					getModelByCategory({category:this.ruleForm.category,supplier:this.ruleForm.supplier}).then((res) => {
					 	  if(res.code == 200){
							  this.modela = res.data
							  // if(JSON.stringify(this.$route.query) != '{}'){
							  	if(this.ruleForm.category != this.getCarte){
							  		 this.ruleForm.model = ''
									 this.getCarte = this.ruleForm.category
							  	}
								this.ruleForm.supplier = this.info.company
							  // }
							  
					 	  }else {
							this.$message.error(res.msg);
					        this.modela = []
					    }
					}).catch(function(res) {
					 		// console.log(res)
					   })
				}
				
			},
			onSelectedDrug(e){
				getSuppliers({category:this.ruleForm.category,model:e}).then((res) => {
				 	  if(res.code == 200){
						  this.supplier = res.data
				 	  }else {
						this.$message.error(res.msg);
				        this.supplier = []
				    }
				}).catch(function(res) {
			     		console.log(res)
			       })
			},
			handleChange(value) {
			  this.ruleForm.address = JSON.stringify(value)
			},
			submit(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm.phone))){
					     this.$message.error("请输入正确的手机号")      
						 return;
					  }
					  var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					   var aa = this.ruleForm.salesman.replace(reg,"")
					  if(aa.length > 6){
					  	   this.$message.error("请输入的业务员字符不大于6位")
					  	   return
					  }
			      issueGoods(this.ruleForm).then((res) => {
				    if (res.code == 200) {
				        this.$message.success(res.msg);
						// this.ruleForm = {}
						this.$router.push('/personal/list')
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
						 return;
					  }
					  var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					   var aa = this.ruleForm.salesman.replace(reg,"")
					  if(aa.length > 6){
					  	   this.$message.error("请输入的业务员字符不大于6位")
					  	   return
					  }
			      issueGoodsEdit(this.ruleForm).then((res) => {
				    if (res.code == 200) {
				        this.$message.success(res.msg);
				        this.getId()
						this.$router.push('/personal/list')
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
