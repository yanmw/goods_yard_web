<template>
	<div class="person">
		<p class="personTit">账户管理>子账号管理 <span class="btn-b"  @click="addEdit(0)">+新增</span></p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="name" label="姓名"></el-table-column>
			    <el-table-column  align="center" prop="phone" label="手机号码"></el-table-column>
			    <el-table-column  align="center" prop="arrivestation" label="身份角色">
					<template slot-scope="scope">
						<div class="tableB">
							<span v-if="scope.row.role == 1">管理员</span>
							<span v-if="scope.row.role == 2">业务员</span>
							<span v-if="scope.row.role == 3">财务</span>
						</div>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="company" label="绑定厂家"></el-table-column>
			    <el-table-column  align="center" prop="createDate" label="添加日期" ></el-table-column>
				<el-table-column  align="center"  label="操作" width="240" fixed="right">
					<template slot-scope="scope">
						<div class="tableB">
							<span class="tableBtn redB" v-if="scope.row.status == 1" @click="getStatus(scope.row.id)">冻结</span>
							<span class="tableBtn gray" v-if="scope.row.status == 2" @click="getStatus(scope.row.id)">解冻</span>
							<span class="tableBtn green" @click="addEdit(1,scope.row)">修改</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog title="" :visible.sync="dialogVisible" width="1000px" :before-close="closeDialog" :close-on-click-modal="false">
	      <div class="orderH">
	    	  <p class="dioOrder" v-if="edit">添加子账户</p>
	    	  <p class="dioOrder" v-else>修改子账号信息</p>
	    	  <div>
	    	    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 400px;margin: 0 auto;">
	    	       <el-form-item label="姓    名 :" prop="name">
	    	      	   <el-input v-model="ruleForm.name" style="width: 300px;" maxlength="12" placeholder="请输入姓名"></el-input>
	    	       </el-form-item>
	    	       <el-form-item label="手机号码 :" prop="phone">
	    	           <el-input v-model="ruleForm.phone" style="width: 300px;" maxlength="11" placeholder="请输入手机号码"></el-input>
	    	       </el-form-item>
	    	    	<el-form-item label="身份证号 :" prop="idCard">
	    	    	   <el-input v-model="ruleForm.idCard" style="width: 300px;" maxlength="18" placeholder="请输入身份证号"></el-input>
	    	    	</el-form-item>
	    	    	<el-form-item label="登录密码 :" prop="password">
	    	    	   <el-input v-model="ruleForm.password" style="width: 300px;" maxlength="6" placeholder="请输入登录密码"></el-input>
	    	    	</el-form-item>
					<el-form-item label="身份角色 :" prop="role" style="width: 100%;" v-if="edit" >
					  <el-radio-group v-model="ruleForm.role" @change="selectRole()">
					      <el-radio label="2">业务员</el-radio>
					      <el-radio label="3">财务</el-radio>
					    </el-radio-group>
					</el-form-item>
					<el-form-item label="绑定厂家 :" prop="company">
					  <el-select v-model="ruleForm.company" placeholder="请选择厂家" style="width: 300px;" v-if="caiWu == true">
					    <el-option
					          v-for="item in manufacturers"
					          :key="item.supplier"
					          :label="item.supplier"
					          :value="item.supplier">
					        </el-option>
					  </el-select>
					  <el-input v-model="ruleForm.company" style="width: 300px;" v-if="caiWu == false" readonly></el-input>
					</el-form-item>
	    	    </el-form>
	    	    <p class="submit" v-if="edit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 50px;" @click="cancel('ruleForm')">取消</span><span style="margin-left: 50px;padding:5px 50px;" @click="inputSure('ruleForm')">确认</span></p>
	    	    <p class="submit" v-else><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 50px;" @click="cancel('ruleForm')">取消</span><span style="margin-left: 50px;padding:5px 50px;" @click="inputSureEdit('ruleForm')">确认</span></p>
	    	  </div>
	      </div>
	    </el-dialog>
	</div>
</template>

