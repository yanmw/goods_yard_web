<template>
	<div>
		<el-form :model="ruleForm1" :rules="rulesSong" ref="ruleForm1" label-width="160px" class="demo-ruleForm">
		  <el-form-item label="股道：" prop="track">
		      <el-radio-group v-model="ruleForm1.track">
		        <el-radio :label="1">机货一</el-radio>
		        <el-radio :label="2">机货三</el-radio>
		      </el-radio-group>
		    </el-form-item>
		  <el-form-item label="送车数：" prop="totalCar">
		    <el-input v-model="ruleForm1.totalCar"   style="width: 300px;" placeholder="请输入送车数辆"></el-input>
		  </el-form-item>
		  <el-form-item label="到站点：" prop="arriveStation">
		    <el-input v-model="ruleForm1.arriveStation"   style="width: 300px;" placeholder="请输入到站点"></el-input>
		  </el-form-item>
		  <el-form-item label="发货公司：" required>
		    <el-col :span="8">
		      <el-form-item label="" prop="deliveryCompany">
		      	  <el-select v-model="ruleForm1.deliveryCompany" placeholder="请选择发货公司名称" >
		      	    <el-option
		      	        v-for="(item,index) in categorys"
		      	        :key="index"
		      	        :label="item.company"
		      	        :value="item.id"
		      	    ></el-option>
		      	  </el-select>
		      </el-form-item>
		    </el-col>
			<el-col class="line" :span="1"> &#x3000;</el-col>
		    <el-col :span="6" >
		      <el-form-item prop="actualCar">
				  <el-input v-model="ruleForm1.actualCar" placeholder="请输入用车数量"></el-input>
		      </el-form-item>
		    </el-col>
			<el-col class="line" :span="1"> &#x3000;</el-col>
			<el-col :span="6">
			  <el-form-item prop="cargo">
				  <el-input v-model="ruleForm1.cargo" placeholder="请输入货品名称"></el-input>
			  </el-form-item>
			</el-col>
		  </el-form-item>
		 <el-form-item label="送车时间 ：" prop="pullPushTime">
		        <el-date-picker type="datetime"  style="width: 300px;" placeholder="请选择日期" v-model="ruleForm1.pullPushTime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		 </el-form-item>
		  <el-form-item label="亏吨车数 ：" prop="loseCar" >
		    <el-input v-model="ruleForm1.loseCar"   style="width: 300px;" placeholder="请输入亏吨车数"></el-input>
		  </el-form-item>
		  <el-form-item label="超吨车数 ：" prop="overCar" >
		    <el-input v-model="ruleForm1.overCar"   style="width: 300px;" placeholder="请输入超吨车数"></el-input>
		  </el-form-item>
		  <el-form-item label="坏车数 ：" prop="badCar">
		    <el-input v-model="ruleForm1.badCar"   style="width: 300px;" placeholder="请输入坏车数"></el-input>
		  </el-form-item>
		  <el-form-item style="text-align: center;margin-top: 60px;">
		    <el-button type="success" style="width: 300px;background-color: #00BF6F;" @click="submitForm1('ruleForm1')">确认发布</el-button>
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
				ruleForm1: {
				  type:1,
				  track:'',
				  arriveStation:'',
				  actualCar:'',
				  totalCar:'',
				  badCar:'',
				  deliveryCompany:'',
				  cargo:'',
				  loseCar:'',
				  pullPushTime:'',
				  overCar:''
				},
				rulesSong: {
				  track: [
					{ required: true, message: '请选择股道', trigger: 'change' }
				  ],
				  totalCar: [
				     { required: true, message: '请输入送车数量', trigger: 'blur' },{ validator:isPercent,trigger: "blur"}
				  ],
				  arriveStation: [
				    { required: true, message: '请输入到站点', trigger: 'blur' },
				  ],
				  deliveryCompany: [
				    { required: true, message: '请选择发货公司名称', trigger: 'change' }
				  ],
				  actualCar: [
				     { required: true, message: '请输入用车数量', trigger: 'blur' },{ validator:isPercent,trigger: "blur"}
				  ],
				  cargo: [
				     { required: true, message: '请输入货品名称', trigger: 'blur' },
				  ],
				  badCar: [
				      { required: true, message: '请输入坏车数', trigger: 'blur' },{ validator:isPercent,trigger: "blur"}
				  ],
				  loseCar: [
				      { required: true, message: '请输入亏吨车数', trigger: 'blur' },{ validator:isPercent,trigger: "blur"}
				  ],
				  overCar: [
				      { required: true, message: '请输入超吨车数', trigger: 'blur' },{ validator:isPercent,trigger: "blur"}
				  ],
				  pullPushTime: [
				    {  required: true, message: '请选择日期', trigger: 'change' }
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
			submitForm1(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
			       businessWorkPlanPushPullCarSave(this.ruleForm1).then((res) => {
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
