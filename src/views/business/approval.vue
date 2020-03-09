<template>
	<div>
		<p class="spanTab" v-if="tabSpanHome == 1">业务部 > 内部管理 > <span>我的审批</span></p>
		<p class="spanTab" v-if="tabSpanHome == 5">综合部 > 部门管理 > <span>我的审批</span></p>
		<div class="personHead tabStatus" style="box-shadow: none;margin-bottom: 2px;height: 50px;color: #666;line-height: 50px;font-size: 14px;">
			<span class="statusTabActive">请假申请</span>
			<span>出差申请</span>
			<span>借款申请</span>
			<span>工作请示</span>
			<span>客户拜访</span>
		</div> 
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<!-- <span class="ge-head"><label>标题</label><el-input style="width:150px" v-model="listQuery.name"  size="small" placeholder="请输入标题关键词" clearable></el-input></span> -->
			<span class="ge-head">
				<label>审批类型</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.applyStatus" clearable placeholder="请选择审批状态">
			       <el-option
			         v-for="(item,index) in pendStatus"
			         :key="index"
			         :label="item.dicName"
			         :value="item.dicCode"
			       ></el-option>
			    </el-select>
			</span>
			<!-- <span class="ge-head">
				<label>请假类型</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.leaveType" clearable placeholder="请选择请假类型">
			       <el-option
			         v-for="(item,index) in sendenterprises"
			         :key="index"
			         :label="item.dicName"
			         :value="item.dicCode"
			       ></el-option>
			    </el-select>
			</span> -->
			<span class="ge-head">
				<label>提交时间</label>
			    <el-date-picker size="small" style="width: 240px;" v-model="dateTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
			</span>
			<span class="ge-head">
				<label>审批时间</label>
			    <el-date-picker size="small" style="width: 240px;" v-model="dateTime1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
			</span>
			<span class="ge-head">
				<label>提交人员</label>
				<el-select size="small"  style="width:150px" v-model="listQuery.userId" clearable placeholder="请选择提交人员">
				   <el-option
				     v-for="(item,index) in sendenterprises"
				     :key="index"
				     :label="item.name"
				     :value="item.id"
				   ></el-option>
				</el-select>
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<!-- <span style="margin-left: 40px;cursor: pointer;" >导出</span> -->
			<!-- <span class="btn-b" style="position: absolute;right: 30px;height: 36px;line-height: 22px;top:15px;" @click="addEdit(1)">+ 添加</span> -->
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
				    <el-table-column  align="center" prop="name" label="请假类型">
						<template  slot-scope="scope">
							<span v-if="scope.row.type == 1">事假</span>
							<span v-if="scope.row.type == 2">病假</span>
							<span v-if="scope.row.type == 3">产假</span>
							<span v-if="scope.row.type == 4">年假</span>
							<span v-if="scope.row.type == 5">调休假</span>
						</template>	
					</el-table-column>
				    <el-table-column  align="center" prop="askForLeaveList[0].cause" label="请假原因"></el-table-column>
				    <el-table-column  align="center" prop="askForLeaveList[0].duration" label="请假天数"></el-table-column>
					<el-table-column  align="center" prop="name" label="提交人员"></el-table-column>
					<el-table-column align="center" prop="askForLeaveList[0].status" label="审批类型">
						<template  slot-scope="scope">
							<span v-if="scope.row.status == 0"><span class="weiDot"></span>审批中</span>
							<span v-if="scope.row.status == 1"><span class="greenDot"></span>审批通过</span>
							<span v-if="scope.row.status == 2"><span class="greenDot"></span>拒绝</span>
							<span v-if="scope.row.status == 3"><span class="greenDot"></span>取消</span>
						</template>
					</el-table-column>
					<el-table-column  align="center" prop="createTime" label="提交时间"></el-table-column>
					<el-table-column  align="center" prop="applyTrendsList[0].approveTime" label="审批时间"></el-table-column>
				    <el-table-column align="center" label="操作" width="160">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn blue" @click="detail(scope.row.id)">详情</span>
				    		</div>
				    	</template>
				    </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
