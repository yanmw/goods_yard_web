<template>
	<div>
		<p class="spanTab" v-if="tabSpanHome == 1">业务部 > 内部管理 > <span>部门人员</span></p>
		<p class="spanTab" v-if="tabSpanHome == 5">综合部 > 部门管理 > <span>部门人员</span></p>
		<!-- <div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>员工姓名</label><el-input style="width:150px" v-model="listQuery.name"  size="small" placeholder="请输入标题关键词" clearable></el-input></span>
			<span class="ge-head">
				<label>考核月份</label>
			    <el-date-picker v-model="listQuery.yearMonthStr" type="month" placeholder="选择月" format="yyyy-MM" value-format="yyyy-MM"></el-date-picker>
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<span style="margin-left: 40px;cursor: pointer;" >导出</span>
			<span class="btn-b" style="position: absolute;right: 30px;height: 36px;line-height: 22px;top:15px;" @click="addEdit(1)">+ 添加</span>
		</div> -->
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;height: 50px;color: #666;line-height: 50px;font-size: 14px;">
			<span>共  <span class="greenZhu">{{count}}</span>  个成员</span>
		</div> 
		<!-- <div class="person"> -->
			<!-- <p class="personTit" style="padding-top: 0px;"> <span class="export">导出表格</span></p> -->
			<div class="blueTable" style="width: 98.5%;border-radius: 5px;">
				<el-table :data="tableData" :header-cell-style="{background:'#00BF6F',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
				    <el-table-column  align="center" type="index" label="序号">
						<template slot-scope="scope">
						    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
						</template>
					</el-table-column>
				    <el-table-column  align="center" prop="name" label="姓名"></el-table-column>
				    <!-- <el-table-column  align="center" prop="roleNames" label="岗位"></el-table-column> -->
				    <el-table-column  align="center" prop="mobile" label="联系电话"></el-table-column>
				    <!-- <el-table-column  align="center" prop="score" label="设置等级"></el-table-column> -->
				    <el-table-column  align="center" prop="createTime" label="添加时间"></el-table-column>
				    <el-table-column align="center" label="操作" width="200">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<!-- <span class="tableBtn blue" @click="addEdit(scope.row)">设置等级</span> -->
				    			<span class="tableBtn blue" @click="detail(scope.row.id)">查看详情</span>
				    		</div>
				    	</template>
				    </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog>
			<el-dialog title="添加考核" :visible.sync="centerDialogVisible"  width="50%" center :close-on-click-modal="false"  :before-close="closeDiv">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 60%;margin: 0 auto;">
			    <el-form-item label="部门人员:" prop="userId">
			      <el-select v-model="ruleForm.userId" placeholder="请选择活动区域"  style="width: 100%;">
			        <el-option
			            v-for="(item,index) in sendenterprises"
			            :key="index"
			            :label="item.name"
			            :value="item.id"
			        ></el-option>
			      </el-select>
			    </el-form-item>
			   <!-- <el-form-item label="岗位等级:" prop="name">
			      <el-input v-model="ruleForm.name" style="width: 56%;"></el-input>
			    </el-form-item> -->
				<el-form-item label="考核月份:" prop="yearMonthStr">
					<el-date-picker
					      v-model="ruleForm.yearMonthStr"
					      type="month"
					      placeholder="选择月份"  format="yyyy-MM" value-format="yyyy-MM" style="width: 100%;">
					    </el-date-picker>
				</el-form-item>
				<el-form-item label="考核分值:" prop="score">
				  <el-input v-model="ruleForm.score" style="width: 100%;"></el-input>
				</el-form-item>
			    <el-form-item label="备注:" prop="remark">
			      <el-input type="textarea" v-model="ruleForm.remark" resize="none"></el-input>
			    </el-form-item>
			    <!-- <el-form-item>
			      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			      <el-button @click="resetForm('ruleForm')">重置</el-button>
			    </el-form-item> -->
			  </el-form>
			  <span slot="footer" class="dialog-footer" >
			    <el-button @click="resetForm('ruleForm')">取 消</el-button>
			    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			  </span>
			</el-dialog>
			<el-dialog title="查看员工" :visible.sync="dialogVisible"  width="60%" center :close-on-click-modal="false">
			  <el-form  label-width="100px" class="demo-ruleForm" style="width: 90%;margin: 0 auto;">
			    <div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>基本信息</div>
				<div style="width: 70%;margin: 0 auto;">
					<el-form-item label="员工姓名:" prop="name">
					   <el-input v-model="detailInfo.name" style="width: 100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="登录账号:" prop="name">
					    <el-input v-model="detailInfo.username" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="登录密码:" prop="name">
					     <el-input v-model="detailInfo.password" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="所属部门:" prop="name">
					   <el-input v-model="detailInfo.deptName" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="当前职务:" prop="name">
					   <el-input v-model="detailInfo.roleNames" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="员工性别:" prop="name">
						<span v-if="detailInfo.sex == 1">男</span>
						<span v-if="detailInfo.sex == 0">女</span>
						<span v-if="detailInfo.sex == -1">保密</span>
					</el-form-item>
					<el-form-item label="员工生日:" prop="name">
					    <el-input v-model="detailInfo.birthday" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="邮箱地址:" prop="name">
						 <el-input v-model="detailInfo.email" style="width:100%;" readonly></el-input>
					</el-form-item>
				    <el-form-item label="手机号码:" prop="name">
				       <el-input v-model="detailInfo.mobile" style="width:100%;" readonly></el-input>
				     </el-form-item>
				</div>
				<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>更多信息</div>
				<div style="width: 70%;margin: 0 auto;">
					<el-form-item label="工号:" prop="name">
					   <el-input v-model="detailInfo.jobNo" style="width: 100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="籍贯:" prop="name">
					    <el-input v-model="detailInfo.birthplace" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="毕业院校:" prop="name">
					     <el-input v-model="detailInfo.university" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="毕业时间:" prop="name">
					   <el-input v-model="detailInfo.graduationDate" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="学历:" prop="name">
					   <el-input v-model="detailInfo.educationName" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="所学专业:" prop="name">
					    <el-input v-model="detailInfo.profession" style="width:100%;" readonly></el-input>
					</el-form-item>
					<el-form-item label="备注:" prop="name">
						 <el-input type="textarea" v-model="detailInfo.remark" style="width:100%;" resize="none" readonly></el-input>
					</el-form-item>
				</div>
			  </el-form>
			  <span slot="footer" class="dialog-footer" >
			    <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
			    <!-- <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button> -->
			  </span>
			</el-dialog>
		<!-- </div> -->
	</div>
	
