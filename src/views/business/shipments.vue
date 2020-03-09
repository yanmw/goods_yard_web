<template>
	<div>
		<p class="spanTab">  业务部  > 业务管理  > <span> 发货公司</span></p>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>发货公司</label><el-input style="width:150px" v-model="listQuery.company"  size="small" placeholder="请输入发货公司" clearable></el-input></span>
			<span class="ge-head"><label>业务代表</label><el-input style="width:150px" v-model="listQuery.representative"  size="small" placeholder="请输入业务代表" clearable></el-input></span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<span class="btn-b" style="margin-left: 50px;" @click="addUpdate(0)">+  添加发货公司</span>
		</div>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;height: 50px;color: #666;line-height: 50px;font-size: 14px;">
			分类：&#x3000;
			<span>全部公司  {{sendenterprises.countAll}}</span>&#x3000;&#x3000;
			<span>已欠款  <span class="red">{{sendenterprises.countDebt}}</span></span>
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
				    <el-table-column  align="center" prop="representative" label="业务代表"></el-table-column>
				    <el-table-column  align="center" prop="createTime" label="更新时间" width="160"></el-table-column>
				    <el-table-column  align="center" prop="balance" label="账户余额"></el-table-column>
					<el-table-column  align="center" prop="businessLicensePath" label="营业执照">
						<template  slot-scope="scope">
							<span style="color: #256ff8;cursor: pointer;" v-if="scope.row.businessLicensePath == null" @click="update(scope.row.id,1)">请上传</span>
							<span v-else  style="color: #256ff8;cursor: pointer;" @click="bigImg(scope.row.businessLicensePath)">查看图片</span>
						</template>
					</el-table-column>
					<el-table-column  align="center" prop="pound" label="开户许可证" width="140">
						<template  slot-scope="scope">
							<span style="color: #256ff8;cursor: pointer;" v-if="scope.row.licencePath == null" @click="update(scope.row.id,2)">请上传</span>
							<span v-else  style="color: #256ff8;cursor: pointer;" @click="bigImg(scope.row.licencePath)">查看图片</span>
						</template>
					</el-table-column>
					<el-table-column  align="center" prop="pound" label="开票信息">
						<template  slot-scope="scope">
							<span style="color: #256ff8;cursor: pointer;" v-if="scope.row.billPath == null" @click="update(scope.row.id,3)">请上传</span>
							<span v-else  style="color: #256ff8;cursor: pointer;" @click="bigImg(scope.row.billPath)">查看图片</span>
						</template>
					</el-table-column>
				    <el-table-column align="center" prop="nature" label="性质">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.nature == 1">部分代发</span>
				    		<span v-if="scope.row.nature == 2">完全代发</span>
				    	</template>
				    </el-table-column>
				    <el-table-column align="center" label="操作" width="160">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn blue" @click="addUpdate(scope.row)">编辑</span>
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
			<el-dialog :title="textMap[dialogStatus]" :visible.sync="centerDialogVisible"  width="50%" center  :before-close="closeDiv" :close-on-click-modal="false">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="width: 60%;margin: 0 auto;margin-top: 30px;">
			    <el-form-item label="发货公司名称:" prop="company">
			      <el-input v-model="ruleForm.company" maxlength="20" style="width: 100%;" placeholder="请输入发货公司名称"></el-input>
			    </el-form-item>
				<el-form-item label="业务代表:" prop="representative">
				  <el-input v-model="ruleForm.representative" style="width: 100%;" maxlength="20" placeholder="请输入业务代表"></el-input>
				</el-form-item>
				  <el-form-item label="公司性质:" prop="nature">
				  	<el-select v-model="ruleForm.nature" placeholder="请选择公司性质" style="width: 100%;">
				  	  <el-option label="部分代发" value="1"></el-option>
				  	  <el-option label="完全代发" value="2"></el-option>
				  	</el-select>
				  </el-form-item>
			  </el-form>
			  <span slot="footer" class="dialog-footer" >
			    <el-button @click="resetForm('ruleForm')">取 消</el-button>
			    <el-button type="primary" style="background-color: #00BF6F;" @click="submitForm('ruleForm')">确 定</el-button>
			  </span>
			</el-dialog>
			<el-dialog title="上传图片" :visible.sync="dialogVisible1" width="800px" :before-close="closeDiv1"  :close-on-click-modal="false">
			    <div class="orderH">
					<div style="text-align: center;height: 120px;margin-top: 20px;">
						<el-upload
						   class="avatar-uploader"
						   :action="actionUrl"
						   :show-file-list="false"
						    name="name"
						   :headers="myheaders"
						   :on-success="handleAvatarSuccess"
						   :before-upload="beforeAvatarUpload">
							    <img v-if="picUrl" :src="picUrl" class="avatar">
							    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
					<!-- <p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="dialogVisible1 = false">取消</span><span style="margin-left: 100px;padding:5px 40px;" @click="inputSure()">确认</span></p> -->
			    </div>
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
	import {businessShipmentsCompanyPage, businessShipmentsCompanyCount, businessShipmentsCompanyDelete, businessShipmentsCompanySave, businessShipmentsCompany} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					company:'',
					representative:'',
					pageNum:1,
					pageSize:10
				},
				ruleForm:{
					company:'',
					representative:'',
					nature:'',
				},
				rules:{
				  nature: [
				    { required: true, message: '请选择公司性质', trigger: 'change' }
				  ],
                  representative: [
				    { required: true, message: '请输入业务代表', trigger: 'blur' }
				  ],
				  company: [
				    { required: true, message: '请输入发货公司名称', trigger: 'blur' }
				  ],
				},
				uploadForm:{
					"id": '',
					"businessLicenseFileId": '',
					"bill": '',
					"licence": ''
				},
				indexUpload:'',
				sendenterprises:'',
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogVisible1:false,
				centerDialogVisible:false,
				dialogImageUrl:"",
				picUrl:'',
				actionUrl:'',
				dialogStatus: '',
				textMap: {
				  update: '修改员工',
				  create: '新增员工'
				},
			}
		},
		created() {
			    this.actionUrl = baseUrl + '/qr/sysFile/upload'
			    this.token = Cookies.get('qrToken')
				// this.getQuery()
				this.getUserList()
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
			closeDiv1(){
				this.$nextTick(() => {
					 // this.$refs["ruleForm"].resetFields();      
					  this.dialogVisible1 = false
					  this.getUserList()
					  this.picUrl = ''
					 // this.$refs.adduserform.resetFields();
				 });
			},
			handleClose(){
				this.getUserList()
				this.centerDialogVisible = false
			},
			getQuery(){
				
			},
			getUserList(){
				businessShipmentsCompanyCount().then((res) => {
				    if (res.code == 200) {
				        this.sendenterprises = res.data
				    } else {
						this.$message.error(res.msg);
				        this.sendenterprises = ''
				    }
				}).catch(() => {
				    this.loading = false
				})
				this.loading = true
				businessShipmentsCompanyPage(this.listQuery).then((res) => {
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
				this.listQuery.representative  = ''
				this.handleFilter()
			},
			addUpdate(row){
				this.ruleForm = {}
				this.centerDialogVisible = true
				if(row != 0){
					this.dialogStatus = 'update'
					this.ruleForm = row
					// this.ruleForm.company = row.company
					// this.ruleForm.representative = row.representative
					// this.ruleForm.nature = row.nature
				}else{
					this.dialogStatus = 'create'
				}
			},
			submitForm(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  businessShipmentsCompanySave(this.ruleForm).then((res) => {
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
			resetForm(formName){
				this.centerDialogVisible = false
				this.$refs.ruleForm.resetFields();
				this.getUserList()
				this.dialogVisible1 = false
				this.picUrl = ''
			},
			sure(id){
				this.$confirm("确认删除此条信息?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    businessShipmentsCompanyDelete(id).then((res) => {
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
			update(id,idx){
				this.dialogVisible1 = true
				this.uploadForm.id = id 
				this.indexUpload = idx
			},
			handleAvatarSuccess(res, file) {
				if(res.code == 200){
					this.picUrl = res.data.path
					console.log(res)
					if(this.indexUpload == 1){
						this.uploadForm.businessLicenseFileId = res.data.id
					}else if(this.indexUpload == 2){
						this.uploadForm.licence = res.data.id
					}else if(this.indexUpload == 3){
						this.uploadForm.bill = res.data.id
					}
				}else{
					this.$message.error(res.msg);
				}
			  // this.imageUrl = URL.createObjectURL(file.raw);
			  // this.image = file.raw.name;
			},
			beforeAvatarUpload(file) {
			  const isLt2M = file.size / 1024 / 1024 < 2;
			  if (!isLt2M) {
			    this.$message.error('上传头像图片大小不能超过 2MB!');
			  }
			  return isLt2M;
			},
			inputSure(){
				businessShipmentsCompany(this.uploadForm).then((res) => {
					if (res.code == 200) {
					    this.$message.success('操作成功');
						// this.ruleForm = {}
						this.getUserList()
						this.dialogVisible1 = false
						this.picUrl = ''
						
					} else {
					    this.$message.error(res.msg);
					}
				}).catch(() => {
					 this.loading = false
				})
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
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
