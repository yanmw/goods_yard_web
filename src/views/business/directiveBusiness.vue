<template>
	<div>
		<p class="spanTab" v-if="tabSpanHome == 1">业务部 > 计划申报 > <span> 发布业务指令</span></p>
		<p class="spanTab" v-if="tabSpanHome == 5">综合部 > 公告指令 > <span> 发布行政指令</span></p>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head">
				<label>指令类型</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.type" clearable placeholder="请选择指令类型">
			       <el-option
				       v-for="(item,index) in sendenterprises"
				       :key="index"
				       :label="item.dicName"
				       :value="item.id"
			       ></el-option>
			    </el-select>
			</span>
			<span class="ge-head">
				<label>状态</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.status" clearable placeholder="请选择状态">
			       <el-option
			         v-for="(item,index) in pendStatus"
			         :key="index"
			         :label="item.name"
			         :value="item.value"
			       ></el-option>
			    </el-select>
			</span>
			<!-- <span class="ge-head"><label>接收人</label><el-input style="width:150px" v-model="listQuery.name"  size="small" placeholder="请输入发布人员" clearable></el-input></span> -->
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<span class="btn-b" style="margin-left: 50px;" @click="issue">+ 发布新指令</span>
		</div>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;height: 50px;color: #666;line-height: 50px;font-size: 14px;">
			分类：&#x3000;
			<span>全部公司  {{allDate.total}}</span>&#x3000;&#x3000;
			<span>已完成  {{allDate.readCount}}</span>&#x3000;&#x3000;
			<span>待处理  <span class="red">{{allDate.unreadCount}}</span></span>
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
				    <el-table-column  align="center" prop="orderNumber" label="指令类型">
						<template  slot-scope="scope">
							<span v-if="scope.row.type == 1">业务指令</span>
							<span v-if="scope.row.type == 2">日常工作</span>
							<span v-if="scope.row.type == 3">工作私信</span>
						</template>
					</el-table-column>
				    <el-table-column  align="center" prop="content" label="内容"></el-table-column>
					<el-table-column  align="center" prop="pound" label="图片">
						<template  slot-scope="scope">
							<span v-if="scope.row.path == null">--</span>
							<span v-else  style="color: #256ff8;cursor: pointer;" @click="bigImg(scope.row.path)">查看图片</span>
						</template>
					</el-table-column>
				    <el-table-column  align="center" prop="createDate" label="接收人">
						<template  slot-scope="scope">
							<div style="display: inline-block;width: 150px;overflow: hidden;white-space: nowrap;cursor: pointer;text-align: left;text-overflow: ellipsis;" @click="checkDetail(scope.row.list)">
								<span v-for='li in scope.row.list' style="display: inline-block;">
									{{li.name}}、
								</span>
							</div>
						</template>
					</el-table-column>
				    <el-table-column align="center" prop="status" label="状态">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.status == 0"><span class="weiDot"></span>未读</span>
				    		<span v-if="scope.row.status == 1"><span class="redDot"></span>已读</span>
				    	</template>
				    </el-table-column>
					<el-table-column  align="center" prop="createTime" label="创建时间" width="180"></el-table-column>
				    <el-table-column align="center" label="操作" width="160">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn blue" @click="edit(scope.row.id)">详情</span>
				    			<!-- <span class="tableBtn blue" @click="sure(scope.row.id)">标记已读</span> -->
				    			<span class="tableBtn red" @click="deleteSure(scope.row.id)">删除</span>
				    		</div>
				    	</template>
				    </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog>
			<el-dialog title="接收人员" :visible.sync="dialogVisible1" :close-on-click-modal="false">
			    <div style="width: 70%; margin: 30px auto;">
					<div style="text-align: right;position: relative;top:-40px;"><span>共 <i style="color: #ff0000;font-size: 16px;">{{notice.length}}</i> 人</span></div>
					<h4 style="color: #00BF6F;">已读人员：</h4>
					<span v-for="li in notice" style="margin-bottom: 10px;display: inline-block;margin-top: 10px;" v-if="li.status == 1">{{li.name}}、</span>
					<h4 style="color: #ff0000;margin-top: 20px;">未读人员：</h4>
					<span v-for="li in notice" style="margin-bottom: 10px;display: inline-block;margin-top: 10px;" v-if="li.status == 0">{{li.name}}、</span>
				</div>
			</el-dialog>
			<el-dialog title="发布业务指令" :visible.sync="centerDialogVisible"  width="50%" center  :before-close="closeDiv" :close-on-click-modal="false">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 80%;margin: 0 auto;">
			    <el-form-item label="指令类型:" prop="type" style="margin-top: 40px;">
					<el-select v-model="ruleForm.type" clearable placeholder="请选择指令类型" style="width: 100%;">
					   <el-option
					       v-for="(item,index) in sendenterprises"
					       :key="index"
					       :label="item.dicName"
					       :value="item.dicCode"
					   ></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="内容:" prop="content" >
			      <el-input type="textarea" v-model="ruleForm.content" resize="none"  maxlength="200" placeholder="请输入内容" style="width: 100%;"></el-input>
			    </el-form-item>
				<el-form-item label="图片 :" prop="pictureFileId">
				 <el-upload
				   class="avatar-uploader"
				   :action="actionUrl"
				   :show-file-list="false"
				   name="name"
				   :headers="myheaders"
				   :on-success="handleAvatarSuccess"
				   :before-upload="beforeAvatarUpload">
				       <img v-if="aa" :src="aa" class="avatar">
				       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  </el-upload>
				</el-form-item>
				<el-form-item label="指定接收人:" prop="userIdList" style="margin-top: 80px;">
					<el-cascader
					    v-model="ruleForm.userIdList"
						style="width: 100%;"
					    :options="options"
						collapse-tags
						:props="props" placeholder="请选择指定接收人"></el-cascader> 
				</el-form-item>
			  </el-form>
			  <span slot="footer" class="dialog-footer" >
			    <el-button @click="resetForm('ruleForm')">取 消</el-button>
			    <el-button type="primary" style="background-color: #00BF6F;" @click="submitForm('ruleForm')">确 定</el-button>
			  </span>
			</el-dialog>
			<el-dialog title="查看业务指令详情" :visible.sync="dialogVisible2" :close-on-click-modal="false">
			    <el-form  label-width="100px" class="demo-ruleForm" style="width: 460px;margin: 0 auto;">
			       <el-form-item label="指令类型 :">
			         <span style="font-size: 16px;color: #333;">
						 <span v-if="ruleForm1.type == 1">业务指令</span>
						 <span v-if="ruleForm1.type == 2">日常工作</span>
						 <span v-if="ruleForm1.type == 3">工作私信</span>
					 </span>
			       </el-form-item>
			    	<el-form-item label="内容 :">
			    	  <span style="font-size: 16px;color: #333;">{{ruleForm1.content}}</span>
			    	</el-form-item>
					<el-form-item label="图片 :" prop="pictureFileId">
					  <el-image 
					       style="width: 140px; height: 140px"
					       :src="ruleForm1.path" 
					       :preview-src-list="srcList">
					    </el-image>
					</el-form-item>
					<el-form-item label="指定接收人:" prop="userIdList" >
						<span style="font-size: 16px;color: #333;">
							<span v-for="li in ruleForm1.list" style="margin-bottom: 10px;display: inline-block;">{{li.name}}、</span>
						</span>
					</el-form-item>
				</el-form>
			</el-dialog>
			
		<!-- </div> -->
	</div>
	
