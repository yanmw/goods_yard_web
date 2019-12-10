<template>
	<div class="person">
		<div class="personHead">
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
		<p class="personTit">订单管理>实际结算订单 <span class="export"  @click="handleDownload">导出表格</span></p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="orderNumber" label="订单号" width="140px"></el-table-column>
			    <el-table-column  align="center" prop="createDate" label="交易时间" width="180px"></el-table-column>
			    <el-table-column  align="center" prop="purchaser" label="采购单位"></el-table-column>
			    <el-table-column  align="center" prop="supplier" label="货源厂家"></el-table-column>
			    <el-table-column  align="center" prop="category" label="货品种类"></el-table-column>
			    <el-table-column  align="center" prop="price" label="货品单价(元/吨)" width="130px"></el-table-column>
			    <el-table-column  align="center" prop="ton" label="订单吨数(吨)"></el-table-column>
			    <el-table-column  align="center" prop="tons" label="结算吨数(吨)"></el-table-column>
			    <el-table-column  align="center" prop="money" label="结算金额(元)"></el-table-column>
			    <el-table-column  align="center" prop="balance" label="可用余额(元)"></el-table-column>
			    <el-table-column  align="center" prop="salesman" label="业务员"></el-table-column>
			    <el-table-column  align="center" prop="status" label="状态"></el-table-column>
			    <el-table-column  align="center"  label="操作" width="140" fixed="right">
					<template slot-scope='scope'>
						<div class="tableB">
							<span class="tableBtn gray" @click="getDetail(scope.row.id)">详情</span>
							<span v-if="scope.row.isOk == 0" class="tableBtn blue" @click="finshed(scope.row)">完成</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog title="" :visible.sync="dialogVisible" width="1200px">
	        <div class="orderH">
	    	    <p class="oTit">首页 > <span>实际结算订单 > 详情</span></p>
	    	    <p class="dioOrder">订单信息 <span style="left: 70px;">订单号：{{order.orderNumber}}</span><span style="color: #666;right: 80px;">刷新时间: {{order.updateTime}}</span></p>
	    	    <div class="preInfo">
			      <div>
			       <span><label>采购厂家：</label>{{order.purchaser}}</span>
			       <span><label>手机号：</label>{{order.phone}}</span>
			      </div>
	    	      <div>
			       <span><label>货源厂家：</label>{{order.supplier}}</span>
			       <span><label>货品种类：</label>{{order.category}}</span>
			       <span><label>货品单价：</label>{{order.price}}元/吨</span>
			      </div>
	    	    </div>
			     <p class="dioOrder">运单信息 <span style="left: 70px;">运单号：{{waybill1}}</span></p>
				 <el-table :data="detail" :header-cell-style="{background: '#f2f3f7',color: '#333',borderRight:'none'}" stripe  style="width: 100%;margin-top: 20px;" align="center" border>
				     <el-table-column  align="center" type="index" label="序号">
						 
					 </el-table-column>
				     <el-table-column  align="center" prop="carNumber" label="车牌号"></el-table-column>
				     <el-table-column  align="center" prop="driver" label="司机"></el-table-column>
				     <el-table-column  align="center" prop="driverPhone" label="联系方式"></el-table-column>
				     <el-table-column  align="center" prop="ton" label=" 装车吨数(吨)"></el-table-column>
				     <el-table-column  align="center" prop="money" label="装车金额（元）"></el-table-column>
				     <el-table-column  align="center" prop="pound" label="装货磅单">
						 <template  slot-scope="scope">
						 	<span v-if="scope.row.pound" style="color: #256ff8;cursor: pointer;" @click="bigImg(scope.row.pound)">查看图片</span>
						 	<span v-else>--</span>
						 </template>
					 </el-table-column>
				     <el-table-column  align="center" prop="status" label="状态">
						 <template slot-scope='scope'>
						 	 <span v-if="scope.row.status">已确认</span>
						 </template>
					 </el-table-column>
				     <el-table-column  align="center" prop="createDate" label="审核通过时间"></el-table-column>
				 </el-table>
	        </div>
	    </el-dialog>
		<el-dialog :visible.sync="dialogVisibleImg" :close-on-click-modal="false">
		    <img width="100%" :src="dialogImageUrl" alt=""/>
		</el-dialog>
	</div>
</template>

<script>
	import {selectActualSettlePage, selectQueryList, selectSettle, settleFinish, selectSettlementList} from "../../api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				input:'',
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
				waybill1:'',
				suppliers:'',
				categorys:'',
				detail:[],
				order:'',
				total:0,
				loading:false,
				// loading1:false,
				tableData:[],
				dialogImageUrl:'',
				dialogVisible:false,
				dialogVisibleImg:false
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
				selectActualSettlePage(this.listQuery).then((res) => {
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
			bigImg(img){
				this.dialogVisibleImg = true
				this.dialogImageUrl = img
			},
			getDetail(id){
				selectSettle({id:id}).then((res) => {
				    	if (res.code == 200) {
							this.dialogVisible = true
                            this.detail = res.data.list
							this.order = res.data.order
							if(res.data.list){
								this.waybill1 = res.data.list[0].waybill
							}
				    	} else {
				    	    this.$message.error(res.msg);
				    	}
				    }).catch(() => {
				          this.loading = false
				    })
			},
			finshed(row){
				// console.log(row)
				if(row.status == '装货中'){
					this.$confirm('该订单号下存在待审核订单，请审核通过后予以确认，否则造成的资金损失由您个人承担。, 是否继续?', '提示', {
					          confirmButtonText: '去审核',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(() => {
					          this.$message({type: 'success',message: '即将前往审核订单!'});
							  this.$router.push('/personal/checkPending')
					        }).catch(() => {
					          this.$message({
					            type: 'info',
					            message: '已取消'
					          });          
					        });
				}else{
					this.$confirm("确认完成此条订单?", "提示", {
					  type: "warning"
					})
					.then(() => {
					    settleFinish({id:row.id,tons:row.tons,money:row.money}).then((res) => {
					    	if (res.code == 200) {
					    	    this.$message.success(res.msg);
					    	    this.getUserList()
					    	} else {
					    	    this.$message.error(res.msg);
					    	}
					    }).catch(() => {
					          this.loading = false
					    })
					}).catch(() => {})
				}
				
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
			       selectSettlementList({"userId":this.listQuery.userId,"orderNumber":this.listQuery.orderNumber,"beginDate":this.listQuery.beginDate,"endDate":this.listQuery.endDate,"supplier":this.listQuery.supplier,"category":this.listQuery.category}).then((res) => {
			  		   if(res.code == 0){
			  		   		this.$message.error('暂无导出数据');
			  		   		loading.close();
			  		   		return
			  		   }
					   if(res.data == 'success'){
						   loading.close();
			  			   window.location.href="http://192.168.1.128:8080/ymw/settle/exportSettlement?userId=" + this.listQuery.userId + "&orderNumber=" + this.listQuery.orderNumber + "&beginDate=" + this.listQuery.beginDate + "&endDate=" + this.listQuery.endDate + "&category=" + this.listQuery.category + "&supplier=" + this.listQuery.supplier;
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

<style lang="less">
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
