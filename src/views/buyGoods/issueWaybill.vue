<template>
	<div class="person">
		<div class="wayNav">
			<span class="tabspan">发布运单</span>
			<router-link to="Waybill">
			    <span >发货记录</span>
			</router-link>
		</div>
		<div style="padding: 10px 0;padding-bottom: 40px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm fromItem" style="width: 920px;margin: 0 auto;">
			    <div style="border-bottom: dashed 1px #c6c6c6;margin-bottom: 20px;">
			        <el-form-item label="采购单位 :">
			        	<span style="font-size: 16px;color: #333;">{{ruleForm.company}}</span>
			        </el-form-item>
			        <el-form-item label="货品种类 :">
			        	<span style="font-size: 16px;color: #333;">{{ruleForm.category}}</span>
			        </el-form-item>
			        <el-form-item label="出 发 地 :" prop="becity">
			        	<el-cascader
			        	    v-model="ruleForm1becity"
			        	    :options="options"
			        	    @change="handleChange"
			        		:props="props" style="width: 300px;"></el-cascader> 
			        </el-form-item>
			        <el-form-item label="货源厂家 :">
			        	<span style="font-size: 16px;color: #333;">{{ruleForm.supplier}}</span>
			        </el-form-item>
			        <el-form-item label="目 的 地 :" prop="destination">
			        	<el-cascader
			        	    v-model="ruleForm1destination"
			        	    :options="options"
			        	    @change="handleChange1"
			        		:props="props" style="width: 300px;"></el-cascader> 
			        </el-form-item>
			        <el-form-item label="接货厂家 :" prop="receiveCompany">
			        	<el-input v-model="ruleForm.receiveCompany" style="width: 200px;"></el-input>
			        </el-form-item>
			        <el-form-item label="起运开始时间 :" prop="beginDate">
			        	<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.beginDate"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			        </el-form-item>
			        <el-form-item label="起运结束时间 :" prop="endDate">
			        	<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.endDate"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
			        </el-form-item>
			    </div>
			    <div style="border-bottom: dashed 1px #c6c6c6;margin-bottom: 20px;">
			       <el-form-item label="发货吨数 :">
			       	<span style="font-size: 16px;color: #333;">{{ruleForm.ton}}</span> (吨)
			       </el-form-item>
			       <el-form-item label="需求车辆 :" prop="cars">
			       	<el-input v-model="ruleForm.cars" style="width: 200px;" type="number"></el-input> (辆)
			       </el-form-item>
			       <el-form-item label="运费单价 :" prop="freight">
			       	<el-input v-model="ruleForm.freight" style="width: 200px;" type="number"></el-input> (元/吨)
			       </el-form-item>
			       <el-form-item label="装 卸 费 :" prop="handling">
			       	<el-input v-model="ruleForm.handling" style="width: 200px;" type="number"></el-input> (元/车)
			       </el-form-item>
			    </div> 
			    <div>
			        <el-form-item label="付款方式">
			        	<el-select v-model="ruleForm.payType" placeholder="请选择付款方式">
			        		<el-option label="线下现金" value="1"></el-option>
			        		<el-option label="线下转账" value="2"></el-option>
			        		<el-option label="线下转账+油卡" value="3"></el-option>
			        		<el-option label="云到线上结算" value="4"></el-option>
			        	</el-select>
			        </el-form-item>
			        <el-form-item label="付款条件">
			        	<el-select v-model="ruleForm.payTerm" placeholder="请选择付款条件">
			        		<el-option label="卸前付款" value="1"></el-option>
			        		<el-option label="卸后付款" value="2"></el-option>
			        	</el-select>
			        </el-form-item>
			        <el-form-item label="是否开票">
			        	<el-select v-model="ruleForm.invoice" placeholder="请选择是否开票">
			        		<el-option label="是" value="1"></el-option>
			        		<el-option label="否" value="0"></el-option>
			        	</el-select>
			        </el-form-item>
			    </div>
			    <el-form-item label="收 货 人 :" prop="receiver">
			    	<el-input v-model="ruleForm.receiver" style="width: 200px;" maxlength="12"></el-input>
			    </el-form-item>
			    <el-form-item label="联系方式 :" prop="receiverPhone">
			    	<el-input v-model="ruleForm.receiverPhone" style="width: 200px;" maxlength="11"></el-input>
			    </el-form-item>
			    <el-form-item label="备 注 :" prop="remarks">
			    	<el-input v-model="ruleForm.remarks" style="width: 100%;" type="textarea" maxlength="100" resize="none"></el-input>
			    </el-form-item>
		    </el-form>
		    <p class="submit"><span @click="submit3('ruleForm')">发布</span></p>
		</div>
	</div>
