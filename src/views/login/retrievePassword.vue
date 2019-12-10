<template>
	<div :style="{height: pageH}" class="loginPage">
		<div class="loginMain">
			<div class="loginTip"><img src="../../assets/logo.png" alt="">众联天下建材交易网</div>
			<div class="loginBody">
				<div class="loginLeft">
					<div class="loginInfo">
						<p class="loginTitle"><span @click="back()" class="back">返回</span><span class="userLogin">找回密码</span></p>
						<div class="inputdiv">
	    				    <i class="iconfonts el-icon-user-solid"></i>
	    				    <input v-model="loginForm.phone" @blur="removeActive" @focus="inputFocus"  maxlength="11" placeholder="请输入手机号" type="text" auto-complete="new-password" />
	    				</div>
						<div class="inputdiv">
							<i class="iconfonts el-icon-key"></i>
							<input v-model="loginForm.code" @blur="removeActive" @focus="inputFocus" maxlength="4" placeholder="请输入验证码" type="text" auto-complete="new-password"/>
							<span class="Yan" v-show="Verification" @click="handleClick" style="background-color: #2589ff;color: #fff;cursor: pointer;font-size: 14px;">获取验证码</span>
							<span class="Yan" v-show="!Verification" style="background-color: #ccc;color: #fff;font-size: 12px;">{{timer}} 秒后重新获取</span>
						    <!-- <input v-model="info" @blur="removeActive" @focus="inputFocus" maxlength="4" placeholder="请输入验证码" type="text" /> -->
						    <!-- <div class="get-code Yan" @click="refreshCode()">
						    	 <s-identify :identifyCode="identifyCode"></s-identify>
						    </div> -->
						</div>
						<div class="inputdiv" style="opacity: 0;position: fixed;bottom: -1000px;">
						    <i class="iconfonts el-icon-user-solid"></i>
						    <input  placeholder="请输入手机号" type="text" maxlength="11" auto-complete="new-password" />
						</div>
						<div class="inputdiv" style="opacity: 0;position: fixed;bottom: -1000px;">
							<i class="iconfonts el-icon-lock"></i>
						    <input type="password"  auto-complete="new-password"/>
						</div>
	    				<div class="inputdiv">
							<i class="iconfonts el-icon-lock"></i>
	    				    <input v-model="loginForm.password" @blur="removeActive" @focus="inputFocus" placeholder="请输入密码" type="password"  auto-complete="new-password" maxlength="6"/>
	    				</div>
						<div class="inputdiv">
							<i class="iconfonts el-icon-lock"></i>
						    <input v-model="quePassword" @blur="removeActive" @focus="inputFocus" placeholder="请确认密码" type="password"  auto-complete="new-password" maxlength="6"/>
						</div>
	    				<input @click="handleLogin" class="loginBtn" type="button" value="重置密码" />
					</div>
				</div>
				<!-- <div class="loginRight">
					<img src="../../assets/loginRight.png" alt="">
					<p>全流程智能化供应链管理</p>
				</div> -->
			</div>
				
		</div>
	</div>
</template>

<script>
import { retrievePassword , changePasswordCode} from '@/api/index'
	import SIdentify from "@/components/sIdentify.vue";
	export default {
	  components:{
	  	SIdentify
	  },
	  data() {
	    return {
	      pageH: window.innerHeight + "px",
	      remember: false,
	      loginForm: {
	        "phone": "",
	        "password": "",
			"code": ""
	      },
		  quePassword:'',
	      info:'',
		  Verification:true,
		  timer:120,
	      loading: false,
		  identifyCode: "",
		  identifyCodes: "0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ",  
	    };
	  },
	  created() {
	  	// this.refreshCode()
	  },
	  methods: {
		  regPhone(){
		  	
		  },
		  back(){
		  			   this.$router.push("/login");
		  },
		  handleClick(){
		    if (this.loginForm.phone == "") {
		       this.$message.error("请输入手机号");
		        return;
		    }
			if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.loginForm.phone))){
			     this.$message.error("请输入正确的手机号")  
					 return;
			  }
		    changePasswordCode({phone:this.loginForm.phone}).then((res) => {
		    	if (res.code == 200) {
		    	    this.Verification = false;  
		    	    let auth_timer = setInterval(()=>{  
		    	      this.timer--;        
		    	      if(this.timer<=0){  
		    	        this.Verification = true;  
		    	        clearInterval(auth_timer)
		    	      }
		    	    },1000)
		  		 this.$message.success(res.msg);
		    	} else {
		    		this.$message.error(res.msg);
		    	}
		    }).catch(() => {
		      this.loading = false
		    })
		   
		  },
	  	refreshCode() {//
	      this.identifyCode = "";
	      this.makeCode(this.identifyCodes,4);
	  		  // console.log(this.identifyCode)
	    },
	    randomNum (min, max) {
	      max = max + 1
	      return Math.floor(Math.random() * (max - min) + min)
	    },
	    // 随机生成验证码字符串
	    makeCode (data, len) {
	        for (let i = 0; i < len; i++) {
	           this.identifyCode += data[this.randomNum(0, data.length - 1)]
	        }
	  	},
	    handleLogin() {
			if (this.loginForm.phone == "" || this.loginForm.password == "") {
			   this.$message.error("请输入手机号或密码");
			    return;
			}
			if(this.loginForm.code == ''){
				this.$message.error("请输入验证码");
				// this.refreshCode();
				return;
			}
			if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.loginForm.phone))){
			     this.$message.error("请输入正确的手机号")     
				  return;
			  }
			if(isNaN(Number(this.loginForm.password))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			    this.$message.error('密码需全为数字格式')
				return
			}
			if(this.quePassword != this.loginForm.password){
				this.$message.error("两次输入的密码不一致");
				 return;
			}
			retrievePassword(this.loginForm).then((res) => {
				if (res.code == 200) {
				    this.$message.success(res.msg);
				    this.$router.push("/login");
				} else {
				    this.$message.error(res.msg);
				}
			}).catch(() => {
				this.loading = false
			})
	  	},
	    removeActive(a) {
	       a.path[1].classList.remove("inputactive");
	    },
	    inputFocus(a, b) {
	       a.path[1].classList.add("inputactive");
	    }
	  }
	}
