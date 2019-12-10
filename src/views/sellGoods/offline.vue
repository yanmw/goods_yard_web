<template>
	<div class="person">
		<div class="personHead" style="min-width: 1450px;">
			<span class="ge-head"><label>卸货日期</label><el-date-picker size="small" v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker></span>
			<span class="ge-head"><label>车牌号</label><el-input style="width:150px" v-model="listQuery.carNumber"  size="small" placeholder="请输入车牌号" clearable></el-input></span>
			<span class="ge-head">
				<label>货品种类</label>
			    <el-select size="small"  style="width:150px" v-model="listQuery.goods" clearable placeholder="请选择货品种类">
		           <el-option
		             v-for="(item,index) in goods"
		             :key="index"
		             :label="item.goods"
		             :value="item.goods"
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
			<span class="btn-b" style="position: absolute;right: 30px;height: 36px;line-height: 22px;top:15px;" @click="added(1)" v-if='user == 2'>+ 新增</span>
		</div>
		<p class="personTit">卖货管理>线下卖货
		   <!-- <span class="export" style="right: 260px;" @click="handleDownload1()">下载模板</span> -->
		   <span  v-if='user == 2' style="position: absolute;right: 120px;">
			    <el-upload
			            ref="upload"
						name="fileName"
						:show-file-list="false"
						action="#"
						:before-upload="beforeUpload"
			            style="display: inline-block;width:90px;">
			        <div>导入表格</div>
			    </el-upload>
		   </span> 
		   <span class="export" @click="handleDownload()">导出表格</span>
		   
		</p>
		<div class="blueTable" style="width: 98.5%;border: 1px solid #256ff8;border-radius: 5px;">
			<el-table :data="tableData" :header-cell-style="{background:'#256ff8',color:'#fff',borderRight:'none'}" stripe v-loading="loading"  style="width: 100%;border-radius: 5px;" align="center" border>
			    <el-table-column  align="center" type="index" label="序号">
					<template slot-scope="scope">
					    <span>{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="supplier" label="供应单位"></el-table-column>
			    <el-table-column  align="center" prop="unloadCompany" label="卸货厂家"></el-table-column>
			    <el-table-column  align="center" prop="goods" label="货品种类"></el-table-column>
			    <el-table-column  align="center" prop="carNumber" label="车牌号码"></el-table-column>
			    <el-table-column  align="center" prop="unloadNumber" label="卸货磅单编号"></el-table-column>
			    <el-table-column  align="center" prop="price" label="货品单价(元)" >
					<template  slot-scope="scope">
						<span v-if="scope.row.price" >{{scope.row.price}}</span>
						<span v-else>0</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="ton" label="卸货吨数(吨)">
					<template  slot-scope="scope">
						<span v-if="scope.row.ton" >{{scope.row.ton}}</span>
						<span v-else>0</span>
					</template>
				</el-table-column>
			    <el-table-column  align="center" prop="amounts" label="总金额(元)">
					<template  slot-scope="scope">
						<span v-if="scope.row.amounts" >{{scope.row.amounts}}</span>
						<span v-else>0</span>
					</template>
				</el-table-column>
				<el-table-column  align="center" prop="unloadTime" label="卸货日期"></el-table-column>
<!-- 			    <el-table-column  align="center" prop="actualReceipts" label="实收账款(元)"></el-table-column>
			    <el-table-column  align="center" prop="accountsReceivable" label="应收账款(元)"></el-table-column>
			    <el-table-column  align="center" prop="operator" label="操作人"></el-table-column> -->
			    <el-table-column align="center" label="操作" width="100" v-if='user == 2'>
			    	<template slot-scope="scope">
			    		<div class="tableB">
			    			<span class="tableBtn green" @click="added(scope.row)">修改</span>
			    		</div>
			    	</template>
			    </el-table-column>
			</el-table>
		</div>
		<pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getUserList" />
	    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false">
	        <img width="100%" :src="dialogImageUrl" alt=""/>
	    </el-dialog>
		<el-dialog title="" :visible.sync="dialogVisibleEdit" width="1200px" :before-close="closeDialog" :close-on-click-modal="false">
		  <div class="orderH">
			  <p class="dioOrder" v-if="add == true" >交易录入</p>
			  <p class="dioOrder" v-if="add == false">交易修改</p>
			  <div >
			    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="width: 390px;margin: 30px auto;">
			         <el-form-item label="卸货日期 :" prop="unloadTime">
			      	   <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.unloadTime"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 240px;"></el-date-picker>
			         </el-form-item>
					 <el-form-item label="卸货厂家 :" prop="unloadCompany">
					   <el-input v-model="ruleForm.unloadCompany" style="width: 240px;" maxlength="20"></el-input>
					 </el-form-item>
					 <el-form-item label="货品名称 :" prop="goods">
					   <el-input v-model="ruleForm.goods" style="width: 240px;" maxlength="12"></el-input>
					 </el-form-item>
					 <el-form-item label="车牌号码 :" prop="carNumber">
					   <el-input v-model="ruleForm.carNumber" style="width: 240px;" ></el-input> 
					 </el-form-item>
					 <el-form-item label="卸货磅单编号 :" prop="unloadNumber">
					   <el-input v-model="ruleForm.unloadNumber" style="width: 240px;" maxlength="15"></el-input> 
					 </el-form-item>
					 <el-form-item label="货品单价 :" prop="price">
					   <el-input v-model="ruleForm.price" style="width: 240px;" ></el-input> (元)
					   <!-- <MyNumberInput :point="2" :max="99999" placeholder="请输入金额" v-model.number="ruleForm.price"></MyNumberInput> -->
					 </el-form-item>
					 <el-form-item label="卸货吨数 :" prop="ton">
					   <el-input v-model="ruleForm.ton" style="width: 240px;"></el-input> (吨)
					 </el-form-item>
					 <el-form-item label="总金额 :" prop="amounts">
					   <el-input v-model="ruleForm.amounts" style="width: 240px;" readonly></el-input> (元)
					 </el-form-item>
					 <!-- <el-form-item label="操作人 :" prop="operator">
					   <el-input v-model="ruleForm.operator" style="width: 240px;" maxlength="12"></el-input>
					 </el-form-item> -->
			    </el-form>
			    <p class="submit" v-if="add == true"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancle('ruleForm')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure('ruleForm')">确认</span></p>
			    <p class="submit" v-if="add == false"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancle('ruleForm')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure1('ruleForm')">确认</span></p>
			  </div>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import { selectByPage, selectBySupplier, lineAdd, lineEdit, lineSelectList, exportRu} from '@/api/index'
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	import MyNumberInput from '@/components/MyNumberInput';
	import axios from '../../util/ajax.js'
	export default{
		components: { Pagination , MyNumberInput ,axios},
		
		data(){
			let patter = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
			let isNumber = (rule, value, callback) => {
			  if (!patter.test(value)) {
			    return callback(new Error('必须为非负整数或至多保留两位小数'))
			  } else if(value > 10000){
				  return callback(new Error('请输入小于等于10000的值'))
			  }else if(value <= 0){
				  return callback(new Error('请输入大于0的值'))
			  }  else {
			    callback()
			  }
			};
			let isNumber1 = (rule, value, callback) => {
			  if (!patter.test(value)) {
			    return callback(new Error('必须为非负整数或至多保留两位小数'))
			  } else if(value <= 0){
				  return callback(new Error('请输入大于0的值'))
			  }  else {
			    callback()
			  }
			};
			return{
				input:'',
				listQuery:{
					supplier:'',
					beginTime:'',
					endTime:'',
					goods:'',
					unloadCompany:'',
					carNumber:'',
					pageNum:1,
					pageSize:10
				},
				ruleForm:{
					supplier:'',
					unloadTime:'',
					unloadCompany:'',
					goods:'',
					price:'',
					ton:'',
					amounts:'',
					carNumber:'',
					unloadNumber:'',
				},
				rules:{
					unloadTime:[{ required: true, message: '请选择卸货日期', trigger: 'change' }],
					unloadCompany:[{ required: true, message: '请输入卸货厂家', trigger: 'blur' }],
					goods:[{ required: true, message: '请输入货品名称', trigger: 'blur' }],
					price:[{ required: true, message: '请输入货品单价', trigger: 'blur' },{ validator:isNumber,trigger: "blur"}],
					ton:[{ required: true, message: '请输入货品吨数', trigger: 'blur' },{ validator:isNumber,trigger: "blur"}],
					amounts:[{ required: true, message: '请输入总金额', trigger: 'blur' }],
					carNumber:[{ required: true, message: '请输入车牌号码', trigger: 'blur' }],
					unloadNumber:[{ required: true, message: '请输入卸货磅单编号', trigger: 'blur' }],
					// operator:[{ required: true, message: '请输入操作人', trigger: 'blur' }],
				},
				add:true,
				unloadCompanys:[],
				goods:[],
				total:0,
				loading:false,
				tableData:[],
				dialogVisible:false,
				dialogImageUrl:"",
				dialogVisibleEdit:false,
				login:'',
				user:'',
				fileList: [],
				      withCredentials: true,
				      processing: false,
				      uploadTip:'点击上传',
				      importFlag:1,
			}
		},
		watch:{
			'ruleForm.price':{
				handler:function(newVal,oldVal){
					if(newVal == undefined){
						this.ruleForm.amounts = 0
					}else if(newVal == ''){
					   this.ruleForm.amounts = 0
				   } else if(isNaN(Number(newVal))){
						this.ruleForm.amounts = 0
					}else{
						if(this.ruleForm.ton == undefined){
							this.ruleForm.amounts = this.ruleForm.price
						}else{
							this.ruleForm.amounts = (this.ruleForm.price*this.ruleForm.ton).toFixed(2)
						}
					}
				}
			},
			'ruleForm.ton':{
				handler:function(newVal,oldVal){
				   if(newVal == undefined){
				   	   this.ruleForm.amounts = 0
				   }else if(this.ruleForm.price == undefined){
				   	   this.ruleForm.amounts = 0
				   }else if(newVal == ''){
					   this.ruleForm.amounts = 0
				   }else if(isNaN(Number(newVal))){
						this.ruleForm.amounts = 0
					}else{
				   	this.ruleForm.amounts = (this.ruleForm.price*this.ruleForm.ton).toFixed(2)
				   }
				}
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			this.user = sessionStorage.getItem("zlmenu");
			var info = JSON.parse(info1)
			var isAuth = sessionStorage.getItem("zlIsAuth")
			if(isAuth == 1){
				this.login = info
				if(this.user == 1){
					this.listQuery.supplier = ''
				}else{
					this.listQuery.supplier = info.company
				}
				// this.listQuery.supplier = info.company
				this.ruleForm.supplier = info.company
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
			closeDialog(done){
			    　　done();
			        location.reload();
			},
			cancle(ruleForm){
				this.$refs.ruleForm.resetFields();
				this.dialogVisibleEdit = false
				this.getUserList()
				// location.reload();
			},
			getQuery(){
				selectBySupplier({supplier:this.listQuery.supplier}).then((res) => {
				    if (res.code == 200) {
				        this.goods = res.data.goodsList
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
				selectByPage(this.listQuery).then((res) => {
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
			bigImg(img){
				this.dialogImageUrl = img
			},
			handleFilter() {
				this.listQuery.pageNum = 1
				this.getUserList()
			},
			reset(){
				this.listQuery.beginTime = ''
				this.listQuery.endTime = ''
				this.listQuery.unloadCompany = ''
				this.listQuery.goods = ''
				this.getQuery()
				this.handleFilter()
			},
			added(row){
				this.ruleForm = {}
				this.ruleForm.supplier = this.login.company
				if(row == 1){
					this.add = true
					this.ruleForm.amounts = 0
				}else{
					this.add = false
					this.ruleForm = row
					this.ruleForm.id = row.id
					// var aa = row.unloadDate
					// this.ruleForm.unloadTime = aa
					// console.log(row)
				}
				this.dialogVisibleEdit = true
			},
			inputSure(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					// var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					//  var aa = this.ruleForm.operator.replace(reg,"")
					// if(aa.length > 6){
					// 	   this.$message.error("请输入的操作人字符不大于6位")
					// 	   return
					// }
					// if(this.ruleForm.accountsReceivable > this.ruleForm.amounts){
					// 	this.$message.error("请输入的应收账款小于总金额")
					// 	return
					// }
					// if(this.ruleForm.actualReceipts > this.ruleForm.amounts){
					// 	this.$message.error("请输入的实收账款小于总金额")
					// 	return
					// }
					var re=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
					if(this.ruleForm.carNumber.search(re)==-1){
					    this.$message.error("输入的车牌号格式不正确");
					    return false;
					}
			      lineAdd(this.ruleForm).then((res) => {
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
			inputSure1(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					// var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					//  var aa = this.ruleForm.operator.replace(reg,"")
					// if(aa.length > 6){
					// 	   this.$message.error("请输入的操作人字符不大于6位")
					// 	   return
					// }
					// if(this.ruleForm.accountsReceivable > this.ruleForm.amounts){
					// 	this.$message.error("请输入的应收账款小于总金额")
					// 	return
					// }
					// if(this.ruleForm.actualReceipts > this.ruleForm.amounts){
					// 	this.$message.error("请输入的实收账款小于总金额")
					// 	return
					// }
					var re=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
					if(this.ruleForm.carNumber.search(re)==-1){
					    this.$message.error("输入的车牌号格式不正确");
					    return false;
					}
			      lineEdit(this.ruleForm).then((res) => {
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
			beforeUpload(file){
				this.$confirm("确认导入表格吗?", "提示", {
				     type: "warning"
				})
				.then(() => {
				    const loading = this.$loading({
				            lock: true,
				            text: '导入中。。。。',
				            spinner: 'el-icon-loading',
				            background: 'rgba(0, 0, 0, 0.7)'
				    });	
				    let excelfileExtend = ".xls,.xlsx"//设置文件格式
				    let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
				    if (excelfileExtend.indexOf(fileExtend) <= -1) {
					   loading.close();
				       this.$message.error('文件格式错误')
				       return false
				    }
				    var formdata = new FormData();
				    formdata.append('file',file);
				    formdata.append('userId',this.login.id);
					// console.log(formdata)
					// var userId  = this.login.id
				    exportRu(formdata).then((res) => {   
				        if (res.code == 200) {
				           this.$message.success(res.msg);
						   this.reset()
				    	   loading.close();
				        } else {
				    		this.$message.error(res.msg);
				    		loading.close();
				        }
				    }).catch(() => {
				        this.loading = false
				    	loading.close();
				    })
				}).catch(() => {})
			//       axios.post('http://192.168.1.128:8080/ymw/line/import',formdata,{ headers : { 'Content-type':'multipart/form-data'}},function(req,res){
							// 	console.log(req)
							// 	console.log(res)
							// });
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
			       lineSelectList({"supplier":this.listQuery.supplier,"carNumberList":this.listQuery.carNumberList,"unloadCompany":this.listQuery.unloadCompany,"beginTime":this.listQuery.beginTime,"endTime":this.listQuery.endTime,"goods":this.listQuery.goods}).then((res) => {
			  		   if(res.code == 0){
			  		   		this.$message.error('暂无导出数据');
			  		   		loading.close();
			  		   		return
			  		   }
					   if(res.data == 'success'){
						   loading.close();
			  			   window.location.href="http://192.168.1.128:8080/ymw/line/export?unloadCompany=" + this.listQuery.unloadCompany + "&carNumberList=" + this.listQuery.carNumberList + "&beginTime=" + this.listQuery.beginTime + "&endTime=" + this.listQuery.endTime + "&goods=" + this.listQuery.goods + "&supplier=" + this.listQuery.supplier;
			  		   }else{
			  			   this.$message.error('暂无导出数据');
						   loading.close();
			  		   }
			       }).catch(() => {
			         loading.close();
			       })		  
			    })
			    .catch(() => {})
			},
			handleDownload1() {
			    // this.listQuery.sendstationname = String(this.loadcarstations)
			    this.$confirm("确认下载模板吗?", "提示", {
			         type: "warning"
			    })
			    .then(() => {
			  		window.location.href="http://192.168.1.128:8080/ymw/line/import/template"		  
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
	.el-upload-list{
	    display: none;
	}
</style>



