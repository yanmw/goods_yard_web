<template>
	<div class="person">
		<div class="wayNav">
			<!-- <router-link to="issueWaybill">
				<span>发布运单</span>
			</router-link> -->
			<span class="tabspan">发货记录</span>
			<!-- <span class="btn-b" @click="gowill()">+ 发布运单</span> -->
		</div>
		<div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			<span class="ge-head"><label>运单号</label><el-input style="width:150px" v-model="listQuery.waybill"  size="small" placeholder="请输入运单号" clearable></el-input></span>
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
				<label>出发地</label>
				<el-cascader
				    v-model="address"
				    :options="options"
				    @change="handleChange"
					:props="props" style="width: 150px;" placeholder="请选择出发地"></el-cascader> 
			    <!-- <el-input style="width:150px" v-model="listQuery.becity"  size="small" placeholder="请输入出发地" clearable></el-input> -->
			</span>
			<span class="ge-head">
				<label>目的地</label>
				<el-cascader
				    v-model="address1"
				    :options="options"
				    @change="handleChange1"
					:props="props" style="width: 150px;" placeholder="请选目的地"></el-cascader> 
			    <!-- <el-input style="width:150px" v-model="listQuery.destination"  size="small" placeholder="请输入目的地" clearable></el-input> -->
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<!-- <span class="export">导出表格</span> -->
		</div>
		<!-- <p class="personTit">订单管理>实际结算订单</p> -->
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="waybill" label="运单号"></el-table-column>
			    <el-table-column  align="center" prop="supplier" label="发货厂家"></el-table-column>
			    <el-table-column  align="center" prop="category" label="货品种类"></el-table-column>
			    <el-table-column  align="center" prop="becity" label="出发地"></el-table-column>
			    <el-table-column  align="center" prop="destination" label="目的地"></el-table-column>
			    <el-table-column  align="center" prop="freight" label="运费单价(元/吨)"></el-table-column>
			    <el-table-column  align="center" prop="handling" label="装卸费(元/车)"></el-table-column>
			    <el-table-column  align="center" prop="receiverPhone" label="收货人联系电话"></el-table-column>
			    <el-table-column  align="center" prop="createDate" label="发布时间"></el-table-column>
			    <el-table-column  align="center"  label="操作">
			    	<template  slot-scope="scope">
			    		<span style="color: #256ff8;cursor: pointer;" @click="detailed(scope.row.id)">详情</span>
			    	</template>
			    </el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog title="" :visible.sync="dialogVisible" width="1200px">
	        <div class="orderH" >
	    	    <p class="oTit">买货管理  > <span> 平台购买 > 运单管理 > 发货记录详情</span></p>
				<div class="soller" style="height: 600px;overflow: auto;">
					<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>基础信息 <span>运单号：{{record.waybill}}</span></div>
					<div class="preInfo">
					   <span><label>采购厂家：</label>{{record.company}}</span>
					   <span><label>货源厂家联系方式：</label>{{record.senderPhone}}</span>
					   <span><label>出发地：</label>{{record.becity}}</span>
					   <span><label>目的地：</label>{{record.destination}}</span>
					   <span><label>收货人：</label>{{record.receiver}}</span>
					   <span><label>联系方式：</label>{{record.receiverPhone}}</span>
					</div>
					<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>需求信息 </div>
					<div class="preInfo">
					   <span><label>起止时间：</label>{{record.beginDate}}至{{record.endDate}}</span>
					   <span><label>货品类型：</label>{{record.category}}</span>
					   <span><label>发货吨数：</label>{{record.ton}}吨</span>
					   <span><label>需求车辆：</label>{{record.cars}}</span>
					   <span><label>运费单价：</label>{{record.freight}}元/吨</span>
					   <span><label>装卸费：</label>{{record.handling}}元/车</span>
					</div>
					<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>其他信息 </div>
					<div class="preInfo">
					   <span>
						   <label>付款方式：</label>
						   <span v-if="record.payType == 1">线下现金</span>
						   <span v-if="record.payType == 2">线下转账</span>
						   <span v-if="record.payType == 3">线下转账+油卡</span>
						   <span v-if="record.payType == 4">云到线上结算</span>
						</span>
					   <span>
						   <label>付款条件：</label>
						   <span v-if="record.payTerm == 1">卸前付款</span>
						   <span v-if="record.payTerm == 2">卸后付款</span>
						</span>
					   <span>
						   <label>是否开票：</label>
						   <span v-if="record.invoice == 1">是</span>
						   <span v-if="record.invoice == 0">否</span>
						</span>
					</div>
					<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>接单信息 </div>
					<div class="receiving">
						<p v-for="(li,index) in lists"><span>{{parseInt(index)+1}}、 {{li.driver}}</span><span>{{li.driverPhone}}</span><span>{{li.carNumber}} </span><span>{{li.createDate}}</span></p>
					</div>
				</div>
	        </div>
	    </el-dialog>
	</div>
