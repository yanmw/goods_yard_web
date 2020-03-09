<template>
  <div :style="{height: pageH}"  class="loginPage">
	  <div>
		  <div class="left">
		      <!-- <p class="headline">云到智联 · 铁运信息查询系统</p> -->
		      <!-- <img style="margin-top: 130px;" src="../assets/login.png" alt /> -->
		    </div>
		  <div class="right">
		    <div class="loginBox">
		      <p class="titleLogin">
				  智慧电子货场综合管理平台
				  <i></i>
			  </p>
		      <div class="inputdiv">
		        <span class="iconfont"><img src="../../assets/user.png" alt=""></span>
		        <input v-model="loginForm.account" @blur="removeActive" @focus="inputFocus" placeholder="请输入用户名" type="text" />
		      </div>
			  <div class="inputdiv" style="position: absolute;top:-1000px">
			    <span class="iconfont"><img src="../../assets/user.png" alt=""></span>
			    <input placeholder="请输入用户名" type="text" />
			  </div>
			  <div class="inputdiv" style="position: absolute;top:-1000px">
			    <span class="iconfont"><img src="../../assets/password.png" alt=""></span>
			    <input  placeholder="请输入密码" type="password" />
			  </div>
		      <div class="inputdiv">
		        <span class="iconfont"><img src="../../assets/password.png" alt=""></span>
		        <input v-model="loginForm.password" @blur="removeActive" @focus="inputFocus" placeholder="请输入密码" type="password" />
		      </div>
		  
		      <!-- <input v-model="remember" type="checkbox" id="remember" />
		      <label for="remember">记住用户名和密码</label> -->
		      <input @click="handleLogin" class="loginBtn" type="button" value="登 录" />
		    </div>
		  </div>
	  </div> 
	<!-- <p class="beiAn">©2016 All rights reserved | 河南云煤网网络科技有限责任公司 豫ICP备15027560号|</p> -->
  </div>
</template>

<script>
import { login } from '@/api/index'
import Cookies from "js-cookie"
export default {
  data() {
    return {
      pageH: window.innerHeight + "px",
      remember: false,
      loginForm: {
        "account": "",
        "password": "",
		 // "time":""
      },
	  info:'',
      loading: false,
    };
  },
  created() {
 //  	var info1 = localStorage.getItem("accountInfo");
	// var info = JSON.parse(info1)
	// this.info = info
	// if(info){ 
	// 	this.loginForm.serialnum = info.serialnum
	// 	this.loginForm.password = info.password
	// 	this.handleLogin()
	// }
	 
  },
	  methods: {
		handleLogin() {
			if (this.loginForm.account === "" || this.loginForm.password === "") {
			    this.$alert("请输入账户密码");
			    return;
			}
			// if(isNaN(Number(this.loginForm.password))){  //当输入不是数字的时候，Number后返回的值是NaN;然后用isNaN判断。
			//     this.$message.error('密码需全为数字格式')
			// 	return
			// }
			// if(!(/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.loginForm.username))){
			//      this.$message.error("请输入正确的手机号")  
			// 		 return;
			//   }
			login(this.loginForm).then((res) => {
				    if (res.code == 200) {
						// console.log(res)
					  // if(this.loginForm.type == 1){
						 //  localStorage.setItem('zlrole',res.data.role)
					  // }
					  var account = JSON.stringify(res.data.user)
					  Cookies.set('qrToken',res.data.token.token)
					  sessionStorage.setItem('qrInfo',account)
					  sessionStorage.setItem('qrDept',56)
				      this.$router.push("/business/observer/inform");
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
	@font-face {
	  font-family: "准元黑简";
	  // src: url("../assets/fontFile/FZY3JW.TTF");
	}
	.left,
	.right {
	  display: inline-block;
	  vertical-align: top;
	}
	.inputactive {
	  box-shadow: 0 0 5px #00BF6F !important;
	  border-color: #00BF6F !important;
	}
	.loginBtn {
	  width: 360px;
	  margin-top: 25px;
	  margin-left: 40px;
	  background: #00BF6F;
	  cursor: pointer;
	  border: none;
	  color: white;
	  height: 40px;
	  line-height: 40px;
	  font-size: 20px;
	
	}
	.loginPage{
		width: 100%;
		height: 100%;
		background: url("../../assets/login.png") no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.right {
	  position: absolute;
	  top:-11.6%;
	  right: 34.9%;
	  .loginBox {
		background-color:#fff;
		border-radius: 5px;
	    width: 550px;
	    margin: 0 auto;
		padding:90px 50px;
		position: absolute;
		// top: 60%;
		left: 50%;
		text-align: center;
		background: url("../../assets/function-img.png") no-repeat;
		background-size: 100% 100%;
		margin-left: -180px;
		transform: translateY(62%);
	    .titleLogin {
	      font-size: 28px;
		  font-weight:400;
		  margin-left: 40px;
		  letter-spacing: 2px;
		  color:rgba(51,51,51,1);
		  line-height:30px;
	      margin-bottom: 40px;
		  i{
			  display: inline-block;
			  width:360px;
			  height:9px;
			  background:rgba(0,191,111,1);
			  border-radius:0px 0px 8px 8px
		  }
	    }
	    .inputdiv {
	      height: 50px;
	      // width: 100%;
	      width: 360px;
		  margin-left: 65px;
	      margin-bottom: 20px;
	      // border: solid 1px #dfdfdf;
	      border-width: 1px;
	      border-style: solid;
	      border-color: #999;
	      transition: box-shadow 0.6s, border-color 0.6s;
	      & > * {
	        display: block;
	        float: left;
	      }
	      span {
	        margin-left: 20px;
	        font-size: 22px;
	        line-height: 50px;
	        margin-right: 20px;
	        color: #abc4f5;
	      }
	      input {
	        border: none;
	        outline: none;
	        height: 100%;
	        font-size: 16px;
	      }
	    }
	    #remember {
	      display: none;
	      &:checked + label::before {
	        border: solid 1px #4977fc;
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
	      margin-left: 40px;
	      line-height: 31px;
	      display: block;
	      font-size: 16px;
	      &::before,
	      &::after {
	        content: "";
	        display: block;
	        position: absolute;
	      }
	      &::before {
	        width: 30px;
	        height: 30px;
	        left: -40px;
	        border: solid 1px #ccc;
	        transition: border 0.3s;
	      }
	      &::after {
	        width: 8px;
	        height: 16px;
	        border-width: 0 3px 3px 0;
	        border-style: solid;
	        border-color: #4977fc;
	        transform: rotate(90deg);
	        left: -29px;
	        top: 4px;
	        opacity: 0;
	        transition: opacity 0.3s, transform 0.3s;
	      }
	    }
	  }
	}
	.beiAn{
		width: 100%;
		font-family: 思源黑体 CN;
		font-size: 12px;
		color: #ffffff;
		text-align: center;
		position: absolute;
		bottom: 40px;
	}
	
</style>
