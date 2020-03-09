<template>
	<div>
		<p class="spanTab">综合部 > 公司管理 > <span>组织架构</span></p>
		<div class="person" style="padding: 80px 0;">
			<img style="width: 40%;margin-left:30%;" src="../../assets/none.png" alt="">
		</div>
		<!-- <div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head">
				<label>部门名称</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.deptId" clearable placeholder="请选择部门">
			       <el-option
			         v-for="(item,index) in sendenterprises"
			         :key="index"
			         :label="item.name"
			         :value="item.id"
			       ></el-option>
			    </el-select>
			</span>
			<!-- <span class="ge-head"><label>发布人员</label><el-input style="width:150px" v-model="listQuery.columnFilters.name.value"  size="small" placeholder="请输入发布人员" clearable></el-input></span> -->
			<!-- <span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<span class="btn-b" style="position: absolute;right: 30px;height: 36px;line-height: 22px;top:15px;" @click="add('ruleForm')">+新增部门</span>
		</div> --> 
		<!-- <div class="person"> -->
			<!-- <p class="personTit" style="padding-top: 0px;"> <span class="export">导出表格</span></p> -->
			<!-- <div class="blueTable" style="width: 98.5%;border-radius: 5px;">
				<el-table :data="tableData" :header-cell-style="{background:'#00BF6F',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
				    <el-table-column  align="center" type="index" label="序号">
						<template slot-scope="scope">
						    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
						</template>
					</el-table-column>
				    <el-table-column  align="center" prop="title" label="姓名"></el-table-column>
				    <el-table-column  align="center" prop="name" label="性别"></el-table-column>
				    <el-table-column  align="center" prop="name" label="部门"></el-table-column>
				    <el-table-column  align="center" prop="name" label="岗位名称"></el-table-column>
				    <el-table-column  align="center" prop="name" label="手机"></el-table-column>
				    <el-table-column  align="center" prop="name" label="账号状态"></el-table-column>
				    <el-table-column align="center" prop="status" label="在线状态">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.type == 1">企业动态</span>
				    		<span v-if="scope.row.type == 2">内部分享</span>
							<span v-if="scope.row.type == 3">热点新闻</span>
				    	</template>
				    </el-table-column> -->
				  <!--  <el-table-column  align="center" prop="createDate" label="接收人员" width="150">
						<template  slot-scope="scope">
							<div style="display: inline-block;width: 150px;overflow: hidden;white-space: nowrap;cursor: pointer;text-align: left;margin-top: 5px;" @click="checkDetail(scope.row.list)">
								<span v-for='li in scope.row.list' >
									{{li.name}}、
								</span>
							</div>
						</template>
					</el-table-column>
				    <el-table-column align="center" prop="status" label="阅读状态">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.status == 0"><span class="weiDot"></span>未读</span>
				    		<span v-if="scope.row.status == 1"><span class="redDot"></span>已读</span>
				    	</template>
				    </el-table-column> -->
					<!-- <el-table-column  align="center" prop="createTime" label="最后登录" width="160px"></el-table-column>
				    <el-table-column align="center" label="操作"  width="160px">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn blue" @click="add(scope.row)">设置</span>
				    			<span class="tableBtn red" @click="deleteSure(scope.row.id)">删除</span>
				    		</div>
				    	</template>
				    </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		   <!-- <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog> --> 
			<el-dialog title="新增部门" :visible.sync="dialogVisible" :close-on-click-modal="false">
			    <div style="width: 70%; margin: 30px auto;">
					<span v-for="li in notice" style="margin-bottom: 10px;display: inline-block;">{{li.name}}、</span>
				</div>
			</el-dialog>
			<el-dialog title="发布公告" :visible.sync="centerDialogVisible"  width="50%" center :close-on-click-modal="false">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 60%;margin: 0 auto;">
			    <el-form-item label=" 部门名称:" prop="title">
			      <el-input v-model="ruleForm.title" maxlength="20" placeholder="请输入 部门名称"></el-input>
			    </el-form-item>
				<el-form-item label="负责人:" prop="type">
			      <el-select v-model="ruleForm.type" placeholder="请选择负责人" style="width: 100%;">
			        <el-option
			          v-for="(item,index) in sendenterprises"
			          :key="index"
			          :label="item.dicName"
			          :value="item.dicCode"
			        ></el-option>
			      </el-select>
			    </el-form-item>
				 <!-- <el-form-item label="接收人员:" prop="isAll">
				    <el-radio-group v-model="ruleForm.isAll" @change="choose">
				      <el-radio :label="1" >全部人员</el-radio>
				      <el-radio :label="0">指定人员</el-radio>
				    </el-radio-group>
				  </el-form-item> -->
				  <el-form-item label="部门人员:">
				  	<el-cascader
				  	    v-model="ruleForm.userIdList"
				  	    :options="options"
						collapse-tags
				  		:props="props" placeholder="请选择部门人员"></el-cascader> 
				  </el-form-item>
			    <el-form-item label="部门描述:" prop="content">
			      <el-input type="textarea" v-model="ruleForm.content" resize="none" maxlength="200" placeholder="请输入部门描述"></el-input>
			    </el-form-item>
			    <!-- <el-form-item>
			      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			      <el-button @click="resetForm('ruleForm')">重置</el-button>
			    </el-form-item> -->
			  </el-form>
			  <span slot="footer" class="dialog-footer" >
			    <el-button @click="resetForm('ruleForm')">取 消</el-button>
			    <el-button type="primary" style="background-color: #00BF6F;" @click="submitForm('ruleForm')">确 定</el-button>
			  </span>
			</el-dialog>
		<!-- </div> -->
	</div>
	
