<template>
	<div class="home">
		<div class="header">
			<p>
				<img src="../assets/logo.png" alt="">
				<span style="font-size: 30px;margin-left: 20px;">众联天下建材交易网</span>
				<span class="headTitle">
					<span class="headActive">首页</span>
					<span @click="gogo()">个人中心</span>
				</span>
			</p>
			<div class="goLogin">
				<div v-if="!info2">
					<router-link to="/login">您好，请登录</router-link>
					<router-link to="/register">免费注册</router-link>
				</div>
				<div v-else>
					<span>您好，{{info2}}</span>
					<span @click="logout" style="cursor: pointer;">退出</span>
				</div>
			</div>
		</div>
		<div class="homeImg">
			<img src="../assets/index.png" alt="" />
		</div>
		<div class="homeMain">
			<div class="purchase">
				<div class="head">
					<img src="../assets/left.png" alt="" />
					<span>我要买货</span>
					<img class="img2" src="../assets/right.png" alt="" />
					<p>一站式下单、全流程服务</p>
				</div>
				<div class="allIndex">
					<div class="left">
						<span class="swiper-slide"  @click="selected('全部',index)" v-bind:class="{ select:-1==current}">全部</span>
						<div>
							<span class="swiper-slide" v-for="(tab,index) in tabSpan" :key="index" @click="selected(tab.category,index)" v-bind:class="{ select:index==current}">{{tab.category}}</span>
						</div>
					</div>
					<div class="right">
						<el-select v-model="listQuery.supplier" clearable placeholder="请选择" size="mini" style="position: relative;top:-13px;width: 240px;">
							<el-option v-for="item in suppliers" :key="item.supplier" :label="item.supplier" :value="item.supplier">
							</el-option>
						</el-select>
						<img src="../assets/search.png" alt="" @click="handleFilter"/>
					</div>
					<span class="reset" @click="reset">重置</span>
				</div>
				<div class="purchaseL">
					<div class="purchaseList" v-for="(tab,index) in tableData">
						<!-- <div class="hot"><img src="../assets/mark.png" alt="" /></div> -->
						<p class="tit">{{tab.supplier}}</p>
						<p class="fuTit">货源地：{{tab.address}}</p>
						<div class="info">
							<div class="infoList">
								<label>单价：</label><span class="red">{{tab.price}}</span><span class="unit">元/吨</span>
							</div>
							<div class="infoList">
								<label>库存：</label>{{tab.stock}}<span class="unit">吨</span>
							</div>
							<div class="infoList">
								<label>货品种类：</label>{{tab.category}}
							</div>
							<div class="infoList">
								<label>货品型号：</label>{{tab.model}}
							</div>
							<div class="infoList">
								<label>联系人：</label>{{tab.salesman}}
							</div>
							<div class="infoList">
								<label>联系电话：</label>{{tab.phone}}
							</div>
						</div>
						<p class="btn"><span @click="purchase(tab)">我要买货</span></p>
					</div>
					<div v-if="tableData == ''" style="text-align: center;font-size: 18px;margin-top: 180px;"><img src="../assets/暂无数据.png" alt="">	</div>
				</div>
			</div>
			<div class="buy">
				<div class="head">
					<img src="../assets/left.png" alt="">
					<span>我要供货</span>
					<img class="img2" src="../assets/right.png" alt="">
					<p>快速发布、专业匹配、给您最优的选择</p>
				</div>
				<div class="buyL">
					<div class="buyList" v-for="(tab,index) in tableDataBuy">
						<!-- <div class="hot"><img src="../assets/mark.png" alt="" /></div> -->
						<div class="info">
							<div class="info1">
								<span>求</span>
								<div>{{tab.category}}</div>
							</div>
							<div class="info2">
								<p>{{tab.title}}</p>
								<div class="infoN">
									<div class="infoList">
										<label>需求数量：</label><span class="red">{{tab.amount}}</span>吨
									</div>
									<div class="infoList">
										<label>目的地：</label> {{tab.destination}}
									</div>
									<div class="infoList">
										<label>联系人：</label>{{tab.contacts}}
									</div>
									<div class="infoList">
										<label>联系方式：</label> {{tab.phone}}
									</div>
								</div>
							</div>
							<div class="info3">
								<p class="tit">{{tab.company}}</p>
								<p class="timeS">发布时间： {{tab.creatDate}}</p>
								<p class="timeE">有效期至： {{tab.expiryDate}}</p>
							</div>
							<div class="info4">
								<span @click="suppliered(tab)">我要供货</span>
							</div>
						</div>
					</div>
					<div v-if="tableDataBuy == ''" style="text-align: center;font-size: 18px;margin-top: 100px;"><img src="../assets/暂无数据.png" alt="">	</div>
				</div>
			</div>
		</div>
		<el-dialog title="" :visible.sync="dialogVisible" width="1200px" :before-close="nativeClose" :close-on-click-modal="false">
			<div class="orderH">
				<p class="oTit">我要买货 > <span>填写订单</span></p>
				<div class="step">
					<div><span class="stepActive">1</span>
						<p>填写订单</p>
					</div>
					<i></i>
					<div><span>2</span>
						<p>预扣货款</p>
					</div>
					<i></i>
					<div><span>3</span>
						<p>填写运单</p>
					</div>
				</div>
				<p class="dioOrder">填写订单</p>
				<div>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 340px;margin: 0 auto;">
						<el-form-item label="采购单位 :">
							<span style="font-size: 16px;color: #333;">{{ruleForm.purchaser}}</span>
						</el-form-item>
						<el-form-item label="采购数量 :" prop="ton">
							<el-input  v-model="ruleForm.ton" style="width: 200px;"></el-input> (吨)
						</el-form-item>
						<el-form-item label="联  系 人 :" prop="contacts">
							<el-input v-model="ruleForm.contacts" style="width: 200px;" maxlength="12"></el-input>
						</el-form-item>
						<el-form-item label="联系方式 :" prop="phone">
							<el-input v-model="ruleForm.phone" style="width: 200px;"  maxlength="11"></el-input>
							<!-- <p style="color: #9f0000;">总金额：单价:{{ruleForm.price}}*吨数:{{ruleForm.ton}}={{withhold.withprice}}</p> -->
						</el-form-item>
					</el-form>
					<p class="submit"><span @click="submit('ruleForm')">提交订单</span></p>
				</div>
			</div>
		</el-dialog>
		<el-dialog title="" :visible.sync="dialogVisible1" width="1200px" :before-close="nativeClose" :close-on-click-modal="false">
			<div class="orderH">
				<p class="oTit">我要买货 > <span>预扣货款</span></p>
				<div class="step">
					<div><span class="stepActive">1</span>
						<p>填写订单</p>
					</div>
					<i></i>
					<div><span class="stepActive">2</span>
						<p>预扣货款</p>
					</div>
					<i style="background-color: #2589ff;"></i>
					<div><span>3</span>
						<p>填写运单</p>
					</div>
				</div>
				<p class="dioOrder">预扣货款</p>
				<div style="width: 60%;margin: 0 auto;color: #666;font-size: 14px;line-height: 50px;">
					<p>尊敬的{{login.company}}:</p>
					<p style="text-indent: 30px;">众联建材网将从您
						<span class="fontRed">{{login.phone}}</span>
						账户预扣款
						<span class="fontRed">{{withhold.withprice}}</span>
						元，用以支付您采购的{{ruleForm.supplier}}厂家{{ruleForm.category}}品类
						<span class="fontRed">{{ruleForm.ton}}</span>
						吨,确认请点击下一步。如有疑问，请联系您的业务员：
						<span class="fontRed">{{ruleForm.salesman}} {{withhold.phone}}</span>
					</p>
					<p class="submit"><span @click="submit1()">下一步</span></p>
				</div>
			</div>
		</el-dialog>
		<el-dialog title="" :visible.sync="dialogVisible2" width="1200px" :before-close="nativeClose" :close-on-click-modal="false">
			<div class="orderH">
				<p class="oTit">我要买货 > <span>预扣货款</span></p>
				<div class="step">
					<div><span class="stepActive">1</span>
						<p>填写订单</p>
					</div>
					<i></i>
					<div><span class="stepActive">2</span>
						<p>预扣货款</p>
					</div>
					<i style="background-color: #2589ff;"></i>
					<div><span>3</span>
						<p>填写运单</p>
					</div>
				</div>
				<p class="dioOrder">预扣货款</p>
				<div style="width: 40%;margin: 0 auto;text-align: center;">
					<p style="text-align: center;border-bottom: 1px solid #e9e9e9;font-size: 18px;color: #333;padding-bottom: 30px;">请输入支付密码</p>
					<div class="inputD">
						<div class='am_payPwd' :id="`ids_${id}`">
							<input type="password" maxlength="1" @input="changeInput" @oninput="myFunction()" @click="changePwd" v-model="pwdList[i]" @keyup="keyUp($event)"
							 @keydown="oldPwdList = pwdList.length" class="shortInput" v-for="(v, i) in 6" :key="i"  autocomplete="new-password">
						</div>
					</div>
					<p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="dialogVisible2 = false">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure()">确认</span></p>
				</div>
			</div>
		</el-dialog>
		<el-dialog title="" :visible.sync="dialogVisible3" width="1200px" :before-close="nativeClose" :close-on-click-modal="false">
			<div class="orderH">
				<p class="oTit">我要买货 > <span>填写运单</span></p>
				<div class="step">
					<div><span class="stepActive">1</span>
						<p>填写订单</p>
					</div>
					<i style="background-color: #2589ff;"></i>
					<div><span class="stepActive">2</span>
						<p>预扣货款</p>
					</div>
					<i style="background-color: #2589ff;"></i>
					<div><span class="stepActive">3</span>
						<p>填写运单</p>
					</div>
				</div>
				<p class="dioOrder">填写运单</p>
				<div class="waybill1">
					<el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="120px" class="demo-ruleForm fromItem" style="width: 920px;margin: 0 auto;">
						<div style="border-bottom: dashed 1px #c6c6c6;margin-bottom: 20px;">
							<el-form-item label="采购单位 :">
								<span style="font-size: 16px;color: #333;">{{ruleForm1.company}}</span>
							</el-form-item>
							<el-form-item label="货品种类 :">
								<span style="font-size: 16px;color: #333;">{{ruleForm1.category}}</span>
							</el-form-item>
							<el-form-item label="出 发 地 :" prop="becity">
								<el-cascader
								    v-model="ruleForm1becity"
								    :options="options"
								    @change="handleChange"
									:props="props" style="width: 300px;"></el-cascader> 
							</el-form-item>
							<el-form-item label="货源厂家 :">
								<span style="font-size: 16px;color: #333;">{{ruleForm1.supplier}}</span>
							</el-form-item>
							<el-form-item label="目 的 地 :" prop="destination">
								<el-cascader
								    v-model="ruleForm1destination"
								    :options="options"
								    @change="handleChange1"
									:props="props" style="width: 300px;"></el-cascader> 
							</el-form-item>
							<el-form-item label="接货厂家 :" prop="receiveCompany">
								<el-input v-model="ruleForm1.receiveCompany" style="width: 200px;" maxlength="12"></el-input>
							</el-form-item>
							<el-form-item label="起运开始时间 :" prop="beginDate">
								<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm1.beginDate"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>
							</el-form-item>
							<el-form-item label="起运结束时间 :" prop="endDate">
								<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm1.endDate"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>
							</el-form-item>
						</div>
						<div style="border-bottom: dashed 1px #c6c6c6;margin-bottom: 20px;">
							<el-form-item label="发货吨数 :">
								<span style="font-size: 16px;color: #333;">{{ruleForm1.ton}}</span> (吨)
							</el-form-item>
							<el-form-item label="需求车辆 :" prop="cars">
								<el-input v-model="ruleForm1.cars" style="width: 200px;" ></el-input> (辆)
							</el-form-item>
							<el-form-item label="运费单价 :" prop="freight">
								<el-input v-model="ruleForm1.freight" style="width: 200px;"></el-input> (元/吨)
							</el-form-item>
							<el-form-item label="装 卸 费 :" prop="handling">
								<el-input v-model="ruleForm1.handling" style="width: 200px;"></el-input> (元/车)
							</el-form-item>
						</div>
						<div>
							<el-form-item label="付款方式">
								<el-select v-model="ruleForm1.payType" placeholder="请选择付款方式">
									<el-option label="线下现金" value="1"></el-option>
									<el-option label="线下转账" value="2"></el-option>
									<el-option label="线下转账+油卡" value="3"></el-option>
									<el-option label="云到线上结算" value="4"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="付款条件">
								<el-select v-model="ruleForm1.payTerm" placeholder="请选择付款条件">
									<el-option label="卸前付款" value="1"></el-option>
									<el-option label="卸后付款" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="是否开票">
								<el-select v-model="ruleForm1.invoice" placeholder="请选择是否开票">
									<el-option label="是" value="1"></el-option>
									<el-option label="否" value="0"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<el-form-item label="收 货 人 :" prop="receiver">
							<el-input v-model="ruleForm1.receiver" style="width: 200px;" maxlength="12"></el-input>
						</el-form-item>
						<el-form-item label="联系方式 :" prop="receiverPhone">
							<el-input v-model="ruleForm1.receiverPhone" style="width: 200px;" maxlength="11"></el-input>
						</el-form-item>
						<el-form-item label="备 注 :" prop="remarks">
							<el-input type="textarea" v-model="ruleForm1.remarks" style="width: 100%;" maxlength="100"></el-input>
						</el-form-item>
					</el-form>
					<p class="submit"><span @click="submit3('ruleForm1')">发布</span></p>
				</div>
			</div>
		</el-dialog>
		<el-dialog title="" :visible.sync="dialogVisible4" width="1200px" :before-close="nativeClose" :close-on-click-modal="false">
			<div class="orderH">
				<p class="oTit">我要供货 > <span>意向交易</span></p>
				<p class="dioOrder">意向交易</p>
				<div>
					<el-form :model="ruleFormp" :rules="rulesp" ref="ruleFormp" label-width="100px" class="demo-ruleForm" style="width: 360px;margin: 0 auto;">
						<el-form-item label="供应单位 :">
							<span style="font-size: 16px;color: #333;" v-if="isAuth ==1">{{ruleFormp.supplier}}</span>
							<el-input v-else v-model="ruleFormp.supplier" style="width: 200px;" maxlength="11"></el-input>
						</el-form-item>
						<el-form-item label="联系方式 :" prop="phone">
							<el-input v-model="ruleFormp.phone" style="width: 200px;" maxlength="11"></el-input>
						</el-form-item>
						<el-form-item label="供货数量 :" prop="amount">
							<el-input v-model="ruleFormp.amount" style="width: 200px;"></el-input> (吨)
						</el-form-item>
						<el-form-item label="供货价格 :" prop="price">
							<el-input v-model="ruleFormp.price" style="width: 200px;" ></el-input> (元/吨)
						</el-form-item>
					</el-form>
					<p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="cancelButton('ruleForm')">取消</span><span style="margin-left: 50px;padding:5px 40px;" @click="inputSure1('ruleFormp')">确认</span></p>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {logout, selectGoodsCategory, selectGoodsSupplier, selectGoodsSource, settleAdd, settlePay, selectPurchaseList, intentionAdd, deliveryAdd} from '../api/index.js'
	// @ is an alias to /src
	import Area from '../util/city.js'
	import Swiper from 'swiper';
	// import 'swiper/dist/css/swiper.min.css';
	import MyNumberInput from '@/components/MyNumberInput';
	export default{
		components:{
			Area,
			MyNumberInput
		},
		data() {
			let patter = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
			let isNumber = (rule, value, callback) => {
			  if (!patter.test(value)) {
			    return callback(new Error('必须为非负整数或至多保留两位小数'))
			  }else if(value > 10000){
				  return callback(new Error('请输入小于等于10000的值'))
			  }else if(value <= 0){
				  return callback(new Error('请输入大于0的值'))
			  } else {
			    callback()
			  }
			};
			let percent = /^(?:[1-9]?\d|100)$/;
			let isPercent = (rule, value, callback) => {
			  if (!percent.test(value)) {
			    return callback(new Error('请输入0-100的整数'))
			  } else {
			    callback()
			  }
			};
			let phoneNumber = /^1(3|4|5|6|7|8|9)\d{9}$/;
			let isPhoneNumber = (rule, value, callback) => {
			  if (!phoneNumber.test(value)) {
			    return callback(new Error('请输入0-100的整数'))
			  } else {
			    callback()
			  }
			};
			return {
				info2:'',
				pwdList: [],
				oldPwdList: [],
				isDelete: false,
				ipt: '',
				pickerOptionsStart: {
				    disabledDate: time => {
				        let endDateVal = this.ruleForm1.endDate;
				        if (endDateVal) {
				            return time.getTime() > new Date(endDateVal).getTime();
				        }
				    }
				},
				pickerOptionsEnd: {
				    disabledDate: time => {
				        let beginDateVal = this.ruleForm1.beginDate;
				        if (beginDateVal) {
				            return (
				                time.getTime() <
				                new Date(beginDateVal).getTime()
				            );
				        }
				    },
				},
				listQuery:{
					category:'',
					supplier:''
				},
				ruleForm1becity:[],
				ruleForm1destination:[],
				props: {
					label: 'value',
					children: 'children'
				},
				tabSpan: [],
				suppliers:[],
				tableData:[],
				tableDataBuy:[],
				ruleForm: {
					purchaser: '',
					contacts: '',
					phone: '',
					ton: '',
					supplier: '',
					category: '',
					model: '',
					price: '',
					salesman: '',
					userId: '',
				},
				rules: {
					ton: [{required: true,message: '请输入采购数量',trigger: 'blur'},{ validator:isNumber,trigger: "blur"}],
					phone: [{required: true,message: '请输入联系方式',trigger: 'blur'}],
					contacts: [{required: true,message: '请输入联系人',trigger: 'blur'}],
				},
				ruleForm1:{
					userId:'',
					goodSourceId:'',
					phone:'',
					orderNumber:'',
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
				rules1: {
					becity: [{required: true,message: '请选择出发地',trigger: 'change'}],
					destination: [{required: true,message: '请选择目的地',trigger: 'change'}],
					receiveCompany: [{required: true,message: '请输入接货厂家',trigger: 'blur'}],
					beginDate: [{required: true,message: '请输入开始时间',trigger: 'change'}],
					endDate: [{required: true,message: '请输入结束时间',trigger: 'change'}],
					cars: [{required: true,message: '请输入需求车辆',trigger: 'blur'}],
					freight: [{required: true,message: '请输入运费单价',trigger: 'blur'},{ validator:isNumber,trigger: "blur"}],
					handling: [{required: true,message: '请输入装卸费',trigger: 'blur'},{ validator:isNumber,trigger: "blur"}],
					receiver: [{required: true,message: '请输入收货人',trigger: 'blur'}],
					receiverPhone: [{required: true,message: '请输入收货人联系电话',trigger: 'blur'}],
				},
				options:[],
				ruleFormp: {
					userId: '',
					supplier: '',
					phone: '',
					amount:'',
					price:'',
					superiorId:'',
					category:''
				},
				rulesp: {
					phone: [{required: true,message: '请输入联系方式',trigger: 'blur'}],
					amount: [{required: true,message: '请输入供货数量',trigger: 'blur'},{ validator:isNumber,trigger: "blur"}],
					price: [{required: true,message: '请输入供货价格',trigger: 'blur'},{ validator:isNumber,trigger: "blur"}],
				},
				withhold:[],
				current: 0,
				value: '',
				dialogVisible: false,
				dialogVisible1: false,
				dialogVisible2: false,
				dialogVisible3: false,
				dialogVisible4: false,
				login:'',
				isAuth:'',
				typeId:'',
			}
		},
		props: {
			id: String,
			default: 1,
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			this.isAuth = sessionStorage.getItem("zlIsAuth")
			this.typeId = sessionStorage.getItem("zlmenu");
			var info = JSON.parse(info1)
			if(info1 == null){
				console.log('未登录')
			}else{
				this.login = info
				this.info2 = info.phone
			}
			this.options = Area.areaList
			this.getCategory()
			this.getSource()
			this.getUserList()
			this.getBuyUserList()
			console.log(this.current)
		},
		mounted() {
			this.ipt = document.getElementsByClassName('shortInput')
		},
		methods: {
			nativeClose(done){
				done();
				location.reload()
			},
			cancelButton(){
				this.$refs.ruleFormp.resetFields();
				this.dialogVisible4 = false
			},
			selected(row, idx) {
				this.current = idx
				if(row == '全部'){
					this.listQuery.category = ''
					this.current = 0
				}else{
					this.listQuery.category = row
				}
				this.getSource()
				this.getUserList()
			},
			getCategory(){
				selectGoodsCategory().then((res) => {
				    if (res.code == 200) {
				        this.tabSpan = res.data
						this.tabSpan.unshift({category:'全部'})
				    } else {
						this.$message.error(res.msg);
				        this.categorys = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			getSource(){
				selectGoodsSupplier({category:this.listQuery.category}).then((res) => {
				    if (res.code == 200) {
				        this.suppliers = res.data
				    } else {
						this.$message.error(res.msg);
				        this.suppliers = []
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			handleChange(value) {
			  this.ruleForm1.becity = JSON.stringify(value)
			},
			handleChange1(value) {
			  this.ruleForm1.destination = JSON.stringify(value)
			},
			getUserList(){
				// this.loading = true
				selectGoodsSource(this.listQuery).then((res) => {
				    if (res.code == 200) {
				        this.tableData = res.data
						var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
						for(var i=0;i<res.data.length;i++){
							res.data[i].address = res.data[i].address.replace(reg,"")
						}
				        // this.total = res.data.total
				        this.loading = false
				    } else {
						this.$message.error(res.msg);
				        this.tableData = []
				        // this.total = 0
				        this.loading = false
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			gogo() {
				this.$router.push("/personal");
			},
			getBuyUserList(){
				// this.loading = true
				selectPurchaseList().then((res) => {
				    if (res.code == 200) {
				        this.tableDataBuy = res.data
						var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
						for(var i=0;i<res.data.length;i++){
							res.data[i].destination = res.data[i].destination.replace(reg,"")
						}
				        // this.total = res.data.total
				        this.loading = false
				    } else {
						this.$message.error(res.msg);
				        this.tableData = []
				        // this.total = 0
				        this.loading = false
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			handleFilter() {
				this.getUserList()
			},
			reset(){
				this.listQuery.category = ''
				this.current = 0
				this.listQuery.supplier = ''
				this.handleFilter()
				this.getSource()
			},
			purchase(row) {
				if(this.login){
					if(this.typeId != 2){
						this.$message.error('采购仅限普通用户可采购');
						return
					}
					if(this.isAuth == 1){
						this.ruleForm = {}
						this.ruleForm.purchaser = this.login.company
						this.withhold = row
						this.ruleForm.userId = this.login.id
						this.ruleForm.supplier = row.supplier
						this.ruleForm.category = row.category
						this.ruleForm.model = row.model
						this.ruleForm.price = row.price
						this.ruleForm.salesman = row.salesman
						this.dialogVisible = true
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
						 this.$router.push("personal/authentication")
						}).catch(() => {
						  this.$message({
						    type: 'info',
						    message: '已取消'
						  });          
						});
					}
				}else{
					 this.$confirm('您还未登陆此操作将跳转去登陆, 是否继续?', '提示', {
					   confirmButtonText: '确定',
					   cancelButtonText: '取消',
					   type: 'warning'
					 }).then(() => {
					   this.$message({
					     type: 'success',
					     message: '即将跳转登陆'
					   });
					  this.$router.push("/login")
					 }).catch(() => {
					   this.$message({
					     type: 'info',
					     message: '已取消'
					   });          
					 });
				}
			},
			submit(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm.phone))){
					     this.$message.error("请输入正确的手机号") 
							  return
					  }
					  var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
					   var aa = this.ruleForm.contacts.replace(reg,"")
					  if(aa.length > 6){
					  	   this.$message.error("请输入的联系人字符不大于6位")
					  	   return
					  }
			      settleAdd(this.ruleForm).then((res) => {
				    if (res.code == 200) {
				        // this.$message.success(res.msg);
						this.dialogVisible = false
						this.dialogVisible1 = true
						this.withhold.withprice = (this.ruleForm.ton*this.ruleForm.price).toFixed(2)
						this.ruleForm1.orderNumber = res.msg
				        this.getUserList()
				    } else {
						this.$message.error(res.msg);
						// this.ruleForm = {}
				    }
				  }).catch(() => {
				        this.loading = false
				  })
			    }
			  });
			},
			submit1() {
				this.dialogVisible1 = false
				this.dialogVisible2 = true
			},
			inputSure() {
				var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g;
				var ss = String(this.pwdList).replace(reg, "");
				if(isNaN(Number(ss))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
				    this.$message.error('密码需全为数字')
					return
				}
				settlePay({orderNumber:this.ruleForm1.orderNumber,userId:this.login.id,payPassword:ss}).then((res) => {
				    if (res.code == 200) {
				        // this.$message.success(res.msg);
						// console.log(res)
						this.dialogVisible2 = false
						this.dialogVisible3 = true
						this.ruleForm1.company = this.login.company
						this.ruleForm1.phone = this.login.phone
						this.ruleForm1.userId = this.login.id
						this.ruleForm1.category = this.withhold.category
						this.ruleForm1.ton = this.ruleForm.ton
						this.ruleForm1.supplier = this.withhold.supplier
						this.ruleForm1.goodSourceId = this.withhold.id
				        this.getUserList()
				    } else {
						this.$message.error(res.msg);
						// this.ruleForm = {}
				    }
				  }).catch(() => {
				        this.loading = false
				  })
				// this.pwdList = '';
			},
			submit3(formName) {
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					  if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleForm1.phone))){
					       this.$message.error("请输入正确的手机号")   
					  		return
					    }
						if(this.ruleForm1.cars <= 0){
							this.$message.error('车辆请输入必须大于0的数值')
							return 
						} 
						if (!(/^\d+$/.test(this.ruleForm1.cars))) {
						   this.$message.error('车辆数量必须为整数')
						   return false;
						}
						var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
						var aa = this.ruleForm1.receiver.replace(reg,"")
						if(aa.length > 6){
							   this.$message.error("请输入的收货人字符不大于6位")
							   return
						}
						const loading = this.$loading({
						          lock: true,
						          text: '加载中。。。。',
						          spinner: 'el-icon-loading',
						          background: 'rgba(0, 0, 0, 0.7)'
						        });
				    deliveryAdd(this.ruleForm1).then((res) => {
					    if (res.code == 200) {
					        this.$message.success(res.msg);
							this.dialogVisible3 = false
					        this.getUserList()
							loading.close()
					    } else {
							this.$message.error(res.msg);
							// this.ruleForm = {}
							loading.close()
					    }
					  }).catch(() => {
					        this.loading = false
					  })
				  }
				});
				
				
			},
			suppliered(row) {
				if(this.login){
					if(this.typeId != 2){
						this.$message.error('供货仅限普通用户可供货');
						return
					}
					if(this.login.id == row.userId){
						this.$message.error('供货不可选择自己发布的供货');
						return
					}
					// if(this.isAuth == 1){
						this.ruleFormp = {}
						this.ruleFormp.purchaser = row.company
						this.ruleFormp.userId = this.login.id
						if(this.isAuth == 1){
						     this.ruleFormp.supplier = this.login.company
					    }
						this.ruleFormp.superiorId = row.id
						this.ruleFormp.category = row.category
						this.dialogVisible4 = true
					// }else{
						// this.$confirm('还未认证请您前去认证, 是否继续?', '提示', {
						//   confirmButtonText: '确定',
						//   cancelButtonText: '取消',
						//   type: 'warning'
						// }).then(() => {
						//   this.$message({
						//     type: 'success',
						//     message: '即将跳转认证'
						//   });
						//  this.$router.push("personal/authentication")
						// }).catch(() => {
						//   this.$message({
						//     type: 'info',
						//     message: '已取消'
						//   });          
					// 	});
					// }
				}else{
					 this.$confirm('您还未登陆此操作将跳转去登陆, 是否继续?', '提示', {
					   confirmButtonText: '确定',
					   cancelButtonText: '取消',
					   type: 'warning'
					 }).then(() => {
					   this.$message({
					     type: 'success',
					     message: '即将跳转登陆'
					   });
					  this.$router.push("/login")
					 }).catch(() => {
					   this.$message({
					     type: 'info',
					     message: '已取消'
					   });          
					 });
				}
			},
			inputSure1(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
					if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.ruleFormp.phone))){
					     this.$message.error("请输入正确的手机号")      
						 return
					}
					if(this.ruleFormp.supplier == ''){
						  this.$message.error("请输入公司名称")
						  return
					}
			      intentionAdd(this.ruleFormp).then((res) => {
				    if (res.code == 200) {
				        this.$message.success(res.msg);
						this.dialogVisible4 = false
				        this.getBuyUserList()
				    } else {
						this.$message.error(res.msg);
						this.ruleFormp = {}
				    }
				  }).catch(() => {
				        this.loading = false
				  })
			    }
			  });
			},
			keyUp(ev) {
				let index = this.pwdList.length
				if (!index) return
				if (ev.keyCode === 8) {
					this.isDelete = true
					if (this.oldPwdList === this.pwdList.length) {
						if (index === this.pwdList.length) {
							this.pwdList.pop()
						}
						index--
					} else {
						index > 0 && index--
					}
					this.ipt[index].focus()
				} else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
					this.isDelete = false
					this.pwdList.pop()
					this.pwdList.push(ev.key)
					this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
				}
				// console.log(this.pwdList)
				// this.$emit('getPwd', this.pwdList.join(''))
			},
			changePwd() {
				let index = this.pwdList.length
				index === 6 && index--
				this.ipt[index].focus()
			},
			changeInput() {
				let index = this.pwdList.length
				let val = this.pwdList[index - 1]
				if (!/[0-9]/.test(val)) {
					this.pwdList.pop()
					return
				}
				if (!val) {
					this.pwdList.pop()
					index--
					if (index > 0) this.ipt[index - 1].focus()
				} else {
					if (index < 6) this.ipt[index].focus()
				}
				var str = "";
				if (val.length > str.length) {
				  //输入值
				  str += val.charAt(val.length - 1);
				} else {
				  //回删值
				  str = str.substr(0, val.length);
				}
			},
			myFunction() {
				var str = "";
				var val = this.pwdList; //取到输入框的值
				if (val.length > str.length) {
				  //输入值
				  str += val.charAt(val.length - 1);
				} else {
				  //回删值
				  str = str.substr(0, val.length);
				}
				//将输入框除最后一位的字符替换成*
				this.pwdList =
				  val.substr(0, val.length - 1).replace(/./g, "*") +
				  val.charAt(val.length - 1);
				/* 取当前输入框长度，用于判断是否正在输入
				停止输入时，一秒后将最后一个字符变成*号 */
				var len = this.pwdList.length;
				setTimeout(() => {
				  /*这时的this指向在延迟器触发时输入框的状态，
				而不是延迟器创建时的状态*/
				  if (this.pwdList.length == len) {
				    //一秒后输入框的值长度不变，将所有字符替换为*
				    this.pwdList = this.pwdList.replace(/./g, "*");
				  }
				}, 1000);
			},
			// 退出登录
			  logout: function() {
			    this.$confirm("确认退出吗?", "提示", {
			      type: "warning"
			    })
			    .then(() => {
			      // sessionStorage.removeItem("user")
				  sessionStorage.removeItem('zlInfo');
				  sessionStorage.removeItem('zlmenu');
			      this.$router.push("/login")
			      logout().then((res) => {
			     	  if(res.code == 200){
			     		  this.$router.push("/login")
			     		  this.$message.success(res.msg);
			     		  // console.log(res)
			     	  }
			         }).catch(function(res) {
			     		// console.log(res)
			       })
			     }) 
			     .catch(() => {})
			  },
		}
	}