</script>

<style lang="less" scoped>
	.loginPage{
		width: 100%;
		height: 100%;
		background: url("../../assets/loginBg.png") no-repeat;
		background-size: 100% 100%;
		min-width: 1200px;
	}
	.loginMain{
		width: 700px;
		margin: 0 auto;
		padding-top: 80px;
		
	}
	.back{
		display: inline-block;
		position: absolute;
		font-size: 14px;
		right: -80px;
		color: #999;
		cursor: pointer;
		top:5px;
		margin-right: 10px;
		width: 30px;
		img{
			width: 100%;
		}
	}
	.loginTip{
		font-size: 28px;
		font-stretch: normal;
		line-height: 50px;
		letter-spacing: 3px;
		color: #333333;
		font-weight: 600;
		img{
			width: 82px;
			height: 82px;
			vertical-align: middle;
		}
	}
	.loginBody{
		display: flex;
		width: 100%;
		box-shadow: 0px 0px 21px 8px rgba(21, 128, 193, 0.18);
		border: solid 1px #d2d2d2;
		.loginLeft{
			display: inline-block;
			width: 100%;
			padding-bottom: 50px;
			background-color: #fff;
			.loginInfo{
				width: 58%;
				margin-top: 10%;
				margin-left: 18%;
				.loginTitle{
					margin-bottom: 15%;
					position: relative;
					.userLogin{
						font-size: 22px;
						color: #0088f4;
					}
					.adminLogin{
						font-size: 14px;
						color: #868787;
						position: absolute;
						right: 0;
						bottom: 0;
						cursor: pointer;
					}
				}
	    	  }
			}
		// .loginRight{
		// 	display: inline-block;
		// 	width: 34%;
		// 	position: relative;
		// 	img{
		// 		width: 110%;
		// 		height: 110%;
		// 		position: relative;
		// 		top:-10%;
		// 	}
		// 	p{
		// 		font-size: 16px;
		// 		font-weight: normal;
		// 		font-style: italic;
		// 		line-height: 25px;
		// 		letter-spacing: 1px;
		// 		color: #ffffff;
		// 		width: 100%;
		// 		position: absolute;
		// 		bottom: 6%;
		// 		text-align: center;
		// 	}
		// }
	}
	.inputdiv {
	  height: 40px;
	  width: 100%;
	  position: relative;
	  margin-bottom: 30px;
	  border-bottom: 1px solid #cccccc;
	  transition: box-shadow 0.6s, border-color 0.6s;
	  & > * {
	    display: block;
	    float: left;
	  }
	  i {
	    margin-right: 30px;
	    font-size: 22px;
	    line-height: 40px;
	    color: #d7dee3;
	  }
	 .Yan{
	 	position: absolute;
	 	right: 0;
	 	top:-2px;
	 	width: 122px;
	 	height: 42px;
	 	line-height: 40px;
	 	text-align: center;
	 	border:1px solid #ccc;
	 	cursor: pointer;
	 }
	  .noYan{
	  		  position: absolute;
	  		  right: 0;
	  		  top:0;
	  		  width: 120px;
	  		  height: 33px;
	  		  line-height: 33px;
	  		  text-align: center;
	  		  background-color: #999;
	  		  color: #ffffff;
	  		  cursor: pointer;
	  		  font-size: 14px;
	  }
	  input {
	    border: none;
	    outline: none;
	    height: 100%;
		width: 70%;
	    font-size: 16px;
		color: #333;
	  }
	  input::-webkit-input-placeholder { /* WebKit browsers */
	      color: #c6ced4;
	  }
	  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	      color: #c6ced4;
	  }
	  input::-moz-placeholder { /* Mozilla Firefox 19+ */
	      color: #c6ced4;
	  }
	   input:-ms-input-placeholder { /* Internet Explorer 10+ */
	      color: #c6ced4;
	  }
	}
	.rememberPassword{
		position: relative;
		text-align: center;
		label{
			span{
				font-size: 16px;
				color: #0088f4;
				cursor: pointer;
			}
		}
		
	}
	.loginBtn{
		width: 70%;
		height: 36px;
		line-height: 36px;
		background-image: linear-gradient(0deg, #2589ff 0%, #256ef8 100%);
		border: none;
		margin-left: 15%;
		margin-top: 10%;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
	}
	.forget{
		font-size: 14px;
		color: #c0c8cd;
		margin-top: 7%;
		text-align: center;
		cursor: pointer;
	}
	.inputactive {
	    box-shadow: 0px 7px 7px -7px #2589ff !important;
	    border-color: #2589ff !important;
		i {
		  color: #2589ff;
		}
		input{
			color: #2589ff;
		}
	}
	
</style>
