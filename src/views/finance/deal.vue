<template>
	<div class="person">
		<div class="personHead">
			<span class="ge-head">
				<label>交易类型</label>
				<el-select size="small"  style="width:150px" v-model="listQuery.type" clearable placeholder="请选择">
				   <el-option
				     v-for="(item,index) in selectType"
				     :key="index"
				     :label="item.name"
				     :value="item.value"
				   ></el-option>
				</el-select>
			</span>
			<span class="ge-head"><label>交易日期</label><el-date-picker size="small" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker></span>
			<span class="ge-head">
				<label>企业账户</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.purchaser" clearable placeholder="请选择">
                   <el-option
                     v-for="(item,index) in suppliers"
                     :key="index"
                     :label="item.purchaser"
                     :value="item.purchaser"
                   ></el-option>
                </el-select>
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
		</div>
		<p class="personTit">财务管理>交易流水 <span class="export" @click="handleDownload">导出表格</span></p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="type" label="交易类型">
					<template slot-scope="scope">
						<span v-if="scope.row.type == 1">结算</span>
						<span v-if="scope.row.type == 2">充值</span>
						<span v-if="scope.row.type == 3">提现</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="creatDate" label="交易日期"></el-table-column>
			    <el-table-column  align="center" prop="purchaser" label="企业账户"></el-table-column>
			    <el-table-column  align="center" prop="settleAmount" label="交易金额(元)"></el-table-column>
			    <el-table-column  align="center" prop="balance" label="账户余额(元)" ></el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	</div>
</template>

<script>
	import {selectTradeRecordsPage, queryList, selectTradeRecordsListExport } from '@/api/index'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				input:'',
				listQuery:{
					beginTime:'',
					endTime:'',
					type:'',
					purchaser:'',
					pageNum:1,
					pageSize:10
				},
				selectType:[
					{name:'结算',value:1},
					{name:'充值',value:2},
					{name:'提现',value:3},
				],
				suppliers:[],
				total:0,
				loading:false,
				tableData:[],
				admin:false
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.listQuery.userId = info.id
			this.getQuery()
			this.getUserList()
		},
		methods:{
			getQuery(){
				queryList({id:this.listQuery.userId,type:this.listQuery.type}).then((res) => {
				    if (res.code == 200) {
				        this.suppliers = res.data
				    } else {
						this.$message.error(res.msg);
				        this.suppliers = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getUserList(){
				this.loading = true
				selectTradeRecordsPage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.list
				        // this.statist = res.body.statistics[0]
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
				this.listQuery.beginTime = ''
				this.listQuery.endTime = ''
				this.listQuery.type = ''
				// this.listQuery.supplier = ''
				this.listQuery.purchaser = ''
				this.handleFilter()
			},
			handleDownload() {
			    // this.listQuery.sendstationname = String(this.loadcarstations)
			    this.$confirm("确认导出吗?", "提示", {
			          type: "warning"
			    }).then(() => {
			  		  const loading = this.$loading({
			  		            lock: true,
			  		            text: '下载中。。。。',
			  		            spinner: 'el-icon-loading',
			  		            background: 'rgba(0, 0, 0, 0.7)'
			  		          });
			           selectTradeRecordsListExport({"type":this.listQuery.type,"purchaser":this.listQuery.purchaser,"beginTime":this.listQuery.beginTime,"endTime":this.listQuery.endTime}).then((res) => {
			             if(res.code == 0){
			             		this.$message.error('暂无导出数据');
			             		loading.close();
			             		return
			             }
						 if(res.data == 'success'){
						 	loading.close();
							window.location.href="http://192.168.1.128:8080/ymw/fund/exportFund?type=" + this.listQuery.type + "&purchaser=" + this.listQuery.purchaser + "&beginTime=" + this.listQuery.beginTime + "&endTime=" + this.listQuery.endTime;
						 }else{
						 	this.$message.error('暂无导出数据');
						 	loading.close();
						 }
						 // if (res.code == 200) {
			  		// 	   // if(res.body.flag == true){
			  		// 	   // }else{
			  		// 		   // this.$message.error('暂无导出数据');
			  		// 	   // }
			  		// 	   loading.close();
			    //          } else {
			    //        		this.$message.error(res.msg);
			  		// 		loading.close();
			    //          }
			           }).catch(() => {
			             loading.close();
			           })		  
			        })
			        .catch(() => {})
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
		    }
		}
	}
</script>

<style lang="less" scoped>
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
