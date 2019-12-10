<template>
	<div class="indexPerson">
		<div class="content" v-if="type == 1">
			<div class="head adminUser">
				<div style="text-align: center;">
					<div class="img" v-on:mouseover="toggleInfo" v-on:mouseleave="toggleInfo1">
						<img :src="ruleForm.picUrl" alt="">
						<div class="muBan" v-if="edit" @click="editDio">编辑</div>
				    </div>
				</div>
				<div class="accountInfo">
					<p><label>所属公司：</label>{{loginInfo.company}}</p>
					<p><label>登录账号：</label>{{loginInfo.phone}}</p>
					<p><label>上次登录时间：</label>{{loginInfo.lastLogin}}</p>
				</div>
			</div>
		</div>
	    <div class="content" v-if="type == 2">
			<div class="head">
				<div class="img" v-on:mouseover="toggleInfo" v-on:mouseleave="toggleInfo1">
					<img :src="ruleForm.picUrl" alt="">
					<div class="muBan" v-if="edit" @click="editDio">编辑</div>
				</div>
				<p>您好，{{loginInfo.phone}}</p>
			</div>
			<i></i>
			<div class="accountInfo">
				<div>认证信息</div>
				<p><label>所属公司：</label>{{loginInfo.company}}</p>
				<p><label>上次登录时间：</label>{{loginInfo.lastLogin}}</p>
			</div>
			<i></i>
			<div class="moneyInfo" >
				<div>账户余额</div>
				<p><label>冻结金额：</label><span v-if="loginInfo.freezeAmount">{{loginInfo.freezeAmount}}</span><span v-else>0</span> 元</p>
				<p><label>可用金额：</label><span v-if="loginInfo.usableAmount">{{loginInfo.usableAmount}}</span><span v-else>0</span> 元</p>
			</div>
		</div>
		<el-dialog title="" :visible.sync="dialogVisible" width="800px" :close-on-click-modal="false">
		    <div class="orderH">
			    <p class="oTit">用户首页 > <span>上传头像</span></p>
				<div style="text-align: center;height: 120px;position: relative;top:-80px;left: -50px;">
					<el-upload
					    class="avatar-uploader" 
					    action="http://192.168.1.128:8080/ymw/pic/photoUpload?pic="
					    :show-file-list="false"
					    :on-success="handleAvatarSuccess"
					    :before-upload="beforeAvatarUpload">
						    <img v-if="ruleForm.picUrl" :src="ruleForm.picUrl" class="avatar">
						    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<!-- <div v-if="image">{{image}}</div>
							<div v-else>
								<span class="btn-ba">上传证件</span>
								<span slot="tip" class="el-upload__tip">上传jpg/png，不能超过2M</span>
							</div> -->
					</el-upload>
				</div>
			    
				<p class="submit"><span style="border: 1px solid #ccc;background: #fff;color: #ccc;padding:3px 40px;" @click="dialogVisible = false">取消</span><span style="margin-left: 100px;padding:5px 40px;" @click="inputSure()">确认</span></p>
		    </div>
		</el-dialog>
	</div>
</template>

<script>
	import {getMoney , uploadImg} from "../api/index.js"
	export default{
		components:{
			
		},
		data(){
			return{
			    edit:false,
				dialogVisible:false,
				imageUrl:'',
				image:'',
				info:'',
				type:'',
				loginInfo:'',
				picture:'',
				ruleForm:{
					picUrl:'',
					id:'',
					userId:'',
				}
			}
		},
		created() {
			var info1 = sessionStorage.getItem("zlInfo");
			this.type = sessionStorage.getItem("zlmenu");
			if(info1 == null){
				this.$router.push("/login")
			}
			this.info = JSON.parse(info1)
			// this.ruleForm.picUrl = this.picture
			// this.ruleForm.id = this.info.id
			this.ruleForm.userId = this.info.id
			// this.ruleForm.userId = res.data.picture.accountId
			this.getMoneyed()
		},
		methods:{
			getMoneyed(){
				getMoney({userId:this.info.id}).then((res) => {
				    if (res.code == 200) {
				        this.loginInfo = res.data.account
						this.ruleForm.picUrl = res.data.picture.picUrl
						this.ruleForm.id = res.data.picture.id
						
				    } else {
						this.$message.error(res.msg);
				        this.loginInfo = ''
				    }
				}).catch(() => {
				    this.loading = false
				})
			},
			toggleInfo(){
				this.edit = true
			},
			toggleInfo1(){
				this.edit = false
			},
			editDio(){
				this.dialogVisible = true
			},
			handleAvatarSuccess(res, file) {
				if(res.code == 200){
					this.ruleForm.picUrl = res.msg
					
				}else{
					this.$message.error(res.msg);
				}
			  // this.imageUrl = URL.createObjectURL(file.raw);
			  // this.image = file.raw.name;
			},
			beforeAvatarUpload(file) {
			  const isLt2M = file.size / 1024 / 1024 < 2;
			  if (!isLt2M) {
			    this.$message.error('上传头像图片大小不能超过 2MB!');
			  }
			  return isLt2M;
			},
			inputSure(){
				uploadImg(this.ruleForm).then((res) => {
					if (res.code == 200) {
					    this.$message.success('操作成功');
						// this.ruleForm = {}
						this.getMoneyed()
						this.dialogVisible = false
						
					} else {
					    this.$message.error(res.msg);
					}
				}).catch(() => {
					 this.loading = false
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.indexPerson{
		width: 98%;
		height: 800px;
		background-color: #ffffff;
		border-radius: 10px;
	}
	.avatar-uploader{
		margin:100px 50px;
		margin-bottom: 150px;
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
	.adminUser{
		width: 100%!important;
		margin-top: 20px;
		.accountInfo{
			width: 40%!important;
			margin-left: 36% !important;
			padding-left: 0px !important;
			text-align: left !important;
			p{
				margin-top: 45px !important;
				font-size: 20px !important;
				label{
					display: inline-block;
					color:#666;
					letter-spacing: 4px;
					font-size: 18px!important;
					width: 160px!important;
					text-align: right;
					margin-right: 20px;
				}
			}
		}
	}
	.content{
		display: flex;
		padding-top: 80px;
		i{
			display: inline-block;
			width: 1px;
			height: 55px;
			background-color: #dadada;
			position: relative;
			top:86px;
		}
		.head{
			width: 25%;
			text-align: center;
			.img{
				width: 100px;
				height: 100px;
				margin: 0 auto;
				margin-bottom: 25px;
				border-radius: 50%;
				cursor: pointer;
				position: relative;
				background-color: #2579fb;
				img{
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
				.muBan{
					position: absolute;
					top:0;
					left: 0;
					width: 100%;
					height: 100%;
					border-radius: 50%;
					line-height: 100px;
					color: #fff;
					font-size: 18px;
					cursor: pointer;
					background-color: rgba(80, 80, 80, 0.7);
				}
			}
			p{
				font-size: 16px;
				color: #333;
			}
		}
		.accountInfo{
			width: 35%;
			padding-left: 80px;
			div{
				color: #333;
				font-size: 22px;
				margin-bottom: 50px;
			}
			p{
				margin-top: 23px;
				label{
					display: inline-block;
					color:#666;
					width: 120px;
					text-align: right;
				}
			}
		}
		.moneyInfo{
			width: 35%;
			padding-left: 80px;
			div{
				color: #333;
				font-size: 22px;
				margin-bottom: 50px;
			}
			p{
				margin-top: 23px;
				label{
					display: inline-block;
					color:#666;
				}
			}
		}
	}
</style>
