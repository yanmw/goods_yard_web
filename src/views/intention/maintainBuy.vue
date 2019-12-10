<template>
	<div class="person">
		<div class="personHead">
			<span class="ge-head"><label>订单号</label><el-input style="width:150px" v-model="listQuery.orderNumber"  size="small" placeholder="请输入订单号" clearable></el-input></span>
			<span class="ge-head"><label>创建日期</label><el-date-picker size="small" v-model="listQuery.date" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请输入创建日期"></el-date-picker></span>
			<span class="ge-head">
				<label>货品种类</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.category" clearable placeholder="请选择需求品类">
                   <el-option
                     v-for="(item,index) in categorys"
                     :key="index"
                     :label="item.category"
                     :value="item.category"
                   ></el-option>
                </el-select>
			</span>
			<span class="ge-head">
				<label>供应单位</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.supplier" clearable placeholder="请选择供应单位">
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
		<p class="personTit">买货管理>意向购买>意向订单</p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="orderNumber" label="订单号"></el-table-column>
			    <el-table-column  align="center" prop="createDate" label="创建时间"></el-table-column>
			    <el-table-column  align="center" prop="category" label="货品种类"></el-table-column>
			    <el-table-column  align="center" prop="supplier" label="供应单位"></el-table-column>
			    <el-table-column  align="center" prop="amount" label="供货数量(吨)"></el-table-column>
			    <el-table-column  align="center" prop="price" label="供货价格(元/吨)"></el-table-column>
			    <el-table-column  align="center" prop="phone" label="联系电话"></el-table-column>
			    <el-table-column  align="center"  label="操作" width="200">
					<template slot-scope="scope">
						<div class="tableB">
							<span class="tableBtn gray" @click="detailed(scope.row.id)">详情</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog title="" :visible.sync="dialogVisible" width="1200px" :close-on-click-modal="false">
	        <div class="orderH">
	    	    <p class="oTit">买货管理 > <span>意向购买>意向订单>详情</span></p>
			     <p class="dioOrder">意向订单详情 <span style="left: 70px;">订单号：{{tableData1.orderNumber}}</span><span style="color: #666;right: 80px;">创建时间: {{tableData1.createDate}}</span></p>
				 <div class="preInfo">
				    <div style="margin-top: 40px;width: 100%;">
				        <span style="display: inline-block;width: 100% !important;"><label>标题：</label>{{tableData1.title}}</span>
				    </div>
					<div>
						<span><label>需求厂家：</label>{{tableData1.company}}</span>
						<span><label>货品种类：</label>{{tableData1.category}}</span>
						<span><label>需求数量：</label>{{tableData1.number}}吨</span>
						<span><label>目的地：</label>{{tableData1.destination}}</span>
					</div>
				    <div>
				        <span><label>供应单位：</label>{{tableData1.supplier}}</span>
				        <span><label>供货数量：</label>{{tableData1.amount}}吨</span>
				        <span><label>供货价格：</label>{{tableData1.price}}元/吨</span>
				        <span><label>联系电话：</label>{{tableData1.phone}}</span>
				    </div>
				 </div>
	        </div>
	    </el-dialog>
	</div>
</template>

<script>
	import {intentionSelectQueryList, intentionSelectIntention, intentionSelectIntentionPage} from '../../api/index.js'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				input:'',
				listQuery:{
					userId:'',
					orderNumber:'',
					category:'',
					supplier:'',
					date:'',
					pageNum:1,
					pageSize:10
				},
				suppliers:[],
				categorys:[],
				total:0,
				loading:false,
				tableData:[],
				tableData1:[],
				dialogVisible:false
			}
		},
	
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.listQuery.userId = info.id
			this.getCategory()
			this.getUserList()
		},
		methods:{
			getCategory(){
				intentionSelectQueryList({userId:this.listQuery.userId}).then((res) => {
			     	  if(res.code == 200){
						  this.categorys = res.data.cList
						  this.suppliers = res.data.sList
			     	  }else {
						this.$message.error(res.msg);
				        this.suppliers = []
				        this.categorys = []
				    }
			    }).catch(function(res) {
			     		console.log(res)
			       })
			},
			getUserList(){
				 this.loading = true
				intentionSelectIntentionPage(this.listQuery).then((res) => {
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
			detailed(id){
				intentionSelectIntention({id:id}).then((res) => {
				    	if (res.code == 200) {
							this.dialogVisible = true
			                this.tableData1 = res.data
							var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
							this.tableData1.destination = res.data.destination.replace(reg,"")
							
				    	} else {
				    	    this.$message.error(res.msg);
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
				this.listQuery.date = ''
				this.listQuery.orderNumber = ''
				this.listQuery.supplier = ''
				this.listQuery.category = ''
				this.handleFilter()
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

<style lang="less" scoped="scoped">
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
	.preInfo div span{
		width: 25%!important;
		vertical-align: top;
	}
</style>
