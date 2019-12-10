<template>
	<div class="person">
		<div class="personHead">
			<span class="ge-head">
				<label>交易类型</label>
				<el-select size="small"  style="width:150px" v-model="listQuery.tradeType" clearable placeholder="请选择">
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
			    <el-select size="small"  style="width:150px" v-model="listQuery.tradeObject" clearable placeholder="请选择">
                   <el-option
                     v-for="(item,index) in tList"
                     :key="index"
                     :label="item.tradeObject"
                     :value="item.tradeObject"
                   ></el-option>
                </el-select>
			</span>
			<span class="ge-head">
				<label>品类</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.tradeCategory" clearable placeholder="请选择">
			       <el-option
			         v-for="(item,index) in cList"
			         :key="index"
			         :label="item.tradeCategory"
			         :value="item.tradeCategory"
			       ></el-option>
			    </el-select>
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
		</div>
		<p class="personTit">财务管理>交易流水 </p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="tradeType" label="交易类型">
					<template slot-scope="scope">
						<span v-if="scope.row.tradeType == 1">买货</span>
						<span v-if="scope.row.tradeType == 2">卖货</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="createDate" label="交易日期"></el-table-column>
			    <el-table-column  align="center" prop="tradeObject" label="企业账户"></el-table-column>
			    <el-table-column  align="center" prop="tradeCategory" label="交易品类"></el-table-column>
			    <el-table-column  align="center" prop="price" label="单价(元)"></el-table-column>
			    <el-table-column  align="center" prop="ton" label="吨数(吨)"></el-table-column>
			    <el-table-column  align="center" prop="amount" label="交易金额(元)"></el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	</div>
</template>

<script>
	import {tradeUserSelectQueryList, tradeUserSelectPageList } from '@/api/index'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					userId:'',
					beginDate:'',
					endDate:'',
					tradeType:'',
					tradeObject:'',
					tradeCategory:'',
					pageNum:1,
					pageSize:10
				},
				selectType:[
					{name:'买货',value:1},
					{name:'卖货',value:2},
				],
				cList:[],
				tList:[],
				total:0,
				loading:false,
				tableData:[],
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
				tradeUserSelectQueryList({userId:this.listQuery.userId}).then((res) => {
				    if (res.code == 200) {
				        this.tList = res.data.tList
				        this.cList = res.data.cList
				    } else {
						this.$message.error(res.msg);
				        this.tList = []
				        this.cList = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getUserList(){
				this.loading = true
				tradeUserSelectPageList(this.listQuery).then((res) => {
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
				this.listQuery.beginDate = ''
				this.listQuery.endDate = ''
				this.listQuery.tradeType = ''
				this.listQuery.tradeObject = ''
				this.listQuery.tradeCategory = ''
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
			           getArriveExportDemand({"vendername":this.listQuery.vendername,"sendstationname":this.listQuery.sendstationname,"beginTime":this.listQuery.beginTime,"endTime":this.listQuery.endTime}).then((res) => {
			             if (res.errorCode == 200) {
			  			   if(res.body.flag == true){
			  				   window.location.href="http://192.168.1.128:8080/train/systempc/exportTrainArrived?vendername=" + this.listQuery.vendername + "&sendstationname=" + this.listQuery.sendstationname + "&beginTime=" + this.listQuery.beginTime + "&endTime=" + this.listQuery.endTime;
			  			   }else{
			  				   this.$message.error('暂无导出数据');
			  			   }
			  			   loading.close();
			             } else {
			           		this.$message.error(res.msg);
			  				loading.close();
			             }
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
		           if (this.listQuery.beginDate && this.listQuery.endDate) {
		              return [this.listQuery.beginDate, this.listQuery.endDate]
		            } else {
		              return []
		           }
		         },
		         set(v) {
		           // console.log(v)
		           this.listQuery.beginDate = v[0]
		           this.listQuery.endDate = v[1]
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
