<template>
	<div :style="{height: pageH}" class="loginPage">
		<div class="loginMain">
			<div class="loginTip"><img src="../../assets/logo.png" alt="">众联天下建材交易网</div>
			<div class="loginBody">
				<div class="loginLeft">
					<div class="loginInfo">
						<!-- <p class="loginTitle" v-if='adminTab'><span class="userLogin">用户登录</span> <span class="adminLogin" @click="admin">管理员登录</span></p> -->
						<p class="loginTitle" ><span class="userLogin">管理员登录</span> <span @click="back()" class="back">返回</span></p>
						<div class="inputdiv">
	    				    <i class="iconfonts el-icon-user-solid"></i>
	    				    <input v-model="loginForm.username" @blur="removeActive" @focus="inputFocus" placeholder="请输入手机号" type="text" maxlength="11" auto-complete="new-password" />
	    				</div>
						<div class="inputdiv" style="opacity: 0;position: fixed;bottom: -1000px;">
						    <i class="iconfonts el-icon-user-solid"></i>
						    <input  placeholder="请输入手机号" type="text" maxlength="11" auto-complete="new-password"/>
						</div>
						<div class="inputdiv" style="opacity: 0;position: fixed;bottom: -1000px;">
							<i class="iconfonts el-icon-lock"></i>
						    <input type="password"  auto-complete="new-password"/>
						</div>
	    				<div class="inputdiv">
							<i class="iconfonts el-icon-lock"></i>
	    				    <input v-model="loginForm.password" type="password" @blur="removeActive" @focus="inputFocus"  placeholder="请输入密码"  maxlength="6"  auto-complete="new-password"/>
	    				</div>
	    				<input @click="handleLogin" class="loginBtn" type="button" value="登 录" />
					</div>
				</div>
				<div class="loginRight">
					<img src="../../assets/loginRight.png" alt="">
					<p>全流程智能化供应链管理</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { login } from '@/api/index'
	export default {
	  data() {
	    return {
	      pageH: window.innerHeight + "px",
	      remember: false,
	      loginForm: {
	        "username": "",
	        "password": "",
	        "type":1
	      },
	      info:'',
		  adminTab:true,
	      loading: false,
		  isChrome:true,
		  passwordaa:'',
		  inputType:'',
		  passworded:[]
	    };
	  },
	  methods: {
	  // 	admin(){
	  // 		this.adminTab = false
			// this.loginForm.type = 1
	  // 	},
	  // 	user(){
	  // 		this.adminTab = true
			// this.loginForm.type = 2
	  // 	},
	  regPhone(){

	  },
	  back(){
	  			   this.$router.push("/login");
	  },
		aa(){
			var val = this.passwordaa
		    // this.loginForm.password = this.passwordaa
			//将输入框除最后一位的字符替换成*
			this.passwordaa =
			  val.substr(0, val.length - 1).replace(/./g, "*") +
			  val.charAt(val.length - 1);
			/* 取当前输入框长度，用于判断是否正在输入
			停止输入时，一秒后将最后一个字符变成*号 */
			var len = this.passwordaa.length;
			setTimeout(() => {
			  /*这时的this指向在延迟器触发时输入框的状态，
			而不是延迟器创建时的状态*/
			  if (this.passwordaa.length == len) {
			    //一秒后输入框的值长度不变，将所有字符替换为*
			    this.passwordaa = this.passwordaa.replace(/./g, "*");
			  }
			}, 1000);
		},
		handleLogin() {
			if (this.loginForm.username === "" || this.loginForm.password === "") {
			    this.$alert("请输入账户密码");
			    return;
			}
			if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.loginForm.username))){
			     this.$message.error("请输入正确的手机号")  
					 return;
			  }
			if(isNaN(Number(this.loginForm.password))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			    this.$message.error('密码需全为数字格式')
				return
			}
			login(this.loginForm).then((res) => {
				    if (res.code == 200) {
						// console.log(res)
						// if(!this.info){
						// 	 var curTime = new Date().getTime();
						// 	 this.loginForm.time = curTime
						// 	 var account = JSON.stringify(this.loginForm)
						// 	 localStorage.setItem('accountInfo',account)
						// }
				  	  // localStorage.setItem('authkey',res.body.venderid)
				  	  // localStorage.setItem('serialnum',res.body.serialnum)
				  	  // localStorage.setItem('address',res.body.address)
				  	  // localStorage.setItem('coord',res.body.coord)
				  	  // localStorage.setItem('companyName',res.body.vendername)
					  // if(this.loginForm.type == 1){
						 //  localStorage.setItem('zlrole',res.data.role)
					  // }
					  var account = JSON.stringify(res.data.account)
					  sessionStorage.setItem('zlInfo',account)
					  sessionStorage.setItem('zlIsAuth',res.data.isAuth)
				  	  sessionStorage.setItem('zlmenu',this.loginForm.type)
				      this.$router.push("/home");
				    } else {
						this.$message.error(res.msg);
				    }
				  }).catch(() => {
				    this.loading = false
				  })
		},
		register(){
			this.$router.push("/register");
		},
		retrieve(){
			this.$router.push("/retrievePassword");
		},

	    removeActive(a) {
	       a.path[1].classList.remove("inputactive");
	    },
	    inputFocus(a, b) {
	       a.path[1].classList.add("inputactive");
	    },
		inputFocus1(a, b) {
		   a.path[1].classList.add("inputactive");
		   this.inputType = 'password'
		}
	  }
	}
