<template>
	<div>
		<p class="spanTab" v-if="tabSpanHome == 1">业务部 > 计划申报 > <span>查看公告</span></p>
		<p class="spanTab" v-if="tabSpanHome == 5">综合部 > 公告指令 > <span>查看公告</span></p>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>标题</label><el-input style="width:150px" v-model="listQuery.columnFilters.title.value"  size="small" placeholder="请输入标题关键词" clearable></el-input></span>
			<span class="ge-head">
				<label>阅读状态</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.columnFilters.status.value" clearable placeholder="请选择阅读状态">
			       <el-option
			         v-for="(item,index) in pendStatus"
			         :key="index"
			         :label="item.name"
			         :value="item.value"
			       ></el-option>
			    </el-select>
			</span>
			<span class="ge-head"><label>发布时间</label><el-date-picker size="small" style="width: 240px;" v-model="dateTime" type="daterange"  start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker></span>
			<span class="ge-head">
				<label>公告类别</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.columnFilters.type.value" clearable placeholder="请选择公告类别">
			       <el-option
			         v-for="(item,index) in sendenterprises"
			         :key="index"
			         :label="item.dicName"
			         :value="item.dicCode"
			       ></el-option>
			    </el-select>
			</span>
			<span class="ge-head"><label>发布人员</label><el-input style="width:150px" v-model="listQuery.columnFilters.name.value"  size="small" placeholder="请输入发布人员" clearable></el-input></span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
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
				    <el-table-column  align="center" prop="title" label="公告标题"></el-table-column>
				    <el-table-column  align="center" prop="name" label="发布人员"></el-table-column>
				    <el-table-column align="center" prop="status" label="公告类别">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.type == 1">业务公告</span>
				    		<span v-if="scope.row.type == 2">行政公告</span>
				    		<span v-if="scope.row.type == 3">内部分享</span>
				    		<span v-if="scope.row.type == 4">其他分享</span>
				    	</template>
				    </el-table-column>
				    <el-table-column align="center" prop="status" label="阅读状态">
				    	<template  slot-scope="scope">
				    		<span v-if="scope.row.readStatus == 0"><span class="weiDot"></span>未读</span>
				    		<span v-if="scope.row.readStatus == 1"><span class="greenDot"></span>已读</span>
				    	</template>
				    </el-table-column>
				    <el-table-column  align="center" prop="createTime" label="发布时间"></el-table-column>
				    <el-table-column align="center" label="操作">
				    	<template slot-scope="scope">
				    		<div class="tableB" >
				    			<span class="tableBtn blue" v-if="scope.row.readStatus == 0" @click="sureRead(scope.row.receiverId)">标记已读</span>
				    		</div>
				    	</template>
				    </el-table-column>
				</el-table>
			</div>
			<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
		        <img width="100%" :src="dialogImageUrl" alt=""/>
		    </el-dialog>
		<!-- </div> -->
	</div>
	
</template>

<script>
	import {getAnnouncementType, sysAnnouncementPageCheck,readly} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					"columnFilters": {
					    "title": {//标题
					        "value": ""
					    },
					    "name": {//发布人姓名
					        "value": ""
					    },
					    "status": {//状态
					        "value": ""
					    },
					    "startDate": {//开始时间
					        "value": ""
					    },
					    "endDate": {//结束时间
					        "value": ""
					    },
					    "receiverId": {//当前登陆人id
					        "value": ''
					    },
					    "type": {//类型
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
				sendenterprises:[],
				login:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogImageUrl:"",
				tabSpanHome:'',
			}
		},
		created() {
			this.tabSpanHome = sessionStorage.getItem("qrTab");
			var info1 = sessionStorage.getItem("qrInfo");
			var info = JSON.parse(info1)
			this.login = info
				this.getQuery()
				this.getUserList()
		},
		methods:{
			getQuery(){
				getAnnouncementType().then((res) => {
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
				this.listQuery.columnFilters.receiverId.value  = this.login.id
				sysAnnouncementPageCheck(this.listQuery).then((res) => {
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
				this.listQuery.columnFilters.type.value  = ''
				this.listQuery.columnFilters.title.value  = ''
				this.listQuery.columnFilters.startDate.value  = ''
				this.listQuery.columnFilters.endDate.value  = ''
				this.listQuery.columnFilters.name.value  = ''
				this.handleFilter()
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
			},
			sureRead(id){
				this.$confirm("确认已读此条公告?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    readly(id).then((res) => {
				    	if (res.code == 200) {
							console.log(res)
				    	    this.$message.success('标记成功');
				    	    this.handleFilter()
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