<!-- 		    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog> -->
			<!-- <el-dialog title="发起申请审批" :visible.sync="dialogVisible" center :close-on-click-modal="false">
				<div class="apply">
					<span style="margin-left: 1%;" @click="apply">请假申请</span>
					<span>出差申请</span>
					<span>借款申请</span>
					<span style="margin-left: 1%;">客户拜访</span>
					<span>工作请示</span>
				</div>
			</el-dialog> -->
			<el-dialog title="发起申请审批" :visible.sync="centerDialogVisible"  width="50%" center :close-on-click-modal="false">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 60%;margin: 0 auto;">
			    <el-form-item label="备注信息:" prop="content">
			      <el-input type="textarea" v-model="ruleForm.applyTrendsList[0].content" resize="none" placeholder="请输入备注"></el-input>
			    </el-form-item>
				
			    <!-- <el-form-item>
			      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			      <el-button @click="resetForm('ruleForm')">重置</el-button>
			    </el-form-item> -->
			  </el-form>
			  <span slot="footer" class="dialog-footer" >
			    <el-button @click="centerDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			  </span>
			</el-dialog>
			<el-dialog title="请假申请详情" :visible.sync="dialogVisible1"  width="900px" center :close-on-click-modal="false">
				<div class="caoZ" v-if="detailInfo.status == 0">
					<span class="blueColor" @click="addEdit(1)">审批通过</span>
					<span class="blueColor" @click="addEdit(2)">审批否决</span>
				</div>
			  <div class="applove">
				  <span class="one" v-bind:class="{ blueColor:detailInfo.status == 1}">提交审批 <i v-bind:class="{ blueColor:detailInfo.status == 1}"></i></span>
				  <span class="two">等待审批 <i></i></span>
				  <span class="three" v-bind:class="{ blueColor:detailInfo.status != 1}">审批完成</span>
			  </div>
			  <el-form  label-width="100px" class="demo-ruleForm" style="width: 90%;margin: 0 auto;">
			    <div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>基本信息</div>
				<div class="detailInfo">
					<div>
						<label>请假类型：</label>
						<span>
							<i v-if="detailInfo2.type == 1">事假</i>
							<i v-if="detailInfo2.type == 2">病假</i>
							<i v-if="detailInfo2.type == 3">产假</i>
							<i v-if="detailInfo2.type == 4">年假</i>
							<i v-if="detailInfo2.type == 5">调休假</i>
						</span>
					</div>
					<div><label>请假天数：</label><span>{{detailInfo2.duration}}</span></div>
					<div><label>开始时间: </label><span>{{detailInfo2.startTime}}</span></div>
					<div><label>结束时间：</label><span>{{detailInfo2.endTime}}</span></div>
					<div><label>请假原因：</label><span>{{detailInfo2.cause}}</span></div>
				</div>
				<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>审批信息</div>
				<div class="detailInfo">
					<div><label>提交人员：</label><span>{{detailInfo.name}}</span></div>
					<div>
						<label>审批状态：</label>
						<span>
							<i v-if="detailInfo.status == 1">审批通过</i>
							<i v-if="detailInfo.status == 2">拒绝</i>
							<i v-if="detailInfo.status == 3">取消</i>
							<i v-if="detailInfo.status == 0">审批中</i>
						</span>
					</div>
					<div><label>审批人员：</label><span>{{detailInfo1.approveName}}</span></div>
					<!-- <div><label>通知他人: </label><span>{{detailInfo.askForLeaveList[0].startTime}}</span></div> -->
					<div><label>提交时间：</label><span>{{detailInfo1.createTime}}</span></div>
					<div><label>审批时间：</label><span>{{detailInfo1.approveTime}}</span></div>
				</div>
				<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>申请动态</div>
				<div class="flow">
					<div class="Dlist">
						<i class="spot"></i><span class="spotInfo">{{detailInfo1.createTime}}</span>
					</div>
					<div class="Dlist">
						<i></i>
						<div>
							<p>{{detailInfo.name}}</p>
							<p>已提交审批，等待审批 ({{detailInfo1.approveName}})</p>
							<span class="time">{{detailInfo1.createTime}}</span>
						</div>
					</div>
					<div class="Dlist">
						<i></i>
						<div>
							<p>{{detailInfo1.approveName}}</p>
							<p style="color: #00BF6F;">
								<span v-if="detailInfo.status == 1">审批通过</span>
								<span v-if="detailInfo.status == 2">拒绝</span>
								<span v-if="detailInfo.status == 3">取消</span>
								<span v-if="detailInfo.status == 0">审批中</span>
							</p>
							<span class="time">{{detailInfo1.approveTime}}</span>
						</div>
					</div>
				</div>
			  </el-form>
			</el-dialog>
		<!-- </div> -->
	</div>
	
</template>