</script>

<style lang="less" scoped>
	.inputPsd{
	-webkit-text-security:disc;
	}
	.loginPage{
		width: 100%;
		height: 100%;
		background: url("../../assets/loginBg.png") no-repeat;
		background-size: 100% 100%;
		min-width: 1200px;
	}
	.loginMain{
		width: 1120px;
		margin: 0 auto;
		padding-top: 80px;
		
	}
	.loginTip{
		font-size: 28px;
		font-stretch: normal;
		line-height: 50px;
		font-weight: bold;
		letter-spacing: 3px;
		color: #333333;
		img{
			width: 82px;
			height: 82px;
			vertical-align: middle;
		}
	}
	.back{
		display: inline-block;
		position: absolute;
		right: -80px;
		cursor: pointer;
		font-size: 14px;
		color: #999;
		top:5px;
		margin-right: 10px;
		width: 30px;
		img{
			width: 100%;
		}
	}
	.loginBody{
		display: flex;
		width: 100%;
		box-shadow: 0px 0px 21px 8px rgba(21, 128, 193, 0.18);
			border: solid 1px #d2d2d2;
		.loginLeft{
			display: inline-block;
			width: 65%;
			background-color: #fff;
			.loginInfo{
				width: 58%;
				margin-top: 13%;
				margin-left: 12%;
				.loginTitle{
					margin-bottom: 20%;
					position: relative;
					.userLogin{
						font-size: 22px;
						color: #0088f4;
					}
					.adminLogin{
						font-size: 12px;
						color: #868787;
						position: absolute;
						right: -40px;
						bottom: 0;
						cursor: pointer;
					}
				}
	    	  }
			}
		.loginRight{
			display: inline-block;
			width: 34%;
			position: relative;
			img{
				width: 110%;
				height: 110%;
				position: relative;
				top:-10%;
			}
			p{
				font-size: 16px;
				font-weight: normal;
				font-style: italic;
				line-height: 25px;
				letter-spacing: 1px;
				color: #ffffff;
				width: 100%;
				position: absolute;
				bottom: 6%;
				text-align: center;
			}
		}
	}
	.inputdiv {
	  height: 40px;
	  width: 100%;
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
		span{
			font-size: 16px;
			color: #0088f4;
			cursor: pointer;
			position: absolute;
			right: 0;
			top:0;
		}
	}
	#remember {
	  display: none;
	  &:checked + label::before {
	    border: solid 1px #4977fc;
		width: 20px;
		height: 20px;
	  }
	  &:checked + label::after {
	    opacity: 1;
	    transform: rotate(40deg);
	  }
	}
	label {
	  position: relative;
	  margin-top: 30px;
	  cursor: pointer;
	  margin-left: 30px;
	  line-height: 21px;
	  display: block;
	  font-size: 16px;
	  &::before,
	  &::after {
	    content: "";
	    display: block;
	    position: absolute;
	  }
	  &::before {
	    width: 20px;
	    height: 20px;
	    left: -30px;
	    border: solid 1px #ccc;
	    transition: border 0.3s;
	  }
	  &::after {
	    width: 5px;
	    height: 10px;
	    border-width: 0 3px 3px 0;
	    border-style: solid;
	    border-color: #4977fc;
	    transform: rotate(180deg);
	    left: -23px;
	    top: 4px;
	    opacity: 0;
	    transition: opacity 0.3s, transform 0.3s;
	  }
	}
	.loginBtn{
		width: 70%;
		height: 40px;
		line-height: 40px;
		background-image: linear-gradient(0deg, #2589ff 0%, #256ef8 100%);
		border: none;
		margin-left: 15%;
		margin-top: 15%;
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
