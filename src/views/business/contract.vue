<template>
	<div>
		<p class="spanTab">  业务部  > 业务管理  > <span> 合同添加</span></p>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>发货公司</label><el-input style="width:150px" v-model="listQuery.company"  size="small" placeholder="请输入发货公司" clearable></el-input></span>
			<span class="ge-head"><label>上传时间</label><el-date-picker size="small" style="width: 240px;" v-model="dateTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker></span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<span class="btn-b" style="margin-left: 50px;" @click="addContract">+  添加合同</span>
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
				    <el-table-column  align="center" prop="company" label="发货公司"></el-table-column>
				    <el-table-column  align="center" prop="formerName" label="合同文件名"></el-table-column>
				    <el-table-column  align="center" prop="uploadDate" label="上传时间" width="160"></el-table-column>
				    <el-table-column align="center" prop="status" label="合同附件">
						<template slot-scope="scope">
				    	  <div class="tableB" >
				    		<span class="tableBtn blue" @click="sureUpload(scope.row.contractFileId)">下载</span>
				    	   </div>
						</template>
				    </el-table-column>
				    <el-table-column align="center" label="操作">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn red" @click="sure(scope.row.id)">删除本条</span>
				    		</div>
				    	</template>
				    </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog>
			<el-dialog title="添加发货公司" :visible.sync="centerDialogVisible"  :before-close="closeDiv" width="50%" center :close-on-click-modal="false">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="width: 60%;margin: 0 auto;margin-top: 30px;">
				   <el-form-item label="发货公司 ：" prop="companyId">
				     <el-select v-model="ruleForm.companyId" placeholder="请选择发货公司名称" >
				       <el-option
				           v-for="(item,index) in sendenterprises"
				           :key="index"
				           :label="item.company"
				           :value="item.id"
				       ></el-option>
				     </el-select>
				  </el-form-item>
				  <el-form-item label="合同 ：" prop="contractFileId">
					  <el-upload
					        ref="upload"
					  		name="name" 
							:action="actionUrl"
					  		:show-file-list="false"
							:headers="myheaders"
					  		:before-upload="beforeUpload"
							 :on-success="handleAvatarSuccess"
					         style="display: inline-block;text-align: left;">
					      <div style="text-align: left;" v-if='aa != null'>点击上传合同</div>
						  <span style="text-align: left;">{{aa}}</span>
					  </el-upload>
				  </el-form-item>
			  </el-form>
				<span slot="footer" class="dialog-footer" style="text-align: center;">
				  <el-button @click="resetForm('ruleForm')">取 消</el-button>
				  <el-button type="primary" style="background-color: #00BF6F;" @click="inputSure('ruleForm')">确 定</el-button>
				</span>
			</el-dialog>
		<!-- </div> -->
	</div>
	
</template>

<script>
	import { baseUrl } from '@/util/ajax'
	import Cookies from 'js-cookie'
	import {findAllShipmentsCompany, businessContractPage, businessContractSave, businessContractDelete, upload, sysFileDownload} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					company:'',
					startDate:'',
					endDate:'',
					pageNum:1,
					pageSize:10
				},
				pendStatus:[
					{name:'未上传',value:0},
					{name:'待审核',value:1},
					{name:'已确认',value:2}
				],
				ruleForm:{
					companyId:'',
					contractFileId:''
				},
				rules:{
				  companyId: [
				    { required: true, message: '请选择发货公司', trigger: 'change' }
				  ],
                  contractFileId: [
				    { required: true, message: '请选择合同附件文件', trigger: 'change' }
				  ],
				},
				contractFileId:'',
				sendenterprises:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				centerDialogVisible:false,
				dialogImageUrl:"",
				token:'',
				actionUrl:'',
				aa:''
			}
		},
		created() {
				this.getQuery()
				this.getUserList()
				this.actionUrl = baseUrl + '/qr/sysFile/upload'
				this.token = Cookies.get('qrToken')
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
				findAllShipmentsCompany().then((res) => {
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
			getUserList(){
				this.loading = true
				businessContractPage(this.listQuery).then((res) => {
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
				this.listQuery.company = ''
				this.listQuery.startDate = ''
				this.listQuery.endDate = ''
				this.handleFilter()
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
			},
			addContract(){
				this.centerDialogVisible = true
				this.ruleForm = {}
			},
			resetForm(formName){
				this.centerDialogVisible = false
				this.$refs.ruleForm.resetFields();
				this.aa = ''
				this.getUserList()
			},
			sureUpload(id){
				this.$confirm("确认下载此文件?", "提示", {
				  type: "warning"
				})
				.then(() => {
					window.location.href=baseUrl + "/qr/sysFile/download/" + id;
					// const loading = this.$loading({
					//         lock: true,
					//         text: '下载中。。。。',
					//         spinner: 'el-icon-loading',
					//         background: 'rgba(0, 0, 0, 0.7)'
					// });	
				 //    sysFileDownload(id).then((res) => {
				 //    	if (res.code == 200) {
				 //    	    this.$message.success('操作成功');
					// 		loading.close();
				 //    	    this.getUserList()
				 //    	} else {
					// 		loading.close();
				 //    	    this.$message.error(res.msg);
				 //    	}
				 //    }).catch(() => {
				 //          this.loading = false
				 //    })
				}).catch(() => {})
			},
			sure(id){
				this.$confirm("确认删除此条信息?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    businessContractDelete(id).then((res) => {
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
			beforeUpload(file){
				let excelfileExtend = ".doc, .docx, .xls, .xlsx"//设置文件格式
				let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
				if (excelfileExtend.indexOf(fileExtend) <= -1) {
				   this.$message.error('文件格式错误')
				   return false
				}
			},
			handleAvatarSuccess(res, file) {
			    if(res.code == 200){
			    	this.ruleForm.contractFileId = res.data.id
			    	this.aa = res.data.path
					// this.ruleForm.pictureFileId = file.name
					console.log(res)
					console.log(file)
			    }else{
			    	this.$message.error(res.msg);
			    }
			},
			inputSure(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  businessContractSave(this.ruleForm).then((res) => {
				        if (res.code == 200) {
				        	this.$message.success('操作成功');
				        	this.centerDialogVisible = false
				        	this.getUserList()
							this.$refs.ruleForm.resetFields();
							this.aa = ''
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
		},
		computed: {
		    dateTime: {
		        get() {
		          if (this.listQuery.startDate && this.listQuery.endDate) {
		             return [this.listQuery.startDate, this.listQuery.endDate]
		           } else {
		             return []
		          }
		        },
		        set(v) {
		          // console.log(v)
		          this.listQuery.startDate = v[0]
		          this.listQuery.endDate = v[1]
		        }
		   },
		   myheaders() {
		   	return{
		   		"token": this.token // 直接从本地获取token就行
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
