<template>
	<div>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
		   	<span class="ge-head"><label>发货公司</label><el-input style="width:150px" v-model="listQuery1.deliveryCompany"  size="small" placeholder="请输入发货公司" clearable></el-input></span>
		   	<span class="ge-head" ><label>到站点</label><el-input style="width:150px" v-model="listQuery1.arriveStation"  size="small" placeholder="请输入到站点" clearable></el-input></span>
		   	<span class="ge-head"><label>创建时间</label><el-date-picker size="small" v-model="dateTime1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 250px;"></el-date-picker></span>
		   	<span class="btn-b" @click="handleFilter1">查询</span>
		   	<span class="btn-ba" @click="reset1">重置</span>
		   </div>
		   	<div class="blueTable" style="width: 98.5%;border-radius: 5px;">
		   		<el-table :data="tableData1" :header-cell-style="{background:'#00BF6F',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
		   		    <el-table-column  align="center" type="index" label="序号">
		   				<template slot-scope="scope">
		   				    <span>{{(listQuery1.pageNum - 1) * listQuery1.pageSize + scope.$index + 1}}</span>
		   				</template>
		   			</el-table-column>
		   		    <el-table-column  align="center" prop="companyName" label="发货公司"></el-table-column>
		   		    <el-table-column  align="center" prop="arriveStation" label="到站点"></el-table-column>
		   		    <el-table-column  align="center" prop="track" label="股道">
						<template slot-scope="scope">
							<span v-if="scope.row.track == 1">机货一</span>
							<span v-if="scope.row.track == 2">机货三</span>
							<span v-if="scope.row.track == 3">股道1 </span>
							<span v-if="scope.row.track == 4">股道3</span>
						</template>
					</el-table-column>
		   		    <el-table-column  align="center" prop="totalCar" label="拉车总数"  ></el-table-column>
		   		    <el-table-column  align="center" prop="cargo" label="装车货品"></el-table-column>
		   			<el-table-column  align="center" prop="pullPushTime" label="拉车时间" width="160"></el-table-column>
		   		    <el-table-column  align="center" prop="createTime" label="计划创建时间" width="160"></el-table-column>
		   		</el-table>
		   	</div>
		   	<pagination v-show="total1>0" :total="total1" :page.sync="listQuery1.pageNum" :limit.sync="listQuery1.pageSize" @pagination="getUserList1" />  
	</div>
</template>

<script>
	import {businessWorkPlanReqRespCar, businessWorkPlanPushPullCar, businessWorkPlanAnnouncement} from "@/api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery1:{
					arriveStation:'',
					deliveryCompany:'',
					endDate:'',
					startDate:'',
					type:2,
					pageNum:1,
					pageSize:10
				},
				total1:0,
				loading:false,
				tableData1:[],
			}
		},
		created() {
			var info1 = sessionStorage.getItem("qrInfo");
			var info = JSON.parse(info1)
		    this.getUserList1()
		},
		methods:{
			getUserList1() {
				this.loading = true
				businessWorkPlanPushPullCar(this.listQuery1).then((res) => {
				    if (res.code == 200) {
				        this.tableData1 = res.data.content
				        this.total1 = res.data.totalSize
				        this.loading = false
				    } else {
						this.$message.error(res.msg);
				        this.tableData1 = []
				        this.total1 = 0
				        this.loading = false
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			handleFilter1() {
				this.listQuery1.pageNum = 1
				this.getUserList1()
			},
			reset1(){
				this.listQuery1.startDate = ''
				this.listQuery1.endDate = ''
				this.listQuery1.deliveryCompany = ''
				this.listQuery1.arriveStation = ''
				this.handleFilter1()
			},
		},
		computed: {
		   dateTime1: {
		        get() {
		          if (this.listQuery1.startDate && this.listQuery1.endDate) {
		             return [this.listQuery1.startDate, this.listQuery1.endDate]
		           } else {
		             return []
		          }
		        },
		        set(v) {
		          // console.log(v)
		          this.listQuery1.startDate = v[0]
		          this.listQuery1.endDate = v[1]
		        }
		   }
		}
	}
</script>

<style>
</style>
