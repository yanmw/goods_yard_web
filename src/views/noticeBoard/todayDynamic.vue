<template>
	<div>
		<p class="spanTab">业务部 > 计划申报 > <span>今日动态</span></p>
		<div class="indexPerson">
			<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;"><i></i>今日计划</div>
			<div class="todayPlan">
				<div class="plan">
					<p class="title"><span class="oneColor">请车</span><span class="right">三门峡富豪矿品销售有限公司</span></p>
					<div class="middle">
						<div><span class="oneColor">22</span>高边车</div>
						<div><span class="oneColor">22</span>集装车</div>
					</div>
					<div class="bottom">
						<span >精煤</span>
						<span>河石坝</span>
						<span>点后</span>
					</div>
				</div>
				<div class="plan">
					<p class="title"><span class="twoColor">承认车</span><span class="right">三门峡富豪矿品销售有限公司</span></p>
					<div class="middle">
						<div><span class="twoColor">22</span>高边车</div>
						<div><span class="twoColor">22</span>集装车</div>
					</div>
					<div class="bottom">
						<span>精煤</span>
						<span>河石坝</span>
						<span>点后</span>
					</div>
				</div>
				<div class="plan">
					<p class="title"><span class="threeColor">送车</span></p>
					<div class="vehicle ">
						<div class="machine oneMe">
							<p>机货一</p>
							<div><span class="left threeColor">-</span><span class="right">车</span></div>
							<div><span class="left threeColor">20</span><span class="right">亏空</span></div>
							<div><span class="left threeColor">-</span><span class="right">时间</span></div>
						</div>
						<div class="machine threeMe">
							<p>机货三</p>
							<div><span class="left threeColor">-</span><span class="right">车</span></div>
							<div><span class="left threeColor">20</span><span class="right">亏空</span></div>
							<div><span class="left threeColor">-</span><span class="right">时间</span></div>
						</div>
					</div>
				</div>
				<div class="plan">
					<p class="title"><span class="fourColor">拉车</span></p>
					<div class="vehicle ">
						<div class="machine oneMe">
							<p>机货一</p>
							<div><span class="left threeColor">-</span><span class="right">车</span></div>
							<div><span class="left threeColor">20</span><span class="right">亏空</span></div>
							<div><span class="left threeColor">-</span><span class="right">时间</span></div>
						</div>
						<div class="machine threeMe">
							<p>机货三</p>
							<div><span class="left threeColor">-</span><span class="right">车</span></div>
							<div><span class="left threeColor">20</span><span class="right">亏空</span></div>
							<div><span class="left threeColor">-</span><span class="right">时间</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="authTit" style="letter-spacing: 1px;color: #333333;font-size: 16px;margin-top: 50px;"><i></i>公告信息</div>
			<div class="notice">
				<p class="noticeTit"><span class="title"><label for="">标题：</label>停止发运</span><span class="right">2019-11-08   12:00:28</span></p>
				<div class="content">
					<label for="">内容：</label><p>根据环保要求，省厅同意进行安全检查指导，货场暂停发货，包括计划、装卸等作业，全部暂停。暂停时间为11月13日-11月15包括计划、装卸等作业，全部暂停。暂停时间为11月13日-11月15包括计划、装卸等作业，全部暂停。暂停时间为11月13日-11月15装卸等作业，全部暂停。暂停时间为11月13日-11月15</p>
				</div>
				<div class="remo">
					<label for="">备注：</label><p>恢复时间，另行通知。 </p>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import {getMoney , uploadImg} from "@/api/index.js"
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
				},
				lisy:'http://file02.16sucai.com/d/file/2014/0829/372edfeb74c3119b666237bd4af92be5.jpg',
				srcList:['http://file02.16sucai.com/d/file/2014/0829/372edfeb74c3119b666237bd4af92be5.jpg']
			}
		},
		created() {
			// var info1 = sessionStorage.getItem("zlInfo");
			// this.type = sessionStorage.getItem("zlmenu");
			// if(info1 == null){
			// 	this.$router.push("/login")
			// }
			// this.info = JSON.parse(info1)
			// // this.ruleForm.picUrl = this.picture
			// // this.ruleForm.id = this.info.id
			// this.ruleForm.userId = this.info.id
			// // this.ruleForm.userId = res.data.picture.accountId
			// this.getMoneyed()
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
	
	.todayPlan{
		width: 100%;
		min-width: 1050px;
		.plan{
			width: 24%;
			height: 210px;
			min-width: 255px;
			margin-right: 0.7%;
			display: inline-block;
			vertical-align: top;
			border:1px solid #D6D6D6;
			border-radius:6px;
			padding: 15px 20px;
			.title{
				margin-bottom: 24px;
				font-size: 13px;
				position: relative;
				.oneColor{
					font-size: 20px;
				}
				.twoColor{
					font-size: 20px;
				}
				.right{
					position: absolute;
					top:5px;
					right: 0;
				}
			}
			.middle{
				margin-bottom: 30px;
				div{
					display: inline-block;
					width: 49%;
					text-align: center;
					span{
						font-size: 26px;
						margin-right: 5px;
					}
				}
			}
			.bottom{
				margin-bottom: 10px;
				span{
					display: inline-block;
					width: 33%;
					text-align: center;
					font-size: 13px;
					color: #00BF6F;
				}
			}
		}
		.oneColor{
			color: #776FDB;
		}
		.twoColor{
			color: #4C9FCE;
		}
		.threeColor{
			font-size: 20px;
			color: #FE2E00;
		}
		.fourColor{
			font-size: 20px;
			color: #2666BC;
		}
		.vehicle{
			.oneMe{
				border-top: 3px solid #69B0FE !important;
				p{
					color: #69B0FE;
				}
			}
			.threeMe{
				border-top: 3px solid #7380FB !important;
				margin-left: 1.5%;
				p{
					color: #7380FB;
				}
			}
			.machine{
				display: inline-block;
				width: 49%;
				vertical-align: top;
				border:1px solid #E6E6E6;
				border-radius: 3px 3px 0 0;
				padding: 10px;
				margin-top: -15px;
				p{
					font-size: 14px;
				}
				div{
					position: relative;
					margin-bottom: 5px;
					font-size: 14px;
					.left{
						font-size: 20px;
					}
					.right{
						position: absolute;
						top: 7px;
						right: -5px;
						display: inline-block;
						width: 50px;
						text-align: center;
					}
				}
			}
		}
	}
	.notice{
		width: 100%;
		box-shadow:0px 1px 11px 0px rgba(52,100,224,0.21);
		border-radius:5px;
		padding: 30px 20px;
		font-size: 14px;
		.noticeTit{
			position: relative;
			margin-bottom: 30px;
			.title{
				// font-size: 12px;
				color: #010101;
				label{
					display: inline-block;
					width: 50px;
					color: #666666;
				}
			}
			.right{
				position: absolute;
				right: 20px;
				font-size: 12px;
				color: #999999;
			}
		}
		.content{
			margin-bottom: 60px;
			position: relative;
			label{
				display: inline-block;
				width: 50px;
				color: #666666;
			}
			p{
				position: absolute;
				top:0;
				left: 50px;
				color: #333333;
			}
		}
		.remo{
			color: #666666;
			position: relative;
			label{
				display: inline-block;
				width: 50px;
			}
			p{
				position: absolute;
				top:0;
				left: 50px;
			}
		}
	}
</style>
