<template>
	<div>
		<p class="spanTab">综合部 > 公告指令 > <span>发布视频</span></p>
		<div class="person" style="padding: 80px 0;">
			<img style="width: 40%;margin-left:30%;" src="../../assets/none.png" alt="">
		</div>
		<!-- <div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>搜索关键词</label><el-input style="width:150px" v-model="listQuery.orderNumber"  size="small" placeholder="请输入标题关键词" clearable></el-input></span>
			<span class="ge-head">
				<label>阅读状态</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.status" clearable placeholder="请选择阅读状态">
			       <el-option
			         v-for="(item,index) in pendStatus"
			         :key="index"
			         :label="item.name"
			         :value="item.value"
			       ></el-option>
			    </el-select>
			</span>
			<span class="ge-head"><label>发布时间</label><el-date-picker size="small" v-model="listQuery.beginTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;"></el-date-picker></span>
			<span class="ge-head"><label>选择栏目</label><el-input style="width:150px" v-model="listQuery.waybill"  size="small" placeholder="请输入发布人员" clearable></el-input></span>
			<span class="ge-head"><label>发布人员</label><el-input style="width:150px" v-model="listQuery.waybill"  size="small" placeholder="请输入发布人员" clearable></el-input></span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<span class="btn-b" style="position: absolute;right: 30px;height: 36px;line-height: 22px;top:15px;" >+发布视频</span>
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
				    <el-table-column  align="center" prop="orderNumber" label="视频标题"></el-table-column>
				    <el-table-column  align="center" prop="waybill" label="发布时间"></el-table-column>
				    <el-table-column  align="center" prop="createDate" label="视频类别"></el-table-column>
				    <el-table-column  align="center" prop="createDate" label="发布人员"></el-table-column>
				    <el-table-column  align="center" prop="purchaser" label="备注"></el-table-column>
				    <el-table-column align="center" label="操作" width="160">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn green" @click="edit(scope.row)">修改</span>
				    			<!-- <span class="tableBtn blue" @click="sure(scope.row.id)">标记已读</span> -->
				    			<!-- <span class="tableBtn red" @click="sure(scope.row.id)">删除</span>
				    		</div>
				    	</template>
				    </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog> --> 
			<el-dialog title="发布公告" :visible.sync="centerDialogVisible"  width="50%" center :close-on-click-modal="false">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 60%;margin: 0 auto;">
			    <el-form-item label="公告分类:" prop="region">
			      <el-select v-model="ruleForm.region" placeholder="请选择公告分类">
			        <el-option label="区域一" value="shanghai"></el-option>
			        <el-option label="区域二" value="beijing"></el-option>
			      </el-select>
			    </el-form-item>
			    <el-form-item label="公告标题:" prop="name">
			      <el-input v-model="ruleForm.name" style="width: 56%;"></el-input>
			    </el-form-item>
				<el-form-item label="上传视频:">
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
				</el-form-item>
<!-- 				 <el-form-item label="接收人员" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="全体员工"></el-radio>
				      <el-radio label="指定人员"></el-radio>
				    </el-radio-group>
				  </el-form-item>
			    <el-form-item label="公告内容:" prop="desc">
			      <el-input type="textarea" v-model="ruleForm.desc" resize="none"></el-input>
			    </el-form-item> -->
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
		<!-- </div> -->
	</div>
	
</template>

<script>
	import { baseUrl } from '@/util/ajax'
	import Cookies from 'js-cookie'
	import {selectIntentionPage, pendingSelectQueryList} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					userId:'',
					orderNumber:'',
					waybill:'',
					status:'',
					supplier :'',
					beginTime:'',
					endTime:'',
					pageNum:1,
					pageSize:10
				},
				pendStatus:[
					{name:'未上传',value:0},
					{name:'待审核',value:1},
					{name:'已确认',value:2}
				],
				ruleForm: {
				          name: '',
				          region: '',
				          date1: '',
				          date2: '',
				          delivery: false,
				          type: [],
				          resource: '',
				          desc: ''
				        },
				        rules: {
				          name: [
				            { required: true, message: '请输入活动名称', trigger: 'blur' },
				            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				          ],
				          region: [
				            { required: true, message: '请选择活动区域', trigger: 'change' }
				          ],
				          date1: [
				            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				          ],
				          date2: [
				            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				          ],
				          type: [
				            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				          ],
				          resource: [
				            { required: true, message: '请选择活动资源', trigger: 'change' }
				          ],
				          desc: [
				            { required: true, message: '请填写活动形式', trigger: 'blur' }
				          ]
				        },
				sendenterprises:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				centerDialogVisible:false,
				dialogImageUrl:"",
				picUrl:'',
				actionUrl:'',
				token:''
			}
		},
		created() {
			this.actionUrl = baseUrl + '/qr/sysFile/upload'
			this.token = Cookies.get('qrToken')
			// var info1 = sessionStorage.getItem("zlInfo");
			// var info = JSON.parse(info1)
			// this.listQuery.userId = info.id
			// var isAuth = sessionStorage.getItem("zlIsAuth")
			// if(isAuth == 1){
			// 	this.getQuery()
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
				pendingSelectQueryList({userId:this.listQuery.userId}).then((res) => {
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
				selectIntentionPage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.list
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
			handleFilter() {
				this.listQuery.pageNum = 1
				this.getUserList()
			},
			reset(){
				this.listQuery.orderNumber = ''
				this.listQuery.waybill  = ''
				this.listQuery.status = ''
				this.listQuery.supplier = ''
				this.handleFilter()
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
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
			    this.$message.error('上传视频大小不能超过 2MB!');
			  }
			  return isLt2M;
			},
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