</template>

<script>
	import {sysAnnouncementPage, noticeDelete, deptFindTreeAll, findDeptAndUser, sysAnnouncementSave} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					 "columnFilters": {
					        "title": {
					            "value": ""
					        },
					        "userId": {//当前登陆人id
					            "value": ''
					        },
					        "status": {
					            "value": ""
					        },
					        "startDate": {
					            "value": ""
					        },
					        "endDate": {
					            "value": ""
					        }
					    },
					pageNum:1,
					pageSize:10
				},
				pendStatus:[
					{name:'未读',value:0},
					{name:'已读',value:1},
				],
				ruleForm: {
				  type: '',
				  title: '',
                  isAll:1,
				  content:'',
				  deptId:'',
				  userId:'',
				  userIdList:[]
				},
				rules: {
				  type: [
				    { required: true, message: '请选择公告分类', trigger: 'change' }
				  ],
                  userIdList: [
				    { required: true, message: '请选择指定接收人', trigger: 'change' }
				  ],
				  title: [
				    { required: true, message: '请填写公告标题', trigger: 'blur' }
				  ],
				  isAll: [
				    {  required: true, required: true, message: '请至少选择一个接收类', trigger: 'change' }
				  ],
				  content: [
				    { required: true, message: '请填写公告内容', trigger: 'blur' }
				  ]
				},
				address:[],
				notice:[],
				sendenterprises:[],
				options:[],
				total:0,
				loading:false,
				tableData:[],
				centerDialogVisible:false,
				dialogVisible:false,
				ashow:false,
				dialogImageUrl:"",
				login:[],
				props: {
					label: 'name',
					children: 'userList',
					value:"id",
					multiple: true
				},
			}
		},
		created() {
			var info1 = sessionStorage.getItem("qrInfo");
			var info = JSON.parse(info1)
			this.login = info
			this.tabSpan = sessionStorage.getItem("qrDept");
			// this.getUserList()
			
			// var info1 = sessionStorage.getItem("zlInfo");
			// var info = JSON.parse(info1)
			// this.listQuery.userId = info.id
			// var isAuth = sessionStorage.getItem("zlIsAuth")
			// if(isAuth == 1){
				// this.getQuery()
			// 	this.getUserList()
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
			getQuery(){
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
				// findDeptAndUser().then((res) => {
				//     if (res.code == 200) {
				//         this.options = res.data
				//     } else {
				// 		this.$message.error(res.msg);
				//         this.options = []
				//     }
				// }).catch(() => {
				//     this.loading = false
				// })
			},
			choose(row){
				this.ruleForm.userIdList = []
				if(row == 1){
					this.ashow = false
					this.ruleForm.isAll = 1
				}else{
					this.ashow = true
					this.ruleForm.isAll = 0
				}
			},
			getUserList(){
				this.loading = true 
				this.listQuery.columnFilters.userId.value  = this.login.id
				sysAnnouncementPage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.content
				        this.total = res.data.totalSize
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
				this.listQuery.columnFilters.status.value  = ''
				this.listQuery.columnFilters.title.value  = ''
				this.listQuery.columnFilters.startDate.value  = ''
				this.listQuery.columnFilters.endDate.value  = ''
				this.handleFilter()
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
			},
			checkDetail(row){
				this.notice = row
				this.dialogVisible = true
			},
			add(){
				this.ruleForm = {}
				this.centerDialogVisible = true
				this.ruleForm.deptId = this.tabSpan
				this.ruleForm.userId = this.login.id
				this.ashow = false
			},
			submitForm(formName){
				if(this.ruleForm.isAll == 0){
					console.log(this.ruleForm.userIdList)
					if(this.ruleForm.userIdList.length == 0){
						this.$message.error('指定人员不得为空');
						return false;
					}
				}
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  var value = this.ruleForm.userIdList
					  this.ruleForm.userIdList = []
					  for(var i=0;i<value.length;i++){
					  	var str = value[i][1]
					  	this.ruleForm.userIdList.push(str)
					  }
					  sysAnnouncementSave(this.ruleForm).then((res) => {
				        if (res.code == 200) {
				        	this.$message.success('操作成功');
				        	this.centerDialogVisible = false
				        	this.getUserList()
							this.$refs.ruleForm.resetFields();
				        }else{
				        	 this.$message.error(res.msg);
							 this.ruleForm = {}
				        }
				    }).catch(() => {
				        // this.loading = false
				    })
				   }
				})
			},
			resetForm(){
				this.centerDialogVisible = false
				this.dialogVisible2 = false
			},
			deleteSure(id){
				this.$confirm("确认删除此条公告?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    noticeDelete(id).then((res) => {
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
		},
		computed: {
		    dateTime: {
		        get() {
		          if (this.listQuery.columnFilters.startDate.value && this.listQuery.columnFilters.endDate.value) {
		             return [this.listQuery.columnFilters.startDate.value, this.listQuery.columnFilters.endDate.value]
		           } else {
		             return []
		          }
		        },
		        set(v) {
		          // console.log(v)
		          this.listQuery.columnFilters.startDate.value = v[0]
		          this.listQuery.columnFilters.endDate.value = v[1]
		        }
		   }
		}
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
			top:-2px;
		}
		span{
			position: absolute;
			right: 10px;
			top:10px;
			color: #2589ff;
			font-size: 12px;
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
