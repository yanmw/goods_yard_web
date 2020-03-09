<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
		  <el-form-item label="发货公司名称：" prop="deliveryCompany">
			<el-select v-model="ruleForm.deliveryCompany" placeholder="请选择发货公司名称"  style="width: 255px">
			  <el-option
			      v-for="(item,index) in categorys"
			      :key="index"
			      :label="item.company"
			      :value="item.id"
			  ></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="到站点：" prop="arriveStation" >
		    <el-input v-model="ruleForm.arriveStation"  style="width: 255px" placeholder="请输入到站点"></el-input>
		  </el-form-item>
		  <el-form-item label="高边车信息：" required >
		    <el-col :span="11">
		      <el-form-item prop="heightCarNum">
				  <el-input v-model="ruleForm.heightCarNum" placeholder="请输入高边车车数"></el-input>
		      </el-form-item>
		    </el-col>
			<el-col class="line" :span="2"> &#x3000;</el-col>
		    <el-col :span="11">
		      <el-form-item prop="heightCarCargo">
				  <el-input v-model="ruleForm.heightCarCargo" placeholder="请输入高边车货物"></el-input>
		      </el-form-item>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="集装箱信息：" required>
		    <el-col :span="11">
		      <el-form-item prop="containerNum">
		  			<el-input v-model="ruleForm.containerNum" placeholder="请输入集装箱车数"></el-input>
		      </el-form-item>
		    </el-col>
			<el-col class="line" :span="2">&#x3000;</el-col>
		    <el-col :span="11">
		      <el-form-item prop="containerCargo">
		  			<el-input v-model="ruleForm.containerCargo"  placeholder="请输入集装箱货物"></el-input>
		      </el-form-item>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="承认车计划时间：" prop="planTime">
		  	  <el-select v-model="ruleForm.planTime" placeholder="请选择承认车计划时间" style="width: 255px">
		  	    <el-option label="点前" value="1"></el-option>
		  	    <el-option label="点后" value="2"></el-option>
		  	  </el-select>
		  </el-form-item>
		  <el-form-item style="text-align: center;margin-top: 80px;">
		    <el-button type="success" style="width: 300px;background-color: #00BF6F;" @click="submitForm('ruleForm')">确认发布</el-button>
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
				categorys:[],
				ruleForm: {
				  type:2,
				  arriveStation:'',
				  containerCargo:'',
				  containerNum:'',
				  deliveryCompany:'',
				  heightCarCargo:'',
				  heightCarNum:'',
				  planTime:'',
				},
				rules: {
				  arriveStation: [
				    { required: true, message: '请输入到站点', trigger: 'blur' },
				  ],
				  deliveryCompany: [
				    { required: true, message: '请选择发货公司名称', trigger: 'change' }
				  ],
				  heightCarNum: [
				     { required: true, message: '请输入高边车车数', trigger: 'blur' },{ validator:isPercent,trigger: "blur"}
				  ],
				  heightCarCargo: [
				      { required: true, message: '请输入高边车货物', trigger: 'blur' },
				  ],
				  containerNum: [
				     { required: true, message: '请输入集装箱车数', trigger: 'blur' },{ validator:isPercent,trigger: "blur"}
				  ],
				  containerCargo: [
				      { required: true, message: '请输入集装箱货物', trigger: 'blur' },
				  ],
				  planTime: [
				    { required: true, message: '请选择承认车计划时间', trigger: 'change' }
				  ],
				},
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
			submitForm(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
			       businessWorkPlanReqRespCarSave(this.ruleForm).then((res) => {
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
