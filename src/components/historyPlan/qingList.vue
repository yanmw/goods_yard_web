<template>
	<div>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>发货公司</label><el-input style="width:150px" size="small" v-model="listQuery.deliveryCompany"   placeholder="请输入发货公司" clearable></el-input></span>
			<span class="ge-head"><label>到站点</label><el-input style="width:150px" size="small" v-model="listQuery.arriveStation"  placeholder="请输入到站点" clearable></el-input></span>
			<span class="ge-head"><label>创建时间</label><el-date-picker size="small" style="width: 240px;" v-model="dateTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker></span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
		</div>
		<div class="blueTable" style="width: 98.5%;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#00BF6F',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="companyName" label="发货公司"></el-table-column>
			    <el-table-column  align="center" prop="arriveStation" label="到站点"></el-table-column>
			    <el-table-column  align="center" prop="heightCarNum" label="高边车"></el-table-column>
			    <el-table-column  align="center" prop="heightCarCargo" label="高边车货品"></el-table-column>
			    <el-table-column  align="center" prop="containerNum" label="集装箱"></el-table-column>
			    <el-table-column  align="center" prop="containerCargo" label="集装箱货品"></el-table-column>
			    <el-table-column  align="center" prop="planTime" label="请车时间" v-if="listQuery.type == 1">
					<template slot-scope="scope">
						<span v-if="scope.row.planTime == 1">点前</span>
						<span v-if="scope.row.planTime == 2">点后</span>
					</template>
				</el-table-column>
				<el-table-column  align="center" prop="planTime" label="承认车时间" v-if="listQuery.type == 2">
					<template slot-scope="scope">
						<span v-if="scope.row.planTime == 1">点前</span>
						<span v-if="scope.row.planTime == 2">点后</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="createTime" label="计划创建时间" width="180"></el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />  
	</div>
</template>

<script>
	import {businessWorkPlanReqRespCar, businessWorkPlanPushPullCar, businessWorkPlanAnnouncement} from "@/api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					arriveStation:'',
					deliveryCompany:'',
					endDate:'',
					startDate:'',
					type:1,
					pageNum:1,
					pageSize:10
				},
				total:0,
				loading:false,
				tableData:[],
			}
		},
		created() {
			var info1 = sessionStorage.getItem("qrInfo");
			var info = JSON.parse(info1)
		    this.getUserList()
		},
		methods: {
			getUserList() {
				this.loading = true
				businessWorkPlanReqRespCar(this.listQuery).then((res) => {
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
				this.listQuery.startDate = ''
				this.listQuery.endDate = ''
				this.listQuery.deliveryCompany = ''
				this.listQuery.arriveStation = ''
				this.handleFilter()
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
		 }
		
	}	
</script>

<style>
</style>