</script>
<style lang="less" scoped>
	body{
		height: 100%;
	}
	a {
		text-decoration: none;
	}

	.fontRed {
		color: #ff0000;
		font-size: 16px;
		margin: 0 5px;
	}

	.fromItem {
		.el-form-item {
			display: inline-block;
			width: 49%;
		}
	}
    #app{
      background-color: #f5f8ff ;
    }
	.orderH {
		padding: 0 50px;

		.oTit {
			position: relative;
			top: -40px;
			font-size: 16px;

			span {
				color: #2d8ef9;
			}
		}

		.step {
			margin: 0 auto;
			display: flex;
			position: relative;

			div {
				width: 520px;
				text-align: center;
				z-index: 9;

				span {
					padding: 5px 10px;
					background-color: #c6c6c6;
					color: #fff;
					border-radius: 50%;
				}

				p {
					color: #666666;
					font-size: 16px;
					margin-top: 15px;
				}
			}

			i {
				display: inline-block;
				width: 350px;
				height: 2px;
				background-color: #c6c6c6;
				margin-top: 10px;
				position: absolute;
				left: 170px;
				z-index: 1;
			}

			i:nth-child(2) {
				left: 540px;
			}
		}
	}

	a {
		text-decoration: none;
	}

	.goLogin {
		position: absolute;
		right: 60px;
        width: 240px;
			a {
				color: #333333;
				font-size: 12px;
				margin-left: 40px;
				text-decoration: none;
			}
			span {
				color: #333333;
				font-size: 12px;
				margin-left: 40px;
			}
	}

	.header {
		background-color: #fff;
		height: 80px;
		line-height: 80px;
		position: relative;
		display: flex;
		// padding: 20px 0 25px 0;
        
		img {
			width: 80px;
			height: 80px;
			float: left;
		}

		p {
			width: 65%;
			margin: 0 auto;
			min-width: 1200px;
			.headTitle {
				position: absolute;
				right: 300px;
				span {
					margin-right: 100px;
					font-size: 20px;
					color: #333333;
					cursor: pointer;
				}
			}
		}
	}

	.headActive {
		color: #2589ff !important;
		border-bottom: 2px solid #2589ff;
		padding-bottom: 5px;
	}

	.submit {
		text-align: center;
		margin-top: 40px;
		margin-bottom: 60px;

		span {
			background: linear-gradient(-30deg, #2589ff 0%, #24d3ff 100%);
			background-blend-mode: normal, normal;
			border-radius: 20px;
			padding: 9px 70px;
			font-size: 16px;
			color: #fff;
			cursor: pointer;
		}
	}

	.dioOrder {
		color: #333333;
		font-size: 22px;
		border-bottom: 1px #c6c6c6 dashed;
		text-align: center;
		padding: 30px 0;
		margin-bottom: 60px;
	}

	.stepActive {
		background-color: #2589ff !important;
	}

	.is-text {
		background-color: #2388fe;
		color: #fff;
	}

	.home {
		width: 100%;
		height: 100%;
		background-color: #f9f9f9;
	}

	.homeImg {
		img {
			width: 100%;
			min-width: 1200px;
		}
	}
    .waybill1{
		max-height: 350px;
		overflow: auto;
	}
	 /*滚动条样式*/
	 .waybill1::-webkit-scrollbar {/*滚动条整体样式*/
	     width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
	     height: 4px;
	 }
	 .waybill1::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
	     border-radius: 10px;
	     -webkit-box-shadow: inset 0 0 5px rgba(153,153,153,0.4);
	     background: rgba(255,255,255,0.2);
	 }
	 .waybill1::-webkit-scrollbar-track {/*滚动条里面轨道*/
	     -webkit-box-shadow: inset 0 0 5px rgba(153,153,153,0.4);
	     border-radius: 0;
	     background: rgba(255,255,255,0.1);
	 }
	.homeMain {
		width: 65%;
		margin: 0 auto;
		min-width: 1200px;

		.head {
			position: relative;
			img {
				width: 41%;
			}
            .img2 {
            	position: absolute;
				top:6px;
				right: 0;
            }
			span {
				font-size: 30px;
				font-weight: bold;
				color: #1a1a1a;
				margin: 0 38px;
			}

			p {
				text-align: center;
				margin-top: 10px;
				color: #666666;
			}
		}
	}

	.purchase {
		margin-top: 40px;
		width: 100%;
	}

	.allIndex {
		background-color: #fff;
		height: 50px;
		line-height: 50px;
		margin-top: 20px;
		display: flex;

		.left {
			position: relative;
			// white-space: nowrap;
			// overflow-x: auto;
			width: 70%;
			span {
				margin-right: 55px;
				cursor: pointer;
				font-size: 16px;
				color: #959595;
				border-radius: 3px;
			}
            div{
				white-space: nowrap;
				overflow-x: auto;
				width: 98%;
			}
			/*滚动条样式*/
			 div::-webkit-scrollbar {/*滚动条整体样式*/
			     width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
			     height: 4px;
			 }
			 div::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
			     border-radius: 10px;
			     -webkit-box-shadow: inset 0 0 5px rgba(153,153,153,0.8);
			     background: rgba(255,255,255,0.2);
			 }
			 div::-webkit-scrollbar-track {/*滚动条里面轨道*/
			     -webkit-box-shadow: inset 0 0 5px rgba(153,153,153,0.4);
			     border-radius: 0;
			     background: rgba(255,255,255,0.1);
			 }
			span:nth-child(1) {
				display: inline-block;
				position: absolute;
				top:0;
				left: 0;
				background-color: #fff;
				width: 80px;
				text-align: center;
			}
			span:nth-child(2) {
				margin-left: 100px;
			}
		}
		

		.right {
			height: 30px;
			margin-top: 11px;
			z-index: 999;
			border-radius: 5px;
			border: 1px solid #e50043;

			img {
				height: 28px;
				vertical-align: top;
				cursor: pointer;
			}
		}

		.reset {
			color: #e50043;
			font-size: 16px;
			margin-left: 30px;
			cursor: pointer;
		}
	}

	.select {
		color: #258fff !important;
	}
    /*滚动条样式*/
     .purchaseL::-webkit-scrollbar {/*滚动条整体样式*/
         width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
         height: 4px;
     }
     .purchaseL::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
         border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(153,153,153,0.4);
         background: rgba(255,255,255,0.2);
     }
     .purchaseL::-webkit-scrollbar-track {/*滚动条里面轨道*/
         -webkit-box-shadow: inset 0 0 5px rgba(153,153,153,0.4);
         border-radius: 0;
         background: rgba(255,255,255,0.1);
     }
	.purchaseL {
		margin-top: 10px;
        height: 520px;
		overflow-x: hidden;
		overflow-y: auto;
		.purchaseList {
			display: inline-block;
			width: 33.33%;
			cursor: pointer;
			background-color: #ffffff;
			border: 1px solid #eee;
			margin-top: -1px;
			margin-left: -1px;
			position: relative;

			.hot {
				// float: right;
				position: absolute;
				right: 0;
			}

			.tit {
				text-align: center;
				font-size: 16px;
				color: #333333;
				font-weight: 600;
				margin: 20px 0 5px 0;
			}

			.fuTit {
				text-align: center;
				font-size: 14px;
				color: #666666;
			}

			.info {
				// width: 80%;
				margin: 0 auto;

				.infoList {
					display: inline-block;
					width: 45%;
					color: #333;
					padding-left: 6%;
					margin-top: 20px;
					font-size: 16px;
                    overflow: hidden;
                    white-space: nowrap;
					text-overflow:ellipsis;
					label {
						color: #666;
						font-size: 14px;
					}
					.unit {
						font-size: 14px;
					}
					.red {
						color: #ff0000;
					}
				}

				&>.infoList:nth-child(2n){
				    width: 52% !important;
					padding-left: 3%!important;
				}
			}

			.btn {
				text-align: center;
				margin: 20px 0;

				span {
					border-radius: 3px;
					border: solid 1px #2589ff;
					color: #2589ff;
					font-size: 16px;
					padding: 5px 10px;
				}
			}
		}
	}

	.purchaseList:hover {
		box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.18);
		transform: scale(1.05);
		z-index: 99;
	}

	.buyList:hover {
		box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.18);
		transform: scale(1.02);
		z-index: 99;
	}

	.buy {
		margin-top: 40px;
		padding-bottom: 60px;
	}

	.buyL {
		margin-top: 20px;
		.buyList {
			background-color: #FFF;
			position: relative;
			margin-bottom: 10px;
			box-shadow: -1px 1px 0px 0px rgba(231, 231, 231, 0.39);
			cursor: pointer;
            border: 1px solid #eee;
			.hot {
				position: absolute;
				right: 0;
			}
			.info {
				display: flex;
				padding: 20px;
				.info1 {
					width: 20%;
					span {
						color: #fefeff;
						font-size: 12px;
						background-color: #ff3c00;
						border-radius: 2px;
						padding: 3px;
					}
					div {
						text-align: center;
						margin-top: 20px;
						color: #333;
						font-size: 20px;
						font-weight: 600;
					}
				}
				.info2 {
					width: 44%;
					p {
						color: #333333;
						font-size: 16px;
						font-weight: 600;
					}
					.infoN {
						margin: 0 auto;
						.infoList {
							display: inline-block;
							width: 40%;
							color: #333;
							margin-top: 20px;
							font-size: 16px;
							label {
								color: #666;
								font-size: 14px;
							}
							.red {
								color: #ff0000;
							}
						}
						&>.infoList:nth-child(2n){
							width: 60% !important;
						}
					}
				}
				.info3 {
					width: 20%;
					color: #666;
					font-size: 14px;
					.timeS {
						margin-top: 20px;
					}
					.timeE {
						margin-top: 25px;
					}
				}
				.info4 {
					width: 20%;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #2589ff;
				}
			}
		}
	}
	.el-select .el-input__inner {
		cursor: pointer;
		padding-right: 35px;
		border: 1px solid #000 !important;
	}

	.am_payPwd {
		display: inline-block;
		text-align: center;
		width: 285px;
		margin: 0 auto;
		margin-top: 30px;
		height: 60px;
		border-radius: 5px;
		padding: 10px 0;
		position: relative;
		margin-left: 1px;

		.shortInput {
			text-align: center;
			font-size: 25px;
			border: solid 1px #e3e3e3;
			float: left;
			width: 40px;
			height: 40px;
			margin-right: 7px;
			color: #333;
			outline: #ff0067;
		}
	}
</style>
