<template>
	<div>
		<p class="spanTab" v-if="tabSpanHome == 1">业务部 > 计划申报 > <span> 接受业务指令</span></p>
		<p class="spanTab" v-if="tabSpanHome == 5">综合部 > 公告指令 > <span> 接受任务指派</span></p>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head">
				<label>指令类型</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.type" clearable placeholder="请选择指令类型">
			       <el-option
			         v-for="(item,index) in sendenterprises"
			         :key="index"
			         :label="item.dicName"
			         :value="item.dicCode"
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
			<!-- <span class="ge-head"><label>接收人</label><el-input style="width:150px" v-model="listQuery.userId"  size="small" placeholder="请输入接收人" clearable></el-input></span> -->
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<!-- <span class="btn-b" style="position: absolute;right: 30px;height: 36px;line-height: 22px;top:15px;" >+ 发布新指令</span> -->
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
				    <el-table-column  align="center" prop="name" label="发布人">
				    </el-table-column>
				    <el-table-column align="center" prop="status" label="状态">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.list[0].status == 0"><span class="weiDot"></span>未读</span>
				    		<span v-if="scope.row.list[0].status == 1"><span class="redDot"></span>已读</span>
				    	</template>
				    </el-table-column>
				    <el-table-column  align="center" prop="createTime" label="创建时间" width="180"></el-table-column>
				    <el-table-column align="center" label="操作" width="180">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn blue" @click="sureD(scope.row.id,scope.row.list[0].id)">回执</span>
				    			<span class="tableBtn blue" v-if="scope.row.list[0].status == 0" @click="sure(scope.row.id,scope.row.list[0].id)">标记完成</span>
				    			<!-- <span class="tableBtn red" @click="sure(scope.row.id)">删除</span> -->
				    		</div>
				    	</template>
				    </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog>
			<el-dialog title="回执" :visible.sync="centerDialogVisible"  width="50%" center :close-on-click-modal="false"  :before-close="closeDiv">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 80%;margin: 0 auto;">
			    <el-form-item label="回执内容:" prop="receiptContent" style="margin-top: 40px;">
			      <el-input type="textarea" v-model="ruleForm.receiptContent" resize="none" col="6" maxlength="200" style="width: 100%;"></el-input>
			    </el-form-item>
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
	import {sysInstructionReceiverPageCheck, findInstructionType, sysInstructionReceiverReply, sysInstructionReceiverFindCount} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					type:'',
					status:'',
					userId:'',
					pageNum:1,
					pageSize:10
				},
				ruleForm:{
					id:'',
					receiverId:'',
					receiptContent:''
				},
				rules: {
				  receiptContent: [
				    { required: true, message: '请填写回执内容', trigger: 'blur' }
				  ]
				},
				pendStatus:[
					{name:'全部',value:''},
					{name:'未读',value:0},
					{name:'已读',value:1}
				],
				sendenterprises:[],
				total:0,
				loading:false,
				tableData:[],
				allDate:'',
				dialogVisible:false,
				centerDialogVisible:false,
				dialogImageUrl:"",
				login:'',
				tabSpanHome:''
			}
		},
		created() {
			this.tabSpanHome = sessionStorage.getItem("qrTab");
			var info1 = sessionStorage.getItem("qrInfo");
			var info = JSON.parse(info1)
			this.login = info
			// var info1 = sessionStorage.getItem("zlInfo");
			// var info = JSON.parse(info1)
			// this.listQuery.userId = info.id
			// var isAuth = sessionStorage.getItem("zlIsAuth")
			// if(isAuth == 1){
				// this.getAll()
				this.getQuery()
				this.getUserList()
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
			},
			getAll(){
				sysInstructionReceiverFindCount(this.login.id).then((res) => {
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
				sysInstructionReceiverFindCount(this.login.id).then((res) => {
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
				this.listQuery.userId = this.login.id
				sysInstructionReceiverPageCheck(this.listQuery).then((res) => {
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
				this.listQuery.type = ''
				this.listQuery.status  = ''
				this.listQuery.userId = ''
				this.handleFilter()
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
			},
			sureD(id,receiverId){
				this.ruleForm.id = id
				this.ruleForm.receiverId = receiverId
				this.centerDialogVisible = true
			},
			submitForm(id){
				sysInstructionReceiverReply(this.ruleForm).then((res) => {
					if (res.code == 200) {
					    this.$message.success('回执成功');
					    this.getUserList()
						this.$refs["ruleForm"].resetFields(); 
						this.centerDialogVisible = false
					} else {
					    this.$message.error(res.msg);
					}
				}).catch(() => {
				      this.loading = false
				})
			},
			resetForm(formName){
				this.centerDialogVisible = false
				this.$refs.ruleForm.resetFields();
				this.getUserList()
			},
			sure(id,receiverId){
				this.$confirm("确认已读此条指令?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    sysInstructionReceiverReply({id:id,receiverId:receiverId}).then((res) => {
				    	if (res.code == 200) {
				    	    this.$message.success('标记成功');
				    	    this.getUserList()
				    	} else {
				    	    this.$message.error(res.msg);
				    	}
				    }).catch(() => {
				          this.loading = false
				    })
				}).catch(() => {})
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
