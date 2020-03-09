<template>
	<div>
		<p class="spanTab">业务部 > 计划申报 > <span>发布作业计划</span></p>
		<div class="indexPerson" style="padding: 0;">
			<div class="wayNav" style="padding: 0;">
				<span v-for="(li,index) in tabSpan" @click="chooseSpan(index)" v-bind:class="{ tabspan:index==current}">{{li.name}}</span>
			</div>
			<div class="fromInput" v-if="qing">
				<Qing></Qing>
			</div>
			<div class="fromInput" v-if="cheng">
				<Cheng></Cheng>
			</div>
			<div class="fromInput" v-if="song" style="margin-top: 40px;">
				<Song></Song>
			</div>
			<div class="fromInput" v-else-if="la">
				<La></La>
			</div>
			<div class="fromInput" v-else-if="gongGao">
				<el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" label-width="140px" class="demo-ruleForm">
				  <el-form-item label="标题：" prop="title" >
				    <el-input v-model="ruleForm3.title" placeholder="请输入标题" maxlength="20"></el-input>
				  </el-form-item>
				  <el-form-item label="内容：" prop="content" class="content"  style="margin-top: 40px;">
				    <el-input type="textarea" rows="6" resize="none" placeholder="请输入内容" maxlength="200" v-model="ruleForm3.content"></el-input>
				  </el-form-item>
				  <el-form-item label="备注：" prop="remark" style="margin-top: 10px;">
				    <el-input type="textarea" rows="6" resize="none" v-model="ruleForm3.remark" maxlength="200" placeholder="请输入备注"></el-input>
				  </el-form-item>
				  <el-form-item style="text-align: center;margin-top: 80px;">
				    <el-button type="success" style="width: 300px;background-color: #00BF6F;" @click="submitForm3('ruleForm3')">确认发布</el-button>
				    <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import Qing from '@/components/workPlan/qing.vue'
	import Cheng from '@/components/workPlan/cheng.vue'
	import Song from '@/components/workPlan/song.vue'
	import La from '@/components/workPlan/la.vue'
	import {findAllShipmentsCompany, businessWorkPlanReqRespCarSave, businessWorkPlanPushPullCarSave, businessWorkPlanAnnouncementSave} from "@/api/index.js"
	import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
	export default{
		components: { Pagination, Qing, Cheng, Song, La },
		data(){
			return{
				tabSpan:[
					{name:'请求车'},
					{name:'承认车'},
					{name:'送车'},
					{name:'拉车'},
					{name:'公告信息'},
				],
				ruleForm3: {
				  title:'',
				  content:'',
				  remark:'',
				},
				rules3: {
				  title: [
				     { required: true, message: '请输入标题', trigger: 'blur' },
				  ],
				  content: [
				    { required: true, message: '请输入内容', trigger: 'blur' },
				  ],
				  remark: [
				     { required: true, message: '请输入备注', trigger: 'blur' },
				  ],
				},
				current:0,
				categorys:[],
				qing:true,
				cheng:false,
				song:false,
				la:false,
				gongGao:false
			}
		},
		created() {
			this.getQuery()
		},
		methods:{
			chooseSpan(idx){
				this.ruleForm = {}
				this.ruleForm1 = {}
				this.ruleForm2 = {}
				this.ruleForm3 = {}
				this.current = idx
				if(idx == 0){
					this.qing = true
					this.cheng = false
					this.song = false
					this.la = false
					this.gongGao = false
				}else if(idx == 1){
					this.qing = false
					this.cheng = true
					this.song = false
					this.la = false
					this.gongGao = false
				}else if(idx == 2){
					this.qing = false
					this.cheng = false
					this.song = true
					this.la = false
					this.gongGao = false
				}else if(idx == 3){
					this.cheng = false
					this.qing = false
					this.song = false
					this.la = true
					this.gongGao = false
				}else if(idx == 4){
					this.qing = false
					this.cheng = false
					this.song = false
					this.la = false
					this.gongGao = true
				}
			},
			submitForm3(formName) {
			  this.$refs[formName].validate((valid) => {
			    if (valid) {
			       businessWorkPlanAnnouncementSave(this.ruleForm3).then((res) => {
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
		},
		computed: {
		    dateTime: {
		        get() {
		          if (this.listQuery.beginDate && this.listQuery.endDate) {
		             return [this.listQuery.beginDate, this.listQuery.endDate]
		           } else {
		             return []
		          }
		        },
		        set(v) {
		          // console.log(v)
		          this.listQuery.beginDate = v[0]
		          this.listQuery.endDate = v[1]
		        }
		   }
		}
	}
</script>

<style lang="less" scoped>
	.person{
		background-color: #fff;
		box-shadow: 0px 2px 8px 0px 
				rgba(54, 196, 209, 0.14);
		border-radius: 10px;
	}
	.export{
		position: absolute;
		right: 20px;
	}
	.authTit{
		position: relative;
		margin-bottom: 20px;
		i{
			display: inline-block;
			width: 3px;
			height: 13px;
			background-color: #256ff8;
			vertical-align: bottom;
			margin-right: 8px;
			position: relative;
			top:-2px;
		}
		span{
			position: absolute;
			right: 10px;
			top:10px;
			color: #2589ff;
			font-size: 12px;
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