<script>
	import {sysAskForLeaveFindApprovePage, userFindUserByInfo, findAllApplyStatus, findAllAskForLeaveType, findDeptAndUser, sysAskForLeaveSave, sysAskForLeaveDetail} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					applyStatus:'',
					applyStartDate:'',
					applyEndDate:'',
					approveStartDate:"",
					approveEndDate:"",
					userId:'',
					pageNum:1,
					pageSize:10
				},
				pendStatus:[],
				ruleForm: {
					applyTrendsList:[
						{
							content:''
						},
					],
				  deptId: '',
				  applyUserId:'',
				  type: '1',
				},
				rules: {
				  // content: [
				  //   { required: true, message: '请填写备注信息', trigger: 'blur' }
				  // ]
				},
				sendenterprises:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogVisible1:false,
				dialogImageUrl:"",
				centerDialogVisible:false,
				tabSpan:'',
				count:'',
				detailInfo:"",
				detailInfo1:"",
				detailInfo2:"",
				options:[],
				login:[],
				props: {
					label: 'name',
					children: 'userList',
					value:"id",
					multiple: true
				},
				current:1,
				tabSpanHome:""
			}
		},
		created() {
			this.tabSpanHome = sessionStorage.getItem("qrTab");
			// var info1 = sessionStorage.getItem("zlInfo");
			// var info = JSON.parse(info1)
			// this.listQuery.userId = info.id
			// var isAuth = sessionStorage.getItem("zlIsAuth")
			// if(isAuth == 1){
				this.tabSpan = sessionStorage.getItem("qrDept");
				var info1 = sessionStorage.getItem("qrInfo");
				var info = JSON.parse(info1)
				this.login = info
				// this.ruleForm.deptId = this.tabSpan
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
			getQuery(){
				// console.log(this.tabSpan)
				findAllApplyStatus({deptId:this.tabSpan}).then((res) => {
				    if (res.code == 200) {
				        this.pendStatus = res.data
				    } else {
						this.$message.error(res.msg);
				        this.sendenterprises = []
				    }
				}).catch(() => {
				    this.loading = false
				})
				userFindUserByInfo({deptId:''}).then((res) => {
				    if (res.code == 200) {
				        this.sendenterprises = res.data.data
				    } else {
						this.$message.error(res.msg);
				        this.sendenterprises = []
				    }
				}).catch(() => {
				    this.loading = false
				})
				// findAllAskForLeaveType({deptId:this.tabSpan}).then((res) => {
				//     if (res.code == 200) {
				//         this.sendenterprises = res.data
				//     } else {
				// 		this.$message.error(res.msg);
				//         this.sendenterprises = []
				//     }
				// }).catch(() => {
				//     this.loading = false
				// })
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
			getUserList(){
				this.loading = true
				sysAskForLeaveFindApprovePage(this.listQuery).then((res) => {
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
				this.listQuery.applyStatus = ''
				this.listQuery.applyStartDate = ''
				this.listQuery.applyEndDate = ''
				this.listQuery.approveStartDate = ''
				this.listQuery.approveEndDate = ''
				this.listQuery.userId = ''
				this.handleFilter()
			},
			addEdit(row){
				// this.ruleForm = {}
				this.centerDialogVisible = true
				this.dialogVisible1 = false
				this.ruleForm.deptId = this.tabSpan
				this.ruleForm.applyUserId = this.login.id
				this.ruleForm.type = '1'
				this.ruleForm.status = row
			},
			submitForm(formName) {
			  // this.$refs[formName].validate((valid) => {
			    // if (valid) {
			       sysAskForLeaveSave(this.ruleForm).then((res) => {
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
				 
			    // } else {
			    //   console.log('error submit!!');
			    //   return false;
			    // }
			  // });
			},
			detail(id){
				this.ruleForm.id = id
				sysAskForLeaveDetail(id).then((res) => {
					if (res.code == 200) {
					    // this.$message.success('操作成功');
						this.detailInfo = res.data
						this.detailInfo1 = res.data.applyTrendsList[0]
						this.detailInfo2 = res.data.askForLeaveList[0]
						this.dialogVisible1 = true
					} else {
					    this.$message.error(res.msg);
					}
				}).catch(() => {
				      this.loading = false
				})
			},
			sure(id){
				this.$confirm("确认取消此申请?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    sysAskForLeaveSave({id:id,status:3}).then((res) => {
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
		computed: {
		    dateTime: {
		        get() {
		          if (this.listQuery.applyStartDate && this.listQuery.applyEndDate) {
		             return [this.listQuery.applyStartDate, this.listQuery.applyEndDate]
		           } else {
		             return []
		          }
		        },
		        set(v) {
		          // console.log(v)
		          this.listQuery.applyStartDate = v[0]
		          this.listQuery.applyEndDate = v[1]
		        }
		   },
		   dateTime1: {
		        get() {
		          if (this.listQuery.approveStartDate && this.listQuery.approveEndDate) {
		             return [this.listQuery.approveStartDate, this.listQuery.approveEndDate]
		           } else {
		             return []
		          }
		        },
		        set(v) {
		          // console.log(v)
		          this.listQuery.approveStartDate = v[0]
		          this.listQuery.approveEndDate = v[1]
		        }
		   },
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
	.tabStatus{
		padding: 0 !important;
		span{
			display: inline-block;
			width: 17%;
			text-align: center;
			color: #747474;
			font-size: 16px;
		}
	}
	.statusTabActive{
		background: url(../../assets/back.png) no-repeat;
		background-size: 100% 100%;
		color: white!important;
	}
	.apply{
		margin: 20px auto;
		span{
			display: inline-block;
			text-align: center;
			padding: 15px 0;
			font-size: 16px;
			width: 30%;
			margin-bottom: 40px;
			border: 1px solid #A24534;
			color:#A24534;
			margin-right: 3%;
			border-radius: 5px;
			cursor: pointer;
		}
		span:hover{
			background-color: #A24534;
			color: #fff;
		}
	}
	.detailInfo{
		margin-bottom: 30px;
		div{
			display: inline-block;
			width: 383px;
			label{
				border: 1px solid #999;
				display: inline-block;
				vertical-align: top;
				width: 30%;
				height: 40px;
				padding: 10px 0;
				padding-left: 10px;
				margin-top: -1px;
			}
			span{
				border: 1px solid #999;
				display: inline-block;
				vertical-align: top;
				width: 69%;
				height: 40px;
				padding: 10px 0;
				padding-left: 10px;
				margin-left: -1px;
				margin-top: -1px;
			}
		}
	    div:nth-child(2n){
			margin-left: -6px;
		}
	}
	.flow{
		.Dlist{
			margin-bottom: 30px;
			i{
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 100%;
				border: 1px solid #0079FE;
				margin-right: 10px;
				vertical-align: middle;
			}
			.spot{
				background-color: #0079FE;
			}
			div{
				display: inline-block;
				width: 95%;
				border: 1px solid #999;
				padding: 20px;
				vertical-align: middle;
				position: relative;
				p{
					margin-bottom: 10px;
				}
				.time{
					position: absolute;
					right: 20px;
					top:10px;
					color: #999;
					font-size: 12px;
				}
			}
		}
	}
	.applove{
		width: 90%;
		color: #666;
		font-size: 16px;
		margin:0 auto;
		margin-bottom: 40px;
		margin-top: 20px;
		border: 1px solid #999;
		border-radius: 5px;
		span{
			display: inline-block;
			text-align: center;
			position: relative;
			padding: 10px 0;
			i{
				position: absolute;
				top:6px;
				right: -16px;
				width: 32px;
				height: 32px;
				display: inline-block;
				vertical-align: middle;
				border-left: 0px solid transparent;
				border-right: 1px solid #999;
				border-top: 1px solid #999;
				border-bottom: 0px solid transparent;
				transform: rotate(45deg);
				-ms-transform:rotate(45deg); 	/* IE 9 */
				-moz-transform:rotate(45deg); 	/* Firefox */
				-webkit-transform:rotate(45deg); /* Safari 和 Chrome */
				-o-transform:rotate(45deg);
			}
		}
		
		.one{
			width: 29%;
		}
		.two{
			width: 29%;
		}
		.three{
			width: 31%;
		}
	}
	.blueColor{
		background-color: #0079FE !important;
		color: #fff;
	}
	.caoZ{
		width: 90%;
		margin: 20px 0 auto;
		text-align: right;
		span{
			padding: 10px 20px;
			border-radius: 5px;
			margin-left: 20px;
			cursor: pointer;
		}
	}
	.spotInfo{
		// display: inline-block;
		background-color: #0079FE;
		margin-left: 20px;
		padding: 8px 20px 8px 0px;
		color: #fff;
		&:before{
			display:inline-block;
			content: '';
			border-left: 15px solid transparent;
			border-right: 15px solid #0079FE;
			border-top: 15px solid transparent;
			border-bottom: 15px solid transparent;
			position: relative;
			left: -30px;
			top:10px;
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


