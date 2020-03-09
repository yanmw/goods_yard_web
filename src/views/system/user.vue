<template>
	<div>
		<p class="spanTab">综合部 > 公司管理 > <span>员工管理</span></p>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>员工姓名</label><el-input style="width:150px" v-model="listQuery.name"  size="small" placeholder="请输入员工姓名" clearable></el-input></span>
			<span class="ge-head"><label>员工邮箱</label><el-input style="width:150px" v-model="listQuery.email"  size="small" placeholder="请输入员工邮箱" clearable></el-input></span>
			<span class="ge-head"><label>员工手机号</label><el-input style="width:150px" v-model="listQuery.mobile"  size="small" placeholder="请输入员工手机号" clearable></el-input></span>
			<span class="ge-head">
				<label>所属部门</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.deptId" clearable placeholder="请选择部门">
			       <el-option
			         v-for="(item,index) in sendenterprises"
			         :key="index"
			         :label="item.name"
			         :value="item.id"
			       ></el-option>
			    </el-select>
			</span>
			<!-- <span class="ge-head">
				<label>考核月份</label>
			    <el-date-picker v-model="listQuery.yearMonthStr" type="month" placeholder="选择月" format="yyyy-MM" value-format="yyyy-MM"></el-date-picker>
			</span> -->
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<!-- <span style="margin-left: 40px;cursor: pointer;" >导出</span> -->
			<span class="btn-b" style="margin-left: 50px;" @click="addEdit(1)">+ 添加</span>
		</div>
		<!-- <div class="personHead" style="box-shadow: none;margin-bottom: 20px;height: 50px;color: #666;line-height: 50px;font-size: 14px;">
			<span>共  <span class="greenZhu">{{count}}</span>  个成员</span>
		</div> -->
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
				   <el-table-column  align="center" prop="sex" label="性别">
					   <template slot-scope="scope">
						   <div>
							   <span v-if="scope.row.sex == -1">保密</span>
							   <span v-if="scope.row.sex == 0">女</span>
							   <span v-if="scope.row.sex == 1">男</span>
						   </div>
						</template>
				   </el-table-column>
				   <el-table-column  align="center" prop="deptName" label="部门"></el-table-column>
				   <el-table-column  align="center" prop="roleNames" label="角色"></el-table-column>
				   <el-table-column  align="center" prop="mobile" label="手机号"></el-table-column>
				   <el-table-column  align="center" prop="email" label="邮箱"></el-table-column>
				   <el-table-column  align="center" prop="jobNo" label="工号 "></el-table-column>
				   <el-table-column align="center" label="操作" width="160">
				   	<template slot-scope="scope">
				   		<div class="tableB" >
				   			<span class="tableBtn blue" @click="addEdit(scope.row)">设置</span>
				   			<!-- <span class="tableBtn blue" @click="sure(scope.row.id)">标记已读</span> -->
				   			<span class="tableBtn red" @click="sure(scope.row.id)">删除</span>
				   		</div>
				   	</template>
				   </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog>
			<el-dialog :title="textMap[dialogStatus]" :visible.sync="centerDialogVisible"  width="60%" center :close-on-click-modal="false"  :before-close="closeDiv">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 80%;margin: 0 auto;">
			    <div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>基本信息</div>
			    <div style="width: 70%;margin: 0 auto;">
			    	<el-form-item label="员工姓名:" prop="name">
			    	   <el-input v-model="ruleForm.name" style="width: 100%;" maxlength="20" placeholder="请输入员工姓名"></el-input>
			    	</el-form-item>
			    	<el-form-item label="登录账号:" prop="username">
			    	    <el-input v-model="ruleForm.username" style="width:100%;" maxlength="20" placeholder="请输入登录账号"></el-input>
			    	</el-form-item>
			    	<el-form-item label="登录密码:" prop="password">
			    	     <el-input v-model="ruleForm.password" style="width:100%;" placeholder="请输入登录密码"></el-input>
			    	</el-form-item>
			    	<el-form-item label="所属部门:" prop="deptId">
						<el-select size="small"  style="width:100%;" v-model="ruleForm.deptId" clearable placeholder="请选择部门">
						   <el-option
						     v-for="(item,index) in sendenterprises"
						     :key="index"
						     :label="item.name"
						     :value="item.id"
						   ></el-option>
						</el-select>
			    	</el-form-item>
			    	<el-form-item label="当前职务:" prop="userRole" v-if="edit">
						<el-select size="small"  style="width:100%;" v-model="ruleForm.userRole" clearable placeholder="请选择当前职务">
						   <el-option
						     v-for="(item,index) in roleAll"
						     :key="index"
						     :label="item.name"
						     :value="item.id"
						   ></el-option>
						</el-select>
			    	</el-form-item>
			    	<el-form-item label="员工性别:" prop="sex">
						<el-radio-group v-model="ruleForm.sex" @change="choose">
						  <el-radio label="1" >男</el-radio>
						  <el-radio label="0">女</el-radio>
						  <el-radio label="-1">保密</el-radio>
						</el-radio-group>
			    	</el-form-item>
			    	<el-form-item label="员工生日:" prop="birthday">
						<el-date-picker
						      v-model="ruleForm.birthday"
						      type="date"
						      placeholder="请选择员工生日"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;">
						    </el-date-picker>
			    	</el-form-item>
			    	<el-form-item label="邮箱地址:" prop="email">
			    		 <el-input v-model="ruleForm.email" style="width:100%;" placeholder="请输入邮箱地址"></el-input>
			    	</el-form-item>
			        <el-form-item label="手机号码:" prop="mobile">
			           <el-input v-model="ruleForm.mobile" style="width:100%;"  placeholder="请输入手机号码" maxlength="11"></el-input>
			         </el-form-item>
			    </div>
			    <div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>更多信息</div>
			    <div style="width: 70%;margin: 0 auto;">
			    	<el-form-item label="工号:" prop="jobNo">
			    	   <el-input v-model="ruleForm.jobNo" style="width: 100%;" maxlength="20" placeholder="请输入工号"></el-input>
			    	</el-form-item>
			    	<el-form-item label="籍贯:" prop="birthplace">
			    	    <el-input v-model="ruleForm.birthplace" style="width:100%;" placeholder="请输入籍贯"></el-input>
			    	</el-form-item>
			    	<el-form-item label="毕业院校:" prop="university">
			    	     <el-input v-model="ruleForm.university" style="width:100%;" placeholder="请输入毕业院校"></el-input>
			    	</el-form-item>
			    	<el-form-item label="毕业时间:" prop="graduationDate">
			    	   <el-date-picker
			    	         v-model="ruleForm.graduationDate"
			    	         type="date"
			    	         placeholder="请选择毕业时间"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;">
			    	       </el-date-picker>
			    	</el-form-item>
			    	<el-form-item label="学历:" prop="education">
						<el-select size="small"  style="width:100%;" v-model="ruleForm.education" clearable placeholder="请选择学历">
						   <el-option
						     v-for="(item,index) in education"
						     :key="index"
						     :label="item.dicName"
						     :value="item.dicCode"
						   ></el-option>
						</el-select>
			    	</el-form-item>
			    	<el-form-item label="所学专业:" prop="profession">
			    	    <el-input v-model="ruleForm.profession" style="width:100%;" maxlength="20" placeholder="请输入所学专业"></el-input>
			    	</el-form-item>
			    	<el-form-item label="备注:" prop="remark">
			    		 <el-input type="textarea" v-model="ruleForm.remark" maxlength="200" style="width:100%;" resize="none" placeholder="请输入备注"></el-input>
			    	</el-form-item>
			    </div>
				</el-form>
			  <span slot="footer" class="dialog-footer" >
			    <el-button @click="resetForm('ruleForm')">取 消</el-button>
			    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			  </span>
			</el-dialog>
		<!-- </div> -->
	</div>
	
