<template>
	<div class="person">
		<p class="personTit">财务管理>充值记录</p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="creatDate" label="充值时间"></el-table-column>
			    <el-table-column  align="center" prop="operator" label="操作人"></el-table-column>
			    <el-table-column  align="center" prop="account" label="操作账户"></el-table-column>
			    <el-table-column  align="center" prop="company" label="企业账户"></el-table-column>
			    <el-table-column  align="center" prop="bank" label="开户银行" ></el-table-column>
			    <el-table-column  align="center" prop="bankCard" label="银行卡号"></el-table-column>
			    <el-table-column  align="center" prop="amount" label="充值金额(元)"></el-table-column>
			    <el-table-column  align="center" label="充值凭证">
					<template  slot-scope="scope">
						<span v-if="scope.row.voucher" style="color: #256ff8;cursor: pointer;" @click="bigImg(scope.row.voucher)">查看图片</span>
						<span v-else>--</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
	        <img width="100%" :src="dialogImageUrl" alt=""/>
	    </el-dialog>
	</div>
</template>

<script>
	import {selectRechargePage } from '@/api/index'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				input:'',
				listQuery:{
					userId:'',
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
				selectRechargePage(this.listQuery).then((res) => {
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
			bigImg(img){
				this.dialogImageUrl = img
				this.dialogVisible = true
			}
		},
	}
</script>

<style lang="less" scoped>
	.personTit{
		padding-top: 10px !important;
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