</template>

<script>
	import { baseUrl } from '@/util/ajax'
	import Cookies from 'js-cookie'
	import {findInstructionType, sysInstructionPageCheck, sysInstructionDetail, sysInstructionDelete, sysInstructionSave, sysInstructionFindCount, findDeptAndUser } from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		computed: {
			myheaders() {
				return{
					"token": this.token // 直接从本地获取token就行
				}
			}
		},
		data(){
			return{
				listQuery:{
				    "promulgatorId": '',
				    "status": "",
				    "type": "",
					pageNum:1,
					pageSize:10
				},
				pendStatus:[
					{name:'全部',value:''},
					{name:'未读',value:0},
					{name:'已读',value:1}
				],
				listuser:[],
				actionUrl:'',
				sendenterprises:[],
				total:0,
				aa:'',
				loading:false,
				tableData:[],
				allDate:'',
				dialogVisible:false,
				dialogVisible1:false,
				dialogVisible2:false,
				centerDialogVisible:false,
				notice:'',
				dialogImageUrl:"",
				login:'',
				ruleForm: {
				  deptId:'',
				  userId:'',
				  status: 0,
				  content: '',
				  type: '',
                  pictureFileId:'',
				  userIdList:[]
				},
				rules: {
				  type: [
				    { required: true, message: '请选择指令类型', trigger: 'change' }
				  ],
				  userIdList: [
				    { required: true, message: '请选择指定接收人', trigger: 'change' }
				  ],
				  content: [
				    { required: true, message: '请输入内容', trigger: 'blur' }
				  ]
				},
				ruleForm1:{
					userIdList:[]
				},
				address:[],
				options:[],
				srcList:[],
				props: {
					label: 'name',
					children: 'userList',
					value:"id",
					multiple: true
				},
				token:'',
				tabSpan:'',
				deleted:{
					idList:[]
				},
				tabSpanHome:''
			}
		},
		
		created() {
			this.tabSpanHome = sessionStorage.getItem("qrTab");
			var info1 = sessionStorage.getItem("qrInfo");
			var info = JSON.parse(info1)
			this.login = info
			this.actionUrl = baseUrl + '/qr/sysFile/upload'
            this.token = Cookies.get('qrToken')
			this.tabSpan = sessionStorage.getItem("qrDept");
				this.getQuery()
				// this.getAll()
				this.getUserList()
		},
		methods:{
			closeDiv(){
				this.$nextTick(() => {
					 this.$refs["ruleForm"].resetFields();      
					  this.centerDialogVisible = false
					  this.getUserList()
					  this.aa = ''
					 // this.$refs.adduserform.resetFields();
				 });
			},
			getQuery(){
				findInstructionType().then((res) => {
				    if (res.code == 200) {
				        this.sendenterprises = res.data
				    } else {
						this.$message.error(res.msg);
				        this.sendenterprises = []
				    }
				}).catch(() => {
				    this.loading = false
				})
				findDeptAndUser().then((res) => {
				    if (res.code == 200) {
				        this.options = res.data
				    } else {
						this.$message.error(res.msg);
				        this.options = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getAll(){
				sysInstructionFindCount(this.login.id).then((res) => {
				    if (res.code == 200) {
				        this.allDate = res.data
				    } else {
						this.$message.error(res.msg);
				        this.allDate = ''
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getUserList(){
				sysInstructionFindCount(this.login.id).then((res) => {
				    if (res.code == 200) {
				        this.allDate = res.data
				    } else {
						this.$message.error(res.msg);
				        this.allDate = ''
				    }
				}).catch(() => {
				    this.loading = false
				})
				this.loading = true
				this.listQuery.promulgatorId = this.login.id
				sysInstructionPageCheck(this.listQuery).then((res) => {
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
			checkDetail(row){
				this.notice = row
				this.dialogVisible1 = true
			},
			reset(){
				this.listQuery.type = ''
				this.listQuery.status = ''
				this.handleFilter()
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
			},
			edit(id){
				this.srcList = []
				sysInstructionDetail(id).then((res) => {
				    if (res.code == 200) {
						this.dialogVisible2 = true
						this.ruleForm1 = res.data
						this.srcList.push(res.data.path)
				    }else{
				    	 this.$message.error(res.msg);
						 this.ruleForm1 = {}
				    }
				}).catch(() => {
				    // this.loading = false
				})
			},
			issue(){
				// this.ruleForm = {}
				this.centerDialogVisible = true
				this.ruleForm.deptId = this.tabSpan
				this.ruleForm.userId = this.login.id
				this.ruleForm.status = 0
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  var value = this.ruleForm.userIdList
					  this.ruleForm.userIdList = []
					  for(var i=0;i<value.length;i++){
					  	var str = value[i][1]
					  	this.ruleForm.userIdList.push(str)
					  }
					  sysInstructionSave(this.ruleForm).then((res) => {
				        if (res.code == 200) {
				        	this.$message.success('操作成功');
				        	this.centerDialogVisible = false
				        	this.getUserList()
							this.aa = ''
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
			resetForm(formName){
				this.centerDialogVisible = false
				this.$refs.ruleForm.resetFields();
				this.aa = ''
				this.getUserList()
			},
			deleteSure(id){
				this.deleted.idList = []
				this.$confirm("确认删除此条指令?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    sysInstructionDelete(id).then((res) => {
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
			handleAvatarSuccess(res, file) {
			    if(res.code == 200){
			    	this.ruleForm.pictureFileId = res.data.id
			    	this.aa = res.data.path
					// this.ruleForm.pictureFileId = file.name
					console.log(file)
			    }else{
			    	this.$message.error(res.msg);
			    }
			},
			beforeAvatarUpload(file) {
			  const isLt2M = file.size / 1024 / 1024 < 8;
			  if (!isLt2M) {
			    this.$message.error('上传图片大小不能超过 8MB!');
			  }
			  return isLt2M;
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