</template>

<script>
	import {userPage, userCountDept, userFindUserByInfo, userFindUserById, sysPerformanceDelete, sysPerformanceSave} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					deptId:'',
					pageNum:1,
					pageSize:10
				},
				pendStatus:[
					{name:'未上传',value:0},
					{name:'待审核',value:1},
					{name:'已确认',value:2}
				],
				ruleForm: {
				  id:'',
				  deptId: '',
				  remark: '',
				  deptSort:'',
				  score: '',
				  userId: '',
				  yearMonthStr: '',
				},
				rules: {
				  score: [
				    { required: true, message: '请输入考核分值', trigger: 'blur' }, 
				  ],
				  userId: [
				    { required: true, message: '请选择部门人员', trigger: 'change' }
				  ],
				  yearMonthStr: [
				    {required: true, message: '请选择日期', trigger: 'change' }
				  ],
				  remark: [
				    { required: true, message: '请填写备注', trigger: 'blur' }
				  ]
				},
				sendenterprises:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogImageUrl:"",
				centerDialogVisible:false,
				tabSpan:'',
				count:'',
				detailInfo:'',
				tabSpanHome:''
			}
		},
		created() {
			this.tabSpanHome = sessionStorage.getItem("qrTab");
			console.log(this.tabSpanHome )
			// var info1 = sessionStorage.getItem("zlInfo");
			// var info = JSON.parse(info1)
			// this.listQuery.userId = info.id
			// var isAuth = sessionStorage.getItem("zlIsAuth")
			// if(isAuth == 1){
				this.tabSpan = sessionStorage.getItem("qrDept");
				this.listQuery.deptId = this.tabSpan
				this.getUserList()
				// this.getQuery()
			// }else{
			// 	this.$confirm('还未认证请您前去认证, 是否继续?', '提示', {
			// 	  confirmButtonText: '确定',
			// 	  cancelButtonText: '取消',
			// 	  type: 'warning'
			// 	}).then(() => {
			// 	  this.$message({
			// 	    type: 'success',
			// 	    message: '即将跳转认证'
			// 	  });
			// 	 this.$router.push("authentication")
			// 	})
			// }
		},
		methods:{
			closeDiv(){
				this.$nextTick(() => {
					 this.$refs["ruleForm"].resetFields();      
					  this.centerDialogVisible = false
					  this.getUserList()
					 // this.$refs.adduserform.resetFields();
				 });
			},
			getQuery(){
				// console.log(this.tabSpan)
				// userFindUserByInfo({deptId:this.tabSpan}).then((res) => {
				//     if (res.code == 200) {
				//         this.sendenterprises = res.data.data
				//     } else {
				// 		this.$message.error(res.msg);
				//         this.sendenterprises = []
				//     }
				// }).catch(() => {
				//     this.loading = false
				// })
				// userCountDept(this.tabSpan).then((res) => {
				//     if (res.code == 200) {
				//         this.count = res.data
				//     } else {
				// 		this.$message.error(res.msg);
				//         this.count = []
				//     }
				// }).catch(() => {
				//     this.loading = false
				// })
			},
			getUserList(){
				userCountDept(this.tabSpan).then((res) => {
				    if (res.code == 200) {
				        this.count = res.data
				    } else {
						this.$message.error(res.msg);
				        this.count = []
				    }
				}).catch(() => {
				    this.loading = false
				})
				this.loading = true
				userPage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.content
				        this.total = res.data.totalSize
						// this.count = res.data.content[0].count
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
			handleFilter() {
				this.listQuery.pageNum = 1
				this.getUserList()
			},
			reset(){
				this.listQuery.name = ''
				this.listQuery.yearMonthStr  = ''
				this.handleFilter()
			},
			addEdit(row){
				this.ruleForm = {}
				this.centerDialogVisible = true
				if(row==1){
					
				}else{
					this.ruleForm = row
				}
			},
			resetForm(formName){
				this.centerDialogVisible = false
				this.$refs.ruleForm.resetFields();
				this.getUserList()
			},
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
			       sysPerformanceSave(this.ruleForm).then((res) => {
			           if (res.code == 200) {
			           	this.$message.success('操作成功');
			       		 this.$refs[formName].resetFields();
						 this.centerDialogVisible = false
						 this.getUserList()
			           }else{
			           	 this.$message.error(res.msg);
			       		 this.ruleForm = {}
			           }
			       }).catch(() => {
			           // this.loading = false
			       })
				 
			    } else {
			      console.log('error submit!!');
			      return false;
			    }
			  });
			},
			detail(id){
				userFindUserById(id).then((res) => {
					if (res.code == 200) {
					    // this.$message.success('操作成功');
						console.log(res.data)
						this.dialogVisible = true
					    this.detailInfo = res.data
						console.log(this.detailInfo)
					} else {
					    this.$message.error(res.msg);
					}
				}).catch(() => {
				      this.loading = false
				})
			},
			sure(id){
				this.$confirm("确认删除此条信息?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    sysPerformanceDelete(id).then((res) => {
				    	if (res.code == 200) {
				    	    this.$message.success('操作成功');
				    	    this.getUserList()
				    	} else {
				    	    this.$message.error(res.msg);
				    	}
				    }).catch(() => {
				          this.loading = false
				    })
				}).catch(() => {})
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
			}
		},
		
	}
</script>

<style lang="less" scoped>
	.person{
		background-color: #fff;
		box-shadow: 0px 2px 8px 0px 
				rgba(54, 196, 209, 0.14);
		border-radius: 10px;
	}
	.export{
		position: absolute;
		right: 20px;
	}
	.authTit{
		position: relative;
		margin-bottom: 20px;
		i{
			display: inline-block;
			width: 3px;
			height: 15px;
			background-color: #256ff8;
			vertical-align: bottom;
			margin-right: 8px;
			position: relative;
			top:-5px;
		}
		span{
			position: absolute;
			right: 10px;
			top:10px;
			color: #2589ff;
			font-size: 12px;
		}
	}
	.dialog-footer{
		
		button{
			width: 200px;
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

