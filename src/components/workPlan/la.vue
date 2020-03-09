<template>
	<div>
		<el-form :model="ruleForm2" :rules="rulesLa" ref="ruleForm2" label-width="160px" class="demo-ruleForm">
			<el-form-item label="股道：" prop="track">
			    <el-radio-group v-model="ruleForm2.track">
					<el-radio :label="3" >股道1</el-radio>
					<el-radio :label="4">股道3</el-radio>
			    </el-radio-group>
			  </el-form-item>
		  <el-form-item label="拉车数：" prop="totalCar">
		    <el-input v-model="ruleForm2.totalCar"  placeholder="请输入拉车数辆" style="width: 300px;"></el-input>
		  </el-form-item>
		  <el-form-item label="到站点：" prop="arriveStation" >
		    <el-input v-model="ruleForm2.arriveStation"   placeholder="请输入到站点"  style="width: 300px;"></el-input>
		  </el-form-item>
		  <el-form-item label="发货公司 ：" prop="deliveryCompany">
		    <el-select v-model="ruleForm2.deliveryCompany" placeholder="请选择发货公司名称"  style="width: 300px;">
		      <el-option
		          v-for="(item,index) in categorys"
		          :key="index"
		          :label="item.company"
		          :value="item.id"
		      ></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="货品 ：" prop="cargo">
		  		<el-input v-model="ruleForm2.cargo" placeholder="请输入货品名称"  style="width: 300px;"></el-input>
		  </el-form-item>
		 <el-form-item label="拉车时间 ：" prop="pullPushTime" >
		        <el-date-picker type="datetime"  style="width: 300px;" placeholder="请选择日期" v-model="ruleForm2.pullPushTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		 </el-form-item>
		  <el-form-item style="text-align: center;margin-top: 80px;">
		    <el-button type="success" style="width: 300px;background-color: #00BF6F;" @click="submitForm2('ruleForm2')">确认发布</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {findAllShipmentsCompany, businessWorkPlanReqRespCarSave, businessWorkPlanPushPullCarSave, businessWorkPlanAnnouncementSave} from "@/api/index.js"
	export default{
		data(){
			let percent = /^(?:[1-9]?\d|100)$/;
			let isPercent = (rule, value, callback) => {
			  if (!percent.test(value)) {
			    return callback(new Error('请输入0-100的整数'))
			  } else {
			    callback()
			  }
			};
			return{
				ruleForm2: {
				  type:2,
				  track:3,
				  arriveStation:'',
				  totalCar:'',
				  deliveryCompany:'',
				  cargo:'',
				  pullPushTime:'',
				},
				rulesLa: {
				  track: [
					{ required: true, message: '请选择股道', trigger: 'change' }
				  ],
				  totalCar: [
				     { required: true, message: '请输入拉车数量', trigger: 'blur' },{ validator:isPercent,trigger: "blur"}
				  ],
				  arriveStation: [
				    { required: true, message: '请输入到站点', trigger: 'blur' },
				  ],
				  deliveryCompany: [
				    { required: true, message: '请选择发货公司名称', trigger: 'change' }
				  ],
				  cargo: [
				     { required: true, message: '请输入货品名称', trigger: 'blur' },
				  ],
				  pullPushTime: [
				    { required: true, message: '请选择日期', trigger: 'change' }
				  ],
				},
				categorys:[],
			}
		},
		created() {
			this.getQuery()
		},
		methods:{
			getQuery(){
				findAllShipmentsCompany().then((res) => {
				    if (res.code == 200) {
				        this.categorys = res.data
				        // this.suppliers = res.data.sList
				    } else {
						this.$message.error(res.msg);
				        this.categorys = []
				        // this.suppliers = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			submitForm2(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
			       businessWorkPlanPushPullCarSave(this.ruleForm2).then((res) => {
			           if (res.code == 200) {
			           	this.$message.success('操作成功');
			       		 this.$refs[formName].resetFields();
			           }else{
			           	 this.$message.error(res.msg);
			       		 // this.ruleForm = {}
			           }
			       }).catch(() => {
			           // this.loading = false
			       })
				 
			    } else {
			      console.log('error submit!!');
			      return false;
			    }
			  });
			},
		}
	}
</script>

<style>
</style>
