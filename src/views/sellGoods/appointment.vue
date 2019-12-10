<template>
	<div class="person">
		<div class="personHead">
			<span class="ge-head"><label>卸货日期</label><el-date-picker size="small" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker></span>
			<span class="ge-head">
				<label>货品种类</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.category" clearable placeholder="请选择货品种类">
		           <el-option
		             v-for="(item,index) in goods"
		             :key="index"
		             :label="item.category"
		             :value="item.category"
		           ></el-option>
		        </el-select>
			</span>
			<span class="ge-head">
				<label>卸货厂家</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.unloadCompany" clearable placeholder="请选择卸货厂家">
			       <el-option
			         v-for="(item,index) in unloadCompanys"
			         :key="index"
			         :label="item.unloadCompany"
			         :value="item.unloadCompany"
			       ></el-option>
			    </el-select>
			</span>
			<span class="btn-b" @click="handleFilter">查询</span>
			<span class="btn-ba" @click="reset">重置</span>
		</div>
		<p class="personTit">卖货管理>预约卖货 <span class="export" @click="handleDownload()">导出表格</span></p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="supplier" label="供应单位"></el-table-column>
			    <el-table-column  align="center" prop="unloadCompany" label="卸货厂家"></el-table-column>
			    <el-table-column  align="center" prop="carNumber" label="车牌号"></el-table-column>
			    <el-table-column  align="center" prop="driver" label="司机姓名"></el-table-column>
			    <el-table-column  align="center" prop="phone" label="联系方式 " ></el-table-column>
			    <el-table-column  align="center" prop="orenode" label="矿点名称 "></el-table-column>
			    <el-table-column  align="center" prop="category" label="货品种类"></el-table-column>
			    <el-table-column  align="center" prop="price" label="单价(元)">
					<template slot-scope="scope">
						<div v-if="user == 1">
							<i v-if="scope.row.price">{{scope.row.price}}</i>
							<i  v-else>0</i>
						</div>
						<div v-if="user == 2">
							<i style="text-decoration: underline;cursor: pointer;color: #256ff8;" @click="edit(scope.row)" v-if="scope.row.price">{{scope.row.price}}</i>
							<i style="text-decoration: underline;cursor: pointer;color: #256ff8;" @click="edit(scope.row)" v-else>编辑</i>
						</div>
						
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="ton" label="卸货吨数(吨)">
					<template  slot-scope="scope">
						<span v-if="scope.row.ton" >{{scope.row.ton}}</span>
						<span v-else>0</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="amount" label="总金额(元)">
					<template  slot-scope="scope">
						<span v-if="scope.row.amount" >{{scope.row.amount}}</span>
						<span v-else>0</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="unloadDate" label="卸货日期"></el-table-column>
			    <el-table-column  align="center" prop="unloadPic" label="卸货磅单">
					<template  slot-scope="scope">
						<span v-if="scope.row.unloadPic" style="color: #256ff8;cursor: pointer;" @click="bigImg(scope.row.unloadPic)">查看图片</span>
						<span v-else>无</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
	        <img width="100%" :src="dialogImageUrl" alt=""/>
	    </el-dialog>
		<el-dialog title="" :visible.sync="dialogVisibleEdit" width="1200px" :before-close="nativeClose" :close-on-click-modal="false">
		  <div class="orderH">
			  <p class="dioOrder">修改单价</p>
			  <div >
			    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="width: 360px;margin: 100px auto;">
			         <el-form-item label="单价 :" prop="price">
			      	   <el-input v-model="ruleForm.price" style="width: 240px;"></el-input>
			         </el-form-item>
			    </el-form>
			    <p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancel('ruleForm')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure('ruleForm')">确认</span></p>
			  </div>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {salesSelectBySupplier, salesSelectByPage, salesSelectList,salesEdit} from '../../api/index.js'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			let patter = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
			let isNumber = (rule, value, callback) => {
			  if (!patter.test(value)) {
			    return callback(new Error('必须为非负整数或至多保留两位小数'))
			  }else if(value > 10000){
				  return callback(new Error('请输入小于等于10000的值'))
			  } else if(value <= 0){
				  return callback(new Error('请输入大于0的值'))
			  } else {
			    callback()
			  }
			};
			return{
				input:'',
				listQuery:{
					supplier:'',
					beginTime:'',
					endTime:'',
					category:'',
					unloadCompany:'',
					pageNum:1,
					pageSize:10
				},
				ruleForm:{
					id:'',
					price:'',
				},
				rules:{
					price:[{ required: true, message: '请输入单价', trigger: 'blur' },{ validator:isNumber,trigger: "blur"}],
				},
				goods:[],
				unloadCompanys:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogVisibleEdit:false,
				dialogImageUrl:"",
				user:''
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			var isAuth = sessionStorage.getItem("zlIsAuth")
			this.user = sessionStorage.getItem("zlmenu");
			if(isAuth == 1){
				if(this.user == 1){
					this.listQuery.supplier = ''
				}else{
					this.listQuery.supplier = info.company
				}
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
			// this.listQuery.supplier = info.company
			// this.getQuery()
			// this.getUserList()
		},
		methods:{
			nativeClose(done){
				done();
				location.reload()
			},
			cancel(ruleForm){
				this.$refs.ruleForm.resetFields();
				this.dialogVisibleEdit = false
				this.getUserList()
			},
			getQuery(){
				salesSelectBySupplier({supplier:this.listQuery.supplier}).then((res) => {
				    if (res.code == 200) {
				        this.goods = res.data.categoryList
				        this.unloadCompanys = res.data.unloadList
				    } else {
						this.$message.error(res.msg);
				        this.goods = []
				        this.unloadCompanys = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getUserList(){
				this.loading = true
				salesSelectByPage(this.listQuery).then((res) => {
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
				this.listQuery.beginTime = ''
				this.listQuery.endTime = ''
				this.listQuery.unloadCompany = ''
				this.listQuery.category = ''
				this.handleFilter()
			},
			edit(row){
				this.dialogVisibleEdit = true
				this.ruleForm.id = row.id
				this.ruleForm.price = row.price
			},
			inputSure(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
			      salesEdit(this.ruleForm).then((res) => {
				    if (res.code == 200) {
				        this.$message.success(res.msg);
						this.$refs.ruleForm.resetFields();
						this.dialogVisibleEdit = false
						this.getQuery()
						this.getUserList()
				    } else {
						this.$message.error(res.msg);
				    }
				  }).catch(() => {
				        this.loading = false
				  })
			    }
			  });
			},
			bigImg(img){
				this.dialogVisible = true
				this.dialogImageUrl = img
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
			       salesSelectList({"supplier":this.listQuery.supplier,"unloadCompany":this.listQuery.unloadCompany,"beginTime":this.listQuery.beginTime,"endTime":this.listQuery.endTime,"category":this.listQuery.category}).then((res) => {
			  		   if(res.code == 0){
						   this.$message.error('暂无导出数据');
						   loading.close();
						   return
					   }
					   if(res.data == 'success'){
						   loading.close();
			  			   window.location.href="http://192.168.1.128:8080/ymw/sales/export?unloadCompany=" + this.listQuery.unloadCompany + "&beginTime=" + this.listQuery.beginTime + "&endTime=" + this.listQuery.endTime + "&category=" + this.listQuery.category + "&supplier=" + this.listQuery.supplier;
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
	.submit{
		text-align: center;
		margin-top: 40px;
		margin-bottom:60px;
		span{
			background: linear-gradient(-30deg, #2589ff 0%, #24d3ff 100%);
			background-blend-mode: normal, normal;
			border-radius: 20px;
			padding: 9px 70px;
			font-size: 16px;
			color: #fff;
			cursor: pointer;
		}
	}
</style>