<script>
	import { selectAccountPage, addAccount, selectAccount, updateAccount, updateAccountStatus, selectSupplierList} from '@/api/index'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				input:'',
				listQuery:{
					company:'',
					pageNum:1,
					pageSize:10,
				},
				total:0,
				loading:false,
				tableData:[],
				manufacturers:'',
				ruleForm: {
				    phone: '',
				    name:'',
				    idCard:'',
					password:'',
					company:'',
					role:"2"
				},
				rules: {
				    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
					phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
					idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
					password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
					company: [{ required: true, message: '请选择绑定厂家', trigger: 'change' }],
					role: [{ required: true, message: '请选择身份角色', trigger: 'change' }],
				},
				dialogVisible:false,
				edit:false,
				caiWu:true
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			// console.log(info)
			// this.listQuery.company = info.company
			this.getUserList()
		},
		methods:{
			closeDialog(done){
			    　　done();
			        location.reload();
			},
			getUserList(){
				this.loading = true
				selectAccountPage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.list
				        // this.statist = res.body.statistics[0]
				        this.total = res.data.total
				        this.loading = false
				    } else {
						this.$message.error(res.msg);
				        this.tableData = []
				        this.total = 0
				        this.loading = false
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			selectRole(){
				// console.log(this.ruleForm.role)
				if(this.ruleForm.role == "3"){
					this.caiWu = false
					this.ruleForm.company = '全部'
				}else{
					this.caiWu = true
					this.ruleForm.company = ''
				}
			},
			addEdit(idx,row){
				if(idx == 0){
					this.edit = true
					this.ruleForm.phone = ''
					this.ruleForm.idCard = ''
					this.ruleForm.name = ''
					this.ruleForm.password = ''
					// this.ruleForm.company = ""
				}else{
					this.edit = false
					this.ruleForm = row
					this.ruleForm.id = row.id
					if(row.role == "3"){
						this.caiWu = false
						// this.ruleForm.company = '全部'
					}else{
						this.caiWu = true
						// this.ruleForm.company = ''
					}
					// console.log(row)
				}
				this.supplier()
				this.dialogVisible = true
			},
			supplier(){
				selectSupplierList().then((res) => {
				  if (res.code == 200) {
					  this.manufacturers = res.data
				      this.$message.success(res.msg);
				  } else {
					  this.$message.error(res.msg);
				  }
				}).catch(() => {
				      this.loading = false
				})
			},
			cancel(formName){
				// location.reload()
				this.$refs[formName].resetFields();
				this.dialogVisible = false
				this.getUserList()
				// this.ruleForm.phone = ''
				// this.ruleForm.name = ''
				// this.ruleForm.idCard = ''
				// this.ruleForm.password = ''
				// this.ruleForm.company = ''
				// this.ruleForm.role = ''
			},
			inputSure(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm.phone))){
					     this.$message.error("请输入正确的手机号")   
						return  false;  
					  }
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					   if(reg.test(this.ruleForm.idCard) === false){  
					       this.$message.error("身份证输入不合法");  
					       return  false;  
					   } 
					var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					 var aa = this.ruleForm.name.replace(reg,"")
					if(aa.length > 6){
						   this.$message.error("请输入的姓名字符不大于6位")
						   return
					}
			      addAccount(this.ruleForm).then((res) => {
				    if (res.code == 200) {
				        this.$message.success(res.msg);
						this.dialogVisible = false
						this.$refs.ruleForm.resetFields();
				        this.getUserList()
				    } else {
						this.$message.error(res.msg);
				    }
				  }).catch(() => {
				        this.loading = false
				  })
			    }
			  });
			},
			inputSureEdit(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm.phone))){
					     this.$message.error("请输入正确的手机号")   
						return  false;  
					  }
					var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					   if(reg.test(this.ruleForm.idCard) === false){  
					       this.$message.error("身份证输入不合法");  
					       return  false;  
					   }  
					var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					 var aa = this.ruleForm.name.replace(reg,"")
					if(aa.length > 6){
						   this.$message.error("请输入的姓名字符不大于6位")
						   return
					}
			      updateAccount({id:this.ruleForm.id,phone:this.ruleForm.phone,name:this.ruleForm.name,idCard:this.ruleForm.idCard,password:this.ruleForm.password,company:this.ruleForm.company,role:this.ruleForm.role}).then((res) => {
			        if (res.code == 200) {
			            this.$message.success(res.msg);
						this.$refs.ruleForm.resetFields();
						this.dialogVisible = false
			            this.getUserList()
			        } else {
			      		this.$message.error(res.msg);
			        }
			      }).catch(() => {
			            this.loading = false
			      })
			    }
			  });
			},
			getStatus(id){
				updateAccountStatus({"id":id}).then((res) => {
				    if (res.code == 200) {
				       this.$message.success(res.msg);
					   this.getUserList()
				    } else {
					   this.$message.error(res.msg);
				    }
				}).catch(() => {
				    this.loading = false
				})
			}
		},
		computed: {
		    dateTime: {
		        get() {
		          if (this.listQuery.beginTime && this.listQuery.endTime) {
		             return [this.listQuery.beginTime, this.listQuery.endTime]
		           } else {
		             return []
		          }
		        },
		        set(v) {
		          // console.log(v)
		          this.listQuery.beginTime = v[0]
		          this.listQuery.endTime = v[1]
		        }
		   }
		}
	}
</script>

<style lang="less" scoped>
	.personTit{
		padding-top: 10px !important;
	}
	.dioOrder{
		top:-40px;
		padding-bottom: 30px;
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
	.orderH{
		.btn-ba{
			margin-left: 0;
			padding: 3px 10px;
			margin-right: 5px;
		}
	}
	// .el-table--striped .el-table__body tr.el-table__row--striped td{
	// 	background: #256ff8 !important;
	// 	opacity: 0.05;
	// }
	// .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
	// 	    border-right: 1px solid #eee !important;
	// }
	// .el-table td, .el-table th.is-leaf {
	//     border-bottom: 1px solid #eee!important;
	// }
</style>