</template>

<script>
	import {userPage, deptFindTreeAll, userFindAllEdu,roleFindAll, userFindUserByInfo, userDelete, userSave} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					name:'',
					email:'',
					mobile:'',
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
				  birthday:'',
				  birthplace: '',
				  education: '',
				  email: '',
				  graduationDate:'',
				  jobNo:'',
				  mobile:'',
				  name:'',
				  profession:'',
				  sex:1,
				  university:'',
				  username:'',
				  password:'',
				  userRole:'',
				  userRoles:[
					  {
					  	roleId:'',
					  	userId:''
					  },
				  ]
				},
				rules: {
				  birthplace: [
				    { required: true, message: '请输入籍贯', trigger: 'blur' }, 
				  ],
				  deptId: [
				    { required: true, message: '请选择部门', trigger: 'change' }
				  ],
				  education: [
				    { required: true, message: '请选择学历', trigger: 'change' }
				  ],
				  birthday: [
				    {required: true, message: '请选择员工生日', trigger: 'change' }
				  ],
				  graduationDate: [
				    {required: true, message: '请选择毕业时间', trigger: 'change' }
				  ],
				  sex: [
				    {required: true, message: '请选择员工性别', trigger: 'change' }
				  ],
				  // userRole: [
				  //   {required: true, message: '请选择岗位', trigger: 'change' }
				  // ],
				  email: [
				    { required: true, message: '请输入邮箱地址', trigger: 'blur' }
				  ],
				  jobNo: [
				    { required: true, message: '请输入工号', trigger: 'blur' }
				  ],
				  mobile: [
				    { required: true, message: '请输入手机号码', trigger: 'blur' }
				  ],
				  name: [
				    { required: true, message: '请输入员工姓名', trigger: 'blur' }
				  ],
				  profession: [
				    { required: true, message: '请输入所学专业', trigger: 'blur' }
				  ],
				  university: [
				    { required: true, message: '请输入毕业院校', trigger: 'blur' }
				  ],
				  username: [
				    { required: true, message: '请输入登录账号', trigger: 'blur' }
				  ],
				  password: [
				    { required: true, message: '请输入登陆密码', trigger: 'blur' }
				  ],
				  remark: [
				    { required: true, message: '请输入备注', trigger: 'blur' }
				  ]
				},
				sendenterprises:[],
				education:[],
				roleAll:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogImageUrl:"",
				centerDialogVisible:false,
				tabSpan:'',
				count:'',
				edit:false,
				dialogStatus: '',
				textMap: {
				  update: '修改员工',
				  create: ' 新增员工'
				},
			}
		},
		created() {
			// var info1 = sessionStorage.getItem("zlInfo");
			// var info = JSON.parse(info1)
			// this.listQuery.userId = info.id
			// var isAuth = sessionStorage.getItem("zlIsAuth")
			// if(isAuth == 1){
				this.tabSpan = sessionStorage.getItem("qrDept");
				this.ruleForm.deptId = this.tabSpan
				this.getUserList()
				this.getQuery()
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
			choose(row){
				console.log(row)
			},
			getQuery(){
				// console.log(this.tabSpan)
				deptFindTreeAll().then((res) => {
				    if (res.code == 200) {
				        this.sendenterprises = res.data
				    } else {
						this.$message.error(res.msg);
				        this.sendenterprises = []
				    }
				}).catch(() => {
				    this.loading = false
				})
				userFindAllEdu().then((res) => {
				    if (res.code == 200) {
				        this.education = res.data
				    } else {
						this.$message.error(res.msg);
				        this.education = []
				    }
				}).catch(() => {
				    this.loading = false
				})
				roleFindAll().then((res) => {
				    if (res.code == 200) {
				        this.roleAll = res.data
				    } else {
						this.$message.error(res.msg);
				        this.roleAll = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getUserList(){
				this.loading = true
				userPage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.content
				        this.total = res.data.totalSize
						this.count = res.data.content[0].count
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
				this.listQuery.email  = ''
				this.listQuery.mobile  = ''
				this.listQuery.deptId  = ''
				this.handleFilter()
			},
			addEdit(row){
				this.ruleForm = {}
				this.centerDialogVisible = true
				if(row==1){
					this.dialogStatus = 'create'
				}else{
					this.edit = true
					this.dialogStatus = 'update'
					this.ruleForm = row
					console.log(row.userRoles)
					if(row.userRoles.length != 0){
						this.ruleForm.userRole = row.userRoles[0].roleId
					}
					
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
					if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm.mobile))){
					     this.$message.error("请输入正确的手机号") 
							  return
					  }
					  if(!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.ruleForm.email))){
					       this.$message.error("请输入正确的邮箱") 
					  		  return
					    }
					this.ruleForm.userRoles = [{
						'roleId':this.ruleForm.userRole,
						'userId':this.ruleForm.id
					}]
			       userSave(this.ruleForm).then((res) => {
			           if (res.code == 200) {
			           	this.$message.success('操作成功');
			       		 this.$refs[formName].resetFields();
						 this.centerDialogVisible = false
						 this.getUserList()
			           }else{
			           	 this.$message.error(res.msg);
			       		 // this.ruleForm = {}
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
			sure(id){
				this.$confirm("确认删除此条信息?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    userDelete(id).then((res) => {
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
			height: 13px;
			background-color: #256ff8;
			vertical-align: bottom;
			margin-right: 8px;
			position: relative;
			top:-6px;
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
