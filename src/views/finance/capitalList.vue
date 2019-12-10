<template>
	<div class="person">
		<p class="personTit">财务管理>资金账户列表 <span class="btn-b" @click="added">+新增</span></p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="phone" label="手机号码"></el-table-column>
			    <el-table-column  align="center" prop="company" label="企业账户"></el-table-column>
			    <el-table-column  align="center" prop="bank" label="开户银行"></el-table-column>
			    <el-table-column  align="center" prop="bankCard" label="银行卡号"></el-table-column>
			    <el-table-column  align="center" prop="settleAmount" label="结算金额(元)" >
					<template slot-scope="scope">
						<span v-if="scope.row.settleAmount == null">0</span>
						<span v-else>{{scope.row.settleAmount}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="freezeAmount" label="冻结金额(元)">
					<template slot-scope="scope">
						<span v-if="scope.row.freezeAmount == null">0</span>
						<span v-else>{{scope.row.freezeAmount}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="usableAmount" label="可用余额(元)">
					<template slot-scope="scope">
						<span v-if="scope.row.usableAmount == null">0</span>
						<span v-else>{{scope.row.usableAmount}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" label="总金额(元)">
					<template slot-scope="scope">
						<span>{{(scope.row.freezeAmount) + (scope.row.usableAmount) + (scope.row.settleAmount)}}</span>
					</template>
				</el-table-column>
				<el-table-column  align="center"  label="操作" width="240" fixed="right">
					<template slot-scope="scope">
						<div class="tableB">
							<span class="tableBtn blueB" @click="recharge(scope.row)">充值</span>
							<span class="tableBtn gray" @click="withdraw(scope.row)">提现</span>
							<span class="tableBtn green" @click="edit(scope.row)">编辑</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog title="" :visible.sync="dialogVisible" width="1200px" :before-close="closeDialog" :close-on-click-modal="false">
	      <div class="orderH">
	    	  <p class="dioOrder">新增资金账户</p>
	    	  <div>
	    	    <el-form :model="adder" ref="adder" label-width="100px" class="demo-ruleForm" style="width: 360px;margin: 0 auto;">
	    	       <el-form-item label="手机号码 :">
	    	      	   <el-input v-model="adder.phone" style="width: 240px;" @blur="phone()" maxlength="11"></el-input>
	    	       </el-form-item>
	    	       <el-form-item label="企业账户 :">
	    	           <span style="font-size: 16px;color: #333;" v-if="adder.company" maxlength="12">{{adder.company}}</span>
	    	       </el-form-item>
	    	    	<el-form-item label="开户银行 :">
	    	    	   <span style="font-size: 16px;color: #333;" v-if="adder.bank">{{adder.bank}}</span>
	    	    	</el-form-item>
	    	    	<el-form-item label="银行卡号 :">
	    	    	   <span style="font-size: 16px;color: #333;" v-if="adder.bankCard">{{adder.bankCard}}</span>
	    	    	</el-form-item>
	    	    </el-form>
	    	    <p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancel('adder')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure()">确认</span></p>
	    	  </div>
	      </div>
	    </el-dialog>
		<el-dialog title="" :visible.sync="dialogVisibleEdit" width="1200px" :before-close="closeDialog" :close-on-click-modal="false">
		  <div class="orderH">
			  <p class="dioOrder">编辑资金账户</p>
			  <div>
			    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 360px;margin: 0 auto;">
			         <el-form-item label="手机号码 :" prop="phone">
			      	   <el-input v-model="ruleForm.phone" style="width: 240px;" maxlength="11" @change="regPhone()" readonly></el-input>
			         </el-form-item>
			         <el-form-item label="企业账户 :" prop="company">
			           <el-input v-model="ruleForm.company" style="width: 240px;" maxlength="12"></el-input>
			         </el-form-item>
			    	 <el-form-item label="开户银行 :" prop="bank">
			    	   <el-input v-model="ruleForm.bank" style="width: 240px;"></el-input>
			    	 </el-form-item>
			    	 <el-form-item label="银行卡号 :" prop="bankCard">
			    	   <el-input v-model="ruleForm.bankCard" style="width: 240px;"></el-input>
			    	 </el-form-item>
			    </el-form>
			    <p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancel1('ruleForm')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure1('ruleForm')">确认</span></p>
			  </div>
		  </div>
		</el-dialog>
		<el-dialog title="" :visible.sync="dialogVisible1" width="1200px" :before-close="closeDialog" :close-on-click-modal="false">
		  <div class="orderH">
			   <p class="dioOrder">账户充值</p>
			   <div>
			     <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm" style="width: 360px;margin: 0 auto;">
			        <el-form-item label="企业账户 :">
			          <span style="font-size: 16px;color: #333;">{{ruleForm1.company}}</span>
			        </el-form-item>
					<el-form-item label="银行卡号 :">
					  <span style="font-size: 16px;color: #333;">{{ruleForm1.bankCard}}</span>
					</el-form-item>
			        <el-form-item label="充值金额 :" prop="amount">
			         <el-input v-model="ruleForm1.amount" style="width: 240px;"></el-input>
			        </el-form-item>
			     	<el-form-item label="充值凭证 :" prop="voucher">
			     	 <el-upload
			     	   class="avatar-uploader"
			     	   action="http://192.168.1.128:8080/ymw/account/picUpload?pic="
			     	   :show-file-list="false"
			     	   :on-success="handleAvatarSuccess"
			     	   :before-upload="beforeAvatarUpload">
					       <img v-if="ruleForm1.voucher" :src="ruleForm1.voucher" class="avatar">
					       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			     	  </el-upload>
			     	</el-form-item>
			     </el-form>
			     <p class="submit" style="margin-top: 100px;"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancel2('ruleForm1')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure2('ruleForm1')">确认</span></p>
			   </div>
		  </div>
		</el-dialog>
		<el-dialog title="" :visible.sync="dialogVisible2" width="1200px" :before-close="closeDialog" :close-on-click-modal="false">
		  <div class="orderH">
			   <p class="dioOrder">账户提现</p>
			   <div>
			     <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="width: 360px;margin: 0 auto;">
			        <el-form-item label="企业账户 :">
			          <span style="font-size: 16px;color: #333;">{{ruleForm2.company}}</span>
			        </el-form-item>
					<el-form-item label="银行卡号 :">
					  <span style="font-size: 16px;color: #333;">{{ruleForm2.bankCard}}</span>
					</el-form-item>
			     	<el-form-item label="提现金额 :" prop="amount">
			     	  <el-input v-model="ruleForm2.amount" style="width: 240px;" ></el-input>
			     	</el-form-item>
			     </el-form>
			     <p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancel3('ruleForm2')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure3('ruleForm2')">确认</span></p>
			   </div>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import { selectFundPage, selectAuthByPhone, addFund, updateFund, recharge, cashOut} from '@/api/index'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			let patter = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
			let isNumber = (rule, value, callback) => {
			  if (!patter.test(value)) {
			    return callback(new Error('必须为非负整数或至多保留两位小数'))
			  } else if(value > 100000000){
				  return callback(new Error('请输入小于等于一亿的值'))
			  } else if(value <= 0){
				  return callback(new Error('请输入大于0的值'))
			  } else {
			    callback()
			  }
			};
			return{
				input:'',
				listQuery:{
					id:'',
					pageNum:1,
					pageSize:10
				},
				adder:{
					phone:'',
					userId:'',
					adminId:'',
					company:'',
					bank:'',
					bankCard:''
				},
				imageUrl: '',
				image:'',
				total:0,
				loading:false,
				tableData:[],
				ruleForm: {
				    phone: '',
				    company:'',
				    bank:'',
				    bankCard:'',
				    id:'',
				},
				rules: {
				    phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
				    company: [{ required: true, message: '请输入认证公司', trigger: 'blur' }],
				    bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
				    bankCard: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
				},
				ruleForm1: {
					id:'',
				    userId: '',
				    company:'',
				    bank:'',
				    bankCard:'',
					amount:'',
					voucher:'',
					account:'',
					operator:''
				},
				rules1: {
				    amount: [{ required: true, message: '请输入充值金额', trigger: 'blur' }],
				    voucher: [{ required: true, message: '请上传图片', trigger: 'change' }],
				},
				ruleForm2: {
					id:'',
				    userId: '',
				    company:'',
				    bank:'',
				    bankCard:'',
				    amount:'',
					account:'',
					operator:''
				},
				rules2: {
				    amount: [{ required: true, message: '请输入提现金额', trigger: 'blur' }],
				},
				dialogVisible:false,
				dialogVisibleEdit:false,
				dialogVisible1:false,
				dialogVisible2:false,
				login:''
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.login = info
			this.listQuery.id = info.id
			this.adder.adminId = info.id
			this.ruleForm1.operator = info.name
			this.ruleForm2.operator = info.name
			this.ruleForm1.account = info.phone
			this.ruleForm2.account = info.phone
			this.getUserList()
		},
		methods:{
			closeDialog(done){
			    　　done();
			        location.reload();
			},
			getUserList(){
				this.loading = true
				selectFundPage(this.listQuery).then((res) => {
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
			added(){
				this.dialogVisible = true
				this.adder.phone = ''
				this.adder.company = ''
				this.adder.bank = ''
				this.adder.bankCard = ''
				this.adder.adminId = this.login.id
			},
			phone(){
				if(this.adder.phone == ''){
					 this.$message.error('请输入手机号');
					 return
				}
				if(this.adder.phone.length != 11){
					 this.$message.error('请输入正确手机号');
					 return
				}
				if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.adder.phone))){
				     this.$message.error("请输入正确的手机号") ;
				     return
				  }
				selectAuthByPhone({"phone":this.adder.phone}).then((res) => {
				    if (res.code == 200) {
						this.adder.phone = res.data.phone
						this.adder.userId = res.data.id
						// this.adder.adminId = res.data.adminId
						this.adder.company = res.data.company
						this.adder.bank = res.data.bank
						this.adder.bankCard = res.data.bankCard
				    }else{
						 this.$message.error('查无此用户，请检查输入手机号是否正确或确保该用户已经注册认证');
						 // this.adder.phone = ''
						 this.adder.userId = ''
						 // this.adder.adminId = res.data.adminId
						 this.adder.company = ''
						 this.adder.bank = ''
						 this.adder.bankCard = ''
					}
				}).catch(() => {
				    this.loading = false
				})
			},
			cancel(adder){
				this.$refs.adder.resetFields();
				this.dialogVisible = false
				this.getUserList()
			},
			cancel1(ruleForm){
				this.$refs.ruleForm.resetFields();
				this.dialogVisibleEdit = false
				this.getUserList()
			},
			cancel2(ruleForm1){
				this.$refs.ruleForm1.resetFields();
				this.dialogVisible1 = false
				this.getUserList()
			},
			cancel3(ruleForm2){
				this.$refs.ruleForm2.resetFields();
				this.dialogVisible2 = false
				this.getUserList()
			},
			// cancel(ruleForm){
			// 	// this.$refs.ruleForm.resetFields();
			// 	// this.dialogVisibleEdit = false
			// 	this.adder = {}
			// 	this.ruleForm = {}
			// 	// this.ruleForm1 = {}
			// 	this.ruleForm1.amount = ' '
			// 	this.ruleForm1.voucher = ''
			// 	this.ruleForm2.amount = ' '
			// 	this.dialogVisible = false
			// 	this.dialogVisibleEdit = false
			// 	this.dialogVisible1 = false
			// 	this.dialogVisible2 = false
			// 	this.adder.adminId = this.login.id
			// 	this.ruleForm1.operator = this.login.name
			// 	this.ruleForm2.operator = this.login.name
			// 	this.ruleForm1.account = this.login.phone
			// 	this.ruleForm2.account = this.login.phone
			// },
			inputSure(){
				if(this.adder.phone == ''){
					 this.$message.error('请输入手机号');
					 return
				}
				if(this.adder.phone.length != 11){
					 this.$message.error('请输入正确手机号');
					 return
				}
				if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.adder.phone))){
				     this.$message.error("请输入正确的手机号") ;
				     return
				  }
				  if(this.adder.company != ''){
					  addFund(this.adder).then((res) => {
					      if (res.code == 200) {
					  		this.$message.success(res.msg);
					  		this.dialogVisible = false
					  		this.getUserList()
					      }else{
					  		 this.$message.error(res.msg);
					  	}
					  }).catch(() => {
					      this.loading = false
					  })
				  }
			},
			edit(row){
				this.ruleForm.bankCard = row.bankCard
				this.ruleForm.phone = row.phone
				this.ruleForm.company = row.company
				this.ruleForm.bank = row.bank
				this.ruleForm.id = row.id
				this.dialogVisibleEdit = true
			},
			inputSure1(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  if(isNaN(Number(this.ruleForm.bankCard))){ 
					      this.$message.error('银行卡号需全为数字格式')
					  	return
					  }
				    updateFund(this.ruleForm).then((res) => {
				        if (res.code == 200) {
				    		this.$message.success(res.msg);
							this.$refs.ruleForm.resetFields();
				    		this.dialogVisibleEdit = false
							this.getUserList()
				        }else{
				    		 this.$message.error(res.msg);
				    	}
				    }).catch(() => {
				        this.loading = false
				    })
				  } 
				});
			},
			recharge(row){
				this.dialogVisible1 = true
				this.ruleForm1.id = row.id
				this.ruleForm1.userId = row.userId
				this.ruleForm1.company = row.company
				this.ruleForm1.bank = row.bank
				this.ruleForm1.bankCard = row.bankCard
			},
			inputSure2(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  if(!(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.ruleForm1.amount))){
					       this.$message.error("必须为非负整数或至多保留两位小数") ;
					       return
					    }
						if(this.ruleForm1.amount <= 0){
							this.$message.error('请输入必须大于0的数值')
							return 
						} 
						if(this.ruleForm1.amount > 100000000){
							this.$message.error('请输入小于等于一亿的值')
							return 
						} 
				    recharge(this.ruleForm1).then((res) => {
				        if (res.code == 200) {
				    		this.$message.success(res.msg);
				    		this.dialogVisible1 = false
							this.ruleForm1.amount = ''
							this.ruleForm1.voucher = ''
							this.getUserList()
				        }else{
				    		 this.$message.error(res.msg);
				    	}
				    }).catch(() => {
				        this.loading = false
				    })
				  } 
				});
			},
			withdraw(row){
				this.dialogVisible2 = true
				this.ruleForm2.id = row.id
				this.ruleForm2.userId = row.userId
				this.ruleForm2.company = row.company
				this.ruleForm2.bank = row.bank
				this.ruleForm2.bankCard = row.bankCard
				this.usableAmount = row.usableAmount
			},
			inputSure3(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  if(!(/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.ruleForm2.amount))){
					       this.$message.error("必须为非负整数或至多保留两位小数") ;
					       return
					    }
						if(this.ruleForm2.amount <= 0){
							this.$message.error('请输入必须大于0的数值')
							return 
						} 
					  	if(this.ruleForm2.amount > 100000000){
					  		this.$message.error('请输入小于等于一亿的值')
					  		return 
					  	} 
					  if(this.ruleForm2.amount > this.usableAmount){
						   this.$message.error('当前可提现金额大于大于余额，请重新确认提现金额');
						   return
					  }
				    cashOut(this.ruleForm2).then((res) => {
				        if (res.code == 200) {
				    		this.$message.success(res.msg);
				    		this.dialogVisible2 = false
							this.ruleForm2.amount = ''
							this.getUserList()
				        }else{
				    		 this.$message.error(res.msg);
				    	}
				    }).catch(() => {
				        this.loading = false
				    })
				  } 
				});
			},
			handleAvatarSuccess(res, file) {
			    if(res.code == 200){
			    	this.ruleForm1.voucher = res.msg
			    }else{
			    	this.$message.error(res.msg);
			    }
			},
			beforeAvatarUpload(file) {
			  const isLt2M = file.size / 1024 / 1024 < 2;
			  if (!isLt2M) {
			    this.$message.error('上传头像图片大小不能超过 2MB!');
			  }
			  return isLt2M;
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

