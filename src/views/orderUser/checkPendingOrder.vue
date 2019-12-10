<template>
	<div class="person">
		<div class="wayNav">
			<router-link to="preSettlementOrder">
				<span >预结算订单</span>
			</router-link>
			<router-link to="checkPendingOrder">
			    <span class="tabspan">待审核订单</span>
			</router-link>
			<router-link to="actualSettlementOrder">
			    <span >实际结算订单</span>
			</router-link>
		</div>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>订单号</label><el-input style="width:150px" v-model="listQuery.orderNumber"  size="small" placeholder="请输入订单号" clearable></el-input></span>
			<span class="ge-head"><label>运单号</label><el-input style="width:150px" v-model="listQuery.waybill"  size="small" placeholder="请输入运单号" clearable></el-input></span>
			<span class="ge-head">
				<label>状态</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.status" clearable placeholder="请选择状态">
			       <el-option
			         v-for="(item,index) in pendStatus"
			         :key="index"
			         :label="item.name"
			         :value="item.value"
			       ></el-option>
			    </el-select>
			</span>
			<span class="ge-head">
				<label>货源厂家</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.supplier" clearable placeholder="请选择货源厂家">
			       <el-option
			         v-for="(item,index) in sendenterprises"
			         :key="index"
			         :label="item.supplier"
			         :value="item.supplier"
			       ></el-option>
			    </el-select>
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
		</div>
		<!-- <p class="personTit" style="padding-top: 0px;"> <span class="export">导出表格</span></p> -->
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="orderNumber" label="订单号"></el-table-column>
			    <el-table-column  align="center" prop="waybill" label="运单号"></el-table-column>
			    <el-table-column  align="center" prop="createDate" label="创建时间"></el-table-column>
			    <el-table-column  align="center" prop="purchaser" label="采购单位"></el-table-column>
			    <el-table-column  align="center" prop="carNumber" label="车牌号"></el-table-column>
			    <el-table-column  align="center" prop="supplier" label="货源厂家"></el-table-column>
			    <el-table-column  align="center" prop="category" label="货品种类"></el-table-column>
			    <el-table-column  align="center" prop="price" label="货品单价(元/吨)"  width="130px"></el-table-column>
			    <el-table-column  align="center" prop="ton" label="货品吨数(吨)"></el-table-column>
			    <el-table-column  align="center" prop="money" label="装货金额(元)"></el-table-column>
			    <el-table-column  align="center" prop="pound" label="装货磅单">
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
			    <!-- <el-table-column align="center" label="操作" width="160">
			    	<template slot-scope="scope">
			    		<div class="tableB" v-if="scope.row.status != 2">
			    			<span class="tableBtn green" @click="edit(scope.row)">修改</span>
			    			<span class="tableBtn blue" @click="sure(scope.row.id)">确认</span>
			    		</div>
			    	</template>
			    </el-table-column> -->
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
	        <img width="100%" :src="dialogImageUrl" alt=""/>
	    </el-dialog>
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
				sendenterprises:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogImageUrl:"",
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
