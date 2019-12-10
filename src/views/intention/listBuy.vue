<template>
	<div class="person">
		<div class="personHead">
			<span class="ge-head"><label>发布日期</label><el-date-picker size="small" v-model="listQuery.date" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker></span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
			<span class="btn-b" style="position: absolute;right: 30px;height: 36px;line-height: 22px;top:15px;" @click="gogoodsed">+新增</span>
		</div>
		<p class="personTit">买货管理>意向购买>求购列表</p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="creatDate" label="发布日期"></el-table-column>
			    <el-table-column  align="center" prop="title" label="标题"></el-table-column>
			    <el-table-column  align="center" prop="category" label="需求品类"></el-table-column>
			    <el-table-column  align="center" prop="amount" label="需求数量(吨)"></el-table-column>
			    <el-table-column  align="center" prop="company" label="需求厂家"></el-table-column>
			    <el-table-column  align="center" prop="destination" label="目的地"></el-table-column>
			    <el-table-column  align="center" prop="contacts" label="联系人"></el-table-column>
			    <el-table-column  align="center" prop="phone" label="联系电话"></el-table-column>
			    <el-table-column  align="center" prop="expiryDate" label="截止日期"></el-table-column>
			    <el-table-column align="center" prop="status" label="状态">
					<template slot-scope="scope">
						<div class="tableB" >
							<span v-if='scope.row.status < 0'>已失效</span>
							<span v-else>正常</span>
						</div>
					</template>
				</el-table-column>
			    <el-table-column align="center" label="操作" width="200">
					<template slot-scope="scope">
						<div class="tableB" v-if='scope.row.status >= 0'>
							<span class="tableBtn green" @click="edit(scope.row.id)">编辑</span>
							<span class="tableBtn blue" @click="soldOut(scope.row.id)">删除</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	</div>
</template>

<script>
	import {purchaseSelectPurchasePage, purchaseRemove} from '../../api/index.js'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				input:'',
				listQuery:{
					userId:'',
					date:'',
					pageNum:1,
					pageSize:10
				},
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogImageUrl:""
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.listQuery.userId = info.id
			this.getUserList()
		},
		methods:{
			getUserList(){
				this.loading = true
				purchaseSelectPurchasePage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.list
						var data = res.data.list
						var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
						for(var i=0;i<data.length;i++){
							res.data.list[i].destination = res.data.list[i].destination.replace(reg,"")
						}
						var timestamp = Date.parse(new Date());
						for(var i=0;i<res.data.list.length;i++){
							this.tableData[i].status = new Date(res.data.list[i].expiryDate).getTime() - timestamp
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
			edit(id){
				this.$router.push({path:'/personal/issueBuy', query:{id:id}})
			},
			gogoodsed(){
				this.$router.push('/personal/issueBuy')
			},
			soldOut(id){
				this.$confirm("确认删除此条数据?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    purchaseRemove({id:id}).then((res) => {
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
			},
			handleFilter() {
				this.listQuery.pageNum = 1
				this.getUserList()
			},
			reset(){
				this.listQuery.date = ''
				this.handleFilter()
			},
			bigImg(img){
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
	.personHead{
		position: relative;
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
