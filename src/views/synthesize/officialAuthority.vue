<template>
	<div>
		<p class="spanTab">业务部 > 公司管理 > <span>职务权限</span></p>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head">
				<label>角色名称</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.status" clearable placeholder="请选择部门名称">
			       <el-option
			         v-for="(item,index) in pendStatus"
			         :key="index"
			         :label="item.name"
			         :value="item.value"
			       ></el-option>
			    </el-select>
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<span class="btn-b" style="position: absolute;right: 30px;height: 36px;line-height: 22px;top:15px;" >+新增角色</span>
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
				    <el-table-column  align="center" prop="orderNumber" label="角色名称"></el-table-column>
				    <el-table-column  align="center" prop="waybill" label="备注"></el-table-column>
				    <el-table-column  align="center" prop="createDate" label="创建人"></el-table-column>
				    <!-- <el-table-column  align="center" prop="createDate" label="部门描述"></el-table-column> -->
				    <el-table-column  align="center" prop="purchaser" label="创建时间"></el-table-column>
				   <!-- <el-table-column  align="center" prop="pound" label="装货磅单">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.pound == 0">--</span>
				    		<span v-else  style="color: #256ff8;cursor: pointer;" @click="bigImg(scope.row.pound)">查看图片</span>
				    	</template>
				    </el-table-column>
				    <el-table-column align="center" prop="status" label="状态">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.status == 0">未上传</span>
				    		<span v-if="scope.row.status == 1">待审核</span>
				    		<span v-if="scope.row.status == 2">已确认</span>
				    	</template>
				    </el-table-column>
					<el-table-column  align="center" prop="carNumber" label="发布时间"></el-table-column> -->
				    <el-table-column align="center" label="操作" width="160">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn blue" @click="edit(scope.row)">编辑</span>
				    			<span class="tableBtn blue" @click="sure(scope.row.id)">设置权限</span>
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
				 <el-form-item label="接收人员" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="全体员工"></el-radio>
				      <el-radio label="指定人员"></el-radio>
				    </el-radio-group>
				  </el-form-item>
			    <el-form-item label="公告内容:" prop="desc">
			      <el-input type="textarea" v-model="ruleForm.desc" resize="none"></el-input>
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
		<!-- </div> -->
	</div>
	
</template>

<script>
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
				dialogImageUrl:"",
			}
		},
		created() {
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