</template>

<script>
	import {deliverySelectQueryList, deliverySelectPage, deliverySelectDetails } from '../../api/index.js'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	import Area from '../../util/city.js'
	export default{
		components:{
			Area,
			Pagination
		},
		data(){
			return{
				listQuery:{
					userId:'',
					waybill:'',
					category:'',
					becity:'',
					destination:'',
					pageNum:1,
					pageSize:10
				},
				categorys:'',
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				record:'',
				address:[],
				address1:[],
				lists:[],
				options:[],
				props: {
					label: 'value',
					children: 'children'
				},
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.listQuery.userId = info.id
			this.options = Area.areaList
			this.getCategory()
			this.getUserList()
		},
		methods:{
			getCategory(){
				deliverySelectQueryList({userId:this.listQuery.userId}).then((res) => {
			     	  if(res.code == 200){
						  this.categorys = res.data
			     	  }else{
						  this.categorys = []
					  }
			    }).catch(function(res) {
			     		// console.log(res)
			       })
			},
			getUserList(){
				this.loading = true
				deliverySelectPage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.list
						var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
						for(var i=0;i<res.data.list.length;i++){
							res.data.list[i].becity = res.data.list[i].becity.replace(reg,"")
							res.data.list[i].destination = res.data.list[i].destination.replace(reg,"")
						}
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
			handleChange(value) {
			  this.listQuery.becity = JSON.stringify(value)
			},
			handleChange1(value) {
			  this.listQuery.destination = JSON.stringify(value)
			},
			detailed(id){
				deliverySelectDetails({id:id}).then((res) => {
				    	if (res.code == 200) {
							this.dialogVisible = true
			                this.record = res.data.record
							var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
							this.record.destination = res.data.record.destination.replace(reg,"")
							this.record.becity = res.data.record.becity.replace(reg,"")
							this.lists = res.data.list
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
				this.listQuery.waybill = ''
				this.listQuery.becity = ''
				this.listQuery.destination = ''
				this.address = []
				this.address1 = []
				this.listQuery.category = ''
				this.handleFilter()
			},
			gowill(){
				this.$router.push('/personal/issueWaybill')
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
	.preInfo{
		border-bottom: 1px dashed #c6c6c6;
		span{
			display: inline-block;
			width: 49%;
			font-size: 16px;
			color: #333;
			letter-spacing: 1px;
			margin-bottom: 30px;
			padding-left: 5%;
			label{
				color: #666;
				font-size: 14px;
			}
		}
	}
	.receiving{
		padding-left: 6.5%;
		p{
			color: #333;
			margin-bottom: 20px;
			span{
				margin-right: 90px;
			}
		}
	}
	/*滚动条样式*/
	 .soller::-webkit-scrollbar {/*滚动条整体样式*/
	     width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
	     height: 4px;
	 }
	 .soller::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	     border-radius: 10px;
	     -webkit-box-shadow: inset 0 0 5px rgba(153,153,153,0.4);
	     background: rgba(255,255,255,0.2);
	 }
	 .soller::-webkit-scrollbar-track {/*滚动条里面轨道*/
	     -webkit-box-shadow: inset 0 0 5px rgba(153,153,153,0.4);
	     border-radius: 0;
	     background: rgba(255,255,255,0.1);
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