</template>

<script>
	import {deliveryAdd} from '../../api/index.js'
	import Area from '../../util/city.js'
	export default {
	  name: 'home',
	  components:{
		  Area
	  },
	  data(){
		  return{
			  ruleForm:{
			  	userId:'',
			  	goodSourceId:'',
			  	phone:'',
			  	company:'',
			  	category:'',
			  	becity:'',
			  	supplier:'',
			  	destination:'',
			  	receiveCompany:'',
			  	beginDate:'',
			  	endDate:'',
			  	ton:'',
			  	cars:'',
			  	freight:'',
			  	handling:'',
			  	receiver:'',
			  	receiverPhone:'',
			  	payType:'',
			  	payTerm:'',
			  	invoice:'',
			  	remarks:'',
			  },
			  rules: {
			  	becity: [{required: true,message: '请选择出发地',trigger: 'change'}],
			  	destination: [{required: true,message: '请选择目的地',trigger: 'change'}],
			  	receiveCompany: [{required: true,message: '请输入接货厂家',trigger: 'blur'}],
			  	beginDate: [{required: true,message: '请输入开始时间',trigger: 'change'}],
			  	endDate: [{required: true,message: '请输入结束时间',trigger: 'change'}],
			  	cars: [{required: true,message: '请输入需求车辆',trigger: 'blur'}],
			  	freight: [{required: true,message: '请输入运费单价',trigger: 'blur'}],
			  	handling: [{required: true,message: '请输入装卸费',trigger: 'blur'}],
			  	receiver: [{required: true,message: '请输入收货人',trigger: 'blur'}],
			  	receiverPhone: [{required: true,message: '请输入收货人联系电话',trigger: 'blur'}],
			  },
			  props: {
			  	label: 'value',
			  	children: 'children'
			  },
			  ruleForm1destination:[],
			  ruleForm1becity:[],
			  options:[]
		  }
	  },
	  created() {
		    var info1 = sessionStorage.getItem("zlInfo");
		    var info = JSON.parse(info1)
	  	    this.ruleForm.phone = info.phone
	  	    this.ruleForm.userId = info.id
			this.options = Area.areaList
	  },
	  methods:{
		  submit3(formName) {
		  	this.$refs[formName].validate((valid) => {
		  	  if (valid) {
		  	    deliveryAdd(this.ruleForm1).then((res) => {
		  		    if (res.code == 200) {
		  		        this.$message.success(res.msg);
		  				this.dialogVisible3 = false
		  		        this.getUserList()
		  		    } else {
		  				this.$message.error(res.msg);
		  				// this.ruleForm = {}
		  		    }
		  		  }).catch(() => {
		  		        this.loading = false
		  		  })
		  	  }
		  	})
		  },
		  handleChange(value) {
		    this.ruleForm.becity = JSON.stringify(value)
		  },
		  handleChange1(value) {
		    this.ruleForm.destination = JSON.stringify(value)
		  },
	  }
	}
</script>

<style lang="less" scoped>
	.person{
		background-color: #fff;
		box-shadow: 0px 2px 8px 0px 
				rgba(54, 196, 209, 0.14);
		border-radius: 10px;
		padding-top: 20px;
	}
	.fromItem{
		.el-form-item{
			display: inline-block;
			width: 49%;
		}
	}
	.submit{
		text-align: center;
		margin-top: 20px;
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
