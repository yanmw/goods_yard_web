<template>
	<div class="person">
		<p class="personTit">货品管理>货品维护 <span class="btn-b" @click="addGoods">+新增</span></p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index"   label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="category" label="货品种类"></el-table-column>
			    <el-table-column  align="center" prop="categoryCode" label="货品种类编码"></el-table-column>
			    <el-table-column  align="center" prop="model" label="货品型号"></el-table-column>
			    <el-table-column  align="center" prop="model_code" label="货品型号编码"></el-table-column>
			    <el-table-column  align="center" prop="supplier" label="货源厂家"></el-table-column>
			    <el-table-column  align="center" prop="createDate" label="添加日期" ></el-table-column>
				<el-table-column  align="center"  label="操作" width="200">
					<template slot-scope="scope">
						<div class="tableB">
							<span class="tableBtn redB" @click="deleted(scope.row.id)">删除</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
		<el-dialog title="" :visible.sync="dialogVisibleEdit" width="1200px" :before-close="closeDialog" :close-on-click-modal="false">
		  <div class="orderH">
			  <p class="dioOrder">货品维护</p>
			  <div>
			    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="width: 360px;margin: 0 auto;">
			         <el-form-item label="货  品  种  类 :" prop="category">
			      	   <el-input v-model="ruleForm.category" style="width: 240px;" maxlength="20"></el-input>
			         </el-form-item>
			         <el-form-item label="货品种类编码 :" prop="categoryCode">
			           <el-input v-model="ruleForm.categoryCode" style="width: 240px;" maxlength="20"></el-input>
			         </el-form-item>
			    	 <el-form-item label="货  品  型  号 :" prop="model">
			    	   <el-input v-model="ruleForm.model" style="width: 240px;" maxlength="20"></el-input>
			    	 </el-form-item>
			    	 <el-form-item label="货品型号编码 :" prop="modelCode">
			    	   <el-input v-model="ruleForm.modelCode" style="width: 240px;" maxlength="20"></el-input>
			    	 </el-form-item>
					 <el-form-item label="货  源  厂  家 :" prop="supplier" v-if="listQuery.role == 1">
					   <el-input v-model="ruleForm.supplier" style="width: 240px;" maxlength="40"></el-input>
					 </el-form-item>
					 <el-form-item label="货  源  厂  家 :" prop="supplier" v-if="listQuery.role == 2">
					   <el-input v-model="ruleForm.supplier" style="width: 240px;" readonly></el-input>
					 </el-form-item>
			    </el-form>
			    <p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancel('ruleForm')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure('ruleForm')">确认</span></p>
			  </div>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {selectGoodsPage, addGoods, deleteGoods} from '../../api/index.js'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination },
		data(){
			return{
				input:'',
				listQuery:{
                    role:'',
					userId:'',
					pageNum:1,
					pageSize:10
				},
				imageUrl: '',
				image:'',
				total:0,
				loading:false,
				tableData:[],
				ruleForm: {
					creator:'',
				    category: '',
				    categoryCode:'',
				    model:'',
					modelCode:'',
					supplier:'',
				},
				rules: {
				    category: [{ required: true, message: '请输入货品种类', trigger: 'blur' }],
				    categoryCode: [{ required: true, message: '请输入货品种类编码', trigger: 'blur' }],
				    model: [{ required: true, message: '请输入货品型号', trigger: 'blur' }],
				    modelCode: [{ required: true, message: '请输入货品型号编码', trigger: 'blur' }],
				    supplier: [{ required: true, message: '请输入货源厂家', trigger: 'blur' }],
				},
				dialogVisibleEdit:false,
				add:false,
				login:''
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			var info = JSON.parse(info1)
			this.login = info
			this.listQuery.role = info.role
			this.listQuery.userId = info.id
			this.ruleForm.creator = info.id
			this.getUserList()
		},
		methods:{
			closeDialog(done){
			    　　done();
			        location.reload();
			},
			getUserList(){
				this.loading = true
				selectGoodsPage(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data.list
						if(this.listQuery.role == 2){
							this.ruleForm.supplier = res.data.list[0].supplier
						}
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
			addGoods(){
				this.ruleForm = {}
				this.ruleForm.creator = this.login.id
				if(this.listQuery.role == 2){
					this.ruleForm.supplier = this.tableData[0].supplier
				}
				this.dialogVisibleEdit = true
			},
			cancel(ruleForm){
				this.$refs.ruleForm.resetFields();
				this.dialogVisibleEdit = false
				this.getUserList()
			},
			deleted(id){
				this.$confirm("确认删除此条数据?", "提示", {
				  type: "warning"
				})
				.then(() => {
				    deleteGoods({id:id}).then((res) => {
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
			inputSure(formName) {			  
				this.$refs[formName].validate((valid) => {			    
					if (valid) {			      
						addGoods(this.ruleForm).then((res) => {
						  if (res.code == 200) {
						      this.$message.success(res.msg);
							  this.$refs.ruleForm.resetFields();
						      this.getUserList()
							  this.dialogVisibleEdit = false
						  } else {
							  this.$message.error(res.msg);
						  }
						}).catch(() => {
						      this.loading = false
						})				
					} 			  
				});			
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

<style lang="less" scoped>
	.personTit{
		padding-top: 10px !important;
	}
	.dioOrder{
		top:-40px;
		padding-bottom: 30px;
	}
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
	.orderH{
		.btn-ba{
			margin-left: 0;
			padding: 3px 10px;
			margin-right: 5px;
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

