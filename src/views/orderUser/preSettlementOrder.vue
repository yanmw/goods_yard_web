<template>
	<div class="person">
		<div class="wayNav">
			<router-link to="preSettlementOrder">
				<span  class="tabspan">预结算订单</span>
			</router-link>
			<router-link to="checkPendingOrder">
			    <span>待审核订单</span>
			</router-link>
			<router-link to="actualSettlementOrder">
			    <span>实际结算订单</span>
			</router-link>
		</div>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>订单号</label><el-input style="width:150px" v-model="listQuery.orderNumber"  size="small" placeholder="请输入订单号" clearable></el-input></span>
			<span class="ge-head"><label>交易时间</label><el-date-picker size="small" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker></span>
			<span class="ge-head">
				<label>货品种类</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.category" clearable placeholder="请选择货品种类">
			       <el-option
			         v-for="(item,index) in categorys"
			         :key="index"
			         :label="item.category"
			         :value="item.category"
			       ></el-option>
			    </el-select>
			</span>
			<span class="ge-head">
				<label>货源厂家</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.supplier" clearable placeholder="请选择货源厂家">
			       <el-option
			         v-for="(item,index) in suppliers"
			         :key="index"
			         :label="item.supplier"
			         :value="item.supplier"
			       ></el-option>
			    </el-select>
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
		</div>
		<p class="personTit" style="padding-top: 0px;"> <span class="export" @click="handleDownload">导出表格</span></p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="orderNumber" label="订单号"></el-table-column>
			    <el-table-column  align="center" prop="createDate" label="交易时间" width="200px"></el-table-column>
			    <el-table-column  align="center" prop="purchaser" label="采购单位"></el-table-column>
			    <el-table-column  align="center" prop="contacts" label="联系人"></el-table-column>
			    <el-table-column  align="center" prop="phone" label="联系电话" ></el-table-column>
			    <el-table-column  align="center" prop="supplier" label="货源厂家"></el-table-column>
			    <el-table-column  align="center" prop="category" label="货品种类"></el-table-column>
			    <el-table-column  align="center" prop="price" label="货品单价(元/吨)" width="130px"></el-table-column>
			    <el-table-column  align="center" prop="ton" label="订单吨数(吨)"></el-table-column>
			    <el-table-column  align="center" prop="freezeAmount" label="冻结金额(元)">
			    	<template  slot-scope="scope">
			    		<span style="color: #256ff8;">{{scope.row.freezeAmount}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column  align="center" prop="salesman" label="业务员"></el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	</div>
</template>

<script>
	import {selectSettlePage, selectQueryList, selectSettleList} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				listQuery:{
					userId:'',
					beginDate:'',
					endDate:'',
					orderNumber:'',
					category:'',
					supplier:'',
					pageNum:1,
					pageSize:10
				},
				suppliers:'',
				categorys:'',
				total:0,
				loading:false,
				tableData:[],
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.listQuery.userId = info.id
			var isAuth = sessionStorage.getItem("zlIsAuth")
			if(isAuth == 1){
				this.getQuery()
				this.getUserList()
			}else{
				this.$confirm('还未认证请您前去认证, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$message({
				    type: 'success',
				    message: '即将跳转认证'
				  });
				 this.$router.push("authentication")
				})
			}
		},
		methods:{
			getQuery(){
				selectQueryList({userId:this.listQuery.userId}).then((res) => {
				    if (res.code == 200) {
				        this.categorys = res.data.cList
				        this.suppliers = res.data.sList
				    } else {
						this.$message.error(res.msg);
				        this.categorys = []
				        this.suppliers = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getUserList() {
				this.loading = true
				selectSettlePage(this.listQuery).then((res) => {
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
				this.listQuery.orderNumber = ''
				this.listQuery.category = ''
				this.listQuery.supplier = ''
				this.handleFilter()
			},
			handleDownload() {
	            // this.listQuery.sendstationname = String(this.loadcarstations)
			    this.$confirm("确认导出吗?", "提示", {
			         type: "warning"
			    })
			    .then(() => {
			  	  const loading = this.$loading({
			  	            lock: true,
			  	            text: '下载中。。。。',
			  	            spinner: 'el-icon-loading',
			  	            background: 'rgba(0, 0, 0, 0.7)'
			  	          });
			       selectSettleList({"userId":this.listQuery.userId,"orderNumber":this.listQuery.orderNumber,"beginDate":this.listQuery.beginDate,"endDate":this.listQuery.endDate,"supplier":this.listQuery.supplier,"category":this.listQuery.category}).then((res) => {
			  		   if(res.code == 0){
			  		   		this.$message.error('暂无导出数据');
			  		   		loading.close();
			  		   		return
			  		   }
					   if(res.data == 'success'){
						   loading.close();
			  			   window.location.href="http://192.168.1.128:8080/ymw/settle/exportSettle?userId=" + this.listQuery.userId + "&orderNumber=" + this.listQuery.orderNumber + "&beginDate=" + this.listQuery.beginDate + "&endDate=" + this.listQuery.endDate + "&category=" + this.listQuery.category + "&supplier=" + this.listQuery.supplier;
			  		   }else{
			  			   this.$message.error('暂无导出数据');
						   loading.close();
			  		   }
			       }).catch(() => {
			         loading.close();
			       })		  
			    })
			    .catch(() => {})
			}
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
