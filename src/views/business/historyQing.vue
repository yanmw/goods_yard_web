<template>
	<div>
		<p class="spanTab">业务部 > 计划申报 > <span>历史计划</span></p>
		<div class="indexPerson" style="padding: 0;">
			<div class="wayNav" style="padding: 0;">
				<span v-for="(li,index) in tabSpan" @click="chooseSpan(index)" v-bind:class="{ tabspan:index==current}">{{li.name}}</span>
			</div>
			<div v-if="qing">	
			   <qing-list></qing-list>
			</div>
			<div v-if="cheng">
			   <cheng-list></cheng-list>
			</div>
			<div v-if="song">
				<song-list></song-list>
			 </div>
			 <div v-if="la">
			 	<la-list></la-list>
			  </div>
			<div v-if="gongGao">
			   <div class="personHead" style="box-shadow: none;margin-bottom: 20px;">
			   	<span class="ge-head"><label>标题</label><el-input style="width:150px" v-model="listQuery2.title"  size="small" placeholder="请输入标题" clearable></el-input></span>
			   	<span class="ge-head"><label>发布人</label><el-input style="width:150px" v-model="listQuery2.name"  size="small" placeholder="请输入发布人" clearable></el-input></span>
			   	<span class="btn-b" @click="handleFilter2">查询</span>
			   	<span class="btn-ba" @click="reset2">重置</span>
			   </div>
			   	<div class="blueTable" style="width: 98.5%;border-radius: 5px;">
			   		<el-table :data="tableData2" :header-cell-style="{background:'#00BF6F',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			   		    <el-table-column  align="center" type="index" label="序号">
			   				<template slot-scope="scope">
			   				    <span>{{(listQuery2.pageNum - 1) * listQuery2.pageSize + scope.$index + 1}}</span>
			   				</template>
			   			</el-table-column>
			   		    <el-table-column  align="center" prop="title" label="标题"></el-table-column>
			   		    <el-table-column  align="center" prop="content" label="内容"></el-table-column>
			   		    <el-table-column  align="center" prop="remark" label="备注"></el-table-column>
			   		    <el-table-column  align="center" prop="name" label="发布人"></el-table-column>
			   		    <el-table-column  align="center" prop="createTime" label="创建时间"></el-table-column>
			   		</el-table>
			   	</div>
			   	<pagination v-show="total2>0" :total="total2" :page.sync="listQuery2.pageNum" :limit.sync="listQuery2.pageSize" @pagination="getUserList2" />  
			</div>
		</div>
	</div>
</template>

<script>
	import qingList from '@/components/historyPlan/qingList'
	import chengList from '@/components/historyPlan/chengList'
	import songList from '@/components/historyPlan/songList'
	import laList from '@/components/historyPlan/laList'
	import {businessWorkPlanReqRespCar, businessWorkPlanPushPullCar, businessWorkPlanAnnouncement} from "@/api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination, qingList, chengList, songList, laList },
		data(){
			return{
				listQuery2:{
					title:'',
					name:'',
					pageNum:1,
					pageSize:10
				},
				tabSpan:[
					{name:'请求车'},
					{name:'承认车'},
					{name:'送车'},
					{name:'拉车'},
					{name:'公告信息'},
				],
				total2:0,
				loading:false,
				tableData2:[],
				current:0,
				qing:true,
				cheng:false,
				song:false,
				la:false,
				gongGao:false
			}
		},
		created() {
			var info1 = sessionStorage.getItem("qrInfo");
			var info = JSON.parse(info1)
		    // this.getUserList()
		},
		methods:{
			chooseSpan(idx){
				this.current = idx
				if(idx == 0){
					this.qing = true
					this.cheng = false
					this.song = false
					this.la = false
					this.gongGao = false
				}else if(idx == 1){
					this.qing = false
					this.cheng = true
					this.song = false
					this.la = false
					this.gongGao = false
				}else if(idx == 2){
					this.qing = false
					this.cheng = false
					this.song = true
					this.la = false
					this.gongGao = false
				}else if(idx == 3){
					this.qing = false
					this.song = false
					this.la = true
					this.gongGao = false
				}else if(idx == 4){
					this.handleFilter2();
					this.qing = false
					this.cheng = false
					this.song = false
					this.la = false
					this.gongGao = true
				}
			},
			
			getUserList2() {
				this.loading = true
				businessWorkPlanAnnouncement(this.listQuery2).then((res) => {
				    if (res.code == 200) {
				        this.tableData2 = res.data.content
				        this.total2 = res.data.totalSize
				        this.loading = false
				    } else {
						this.$message.error(res.msg);
				        this.tableData2 = []
				        this.total2 = 0
				        this.loading = false
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			handleFilter2() {
				this.listQuery2.pageNum = 1
				this.getUserList2()
			},
			reset2(){
				this.listQuery2.title = ''
				this.listQuery2.name = ''
				this.handleFilter2()
			},
		},
		
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
