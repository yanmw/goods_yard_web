<template>
<div>
  <div class="po-re">
	  <div class="logoBox">
		  <div class="tit">
			  <img src="../assets/logo1.png" alt="">
			  <span>众联后台管理系统</span>
		  </div>
		  <div class="titTab">
			  <router-link to="/home">
				  <span class="gohome" style="opacity: 0.6;">交易大厅</span>
			  </router-link>
			  <span >个人中心</span>
		  </div>
		  <div class="goLogin">
		  	  <div>
		  	     <span>您好，{{info2}}</span>
		  	     <span @click="logout" style="cursor: pointer;">退出</span>
		  	  </div>
		  </div>
	  </div>
   <!-- <div class="logoBox po-ab">
      <img class="logo" src="../assets/logo.png" alt width="46px" />
      <span style="font-size: 40px;margin: 0 14px;">云到</span>
      <span class="nameType">铁运信息查询系统</span>
    </div> -->
    <!-- <div class="profile po-ab">
	    <!-- <el-dropdown @command="userOperation"> -->
		<!-- <span @click="goIndex" style="font-size: 14px;cursor: pointer;margin-right: 40px;text-decoration:underline;">云煤网首页</span>
	        <span @click="goPerson" class="user" style="cursor: pointer;"><span class="iconfont iconwode"></span>个人中心</span> -->
	       <!-- <el-dropdown-menu slot="dropdown" style="width: 200px;text-align: center;margin-top: -15px;">
	            <el-dropdown-item style="padding:10px 0  10px 0;font-size: 16px;" command="editPaw" >修改密码</el-dropdown-item>
	            <el-dropdown-item style="font-size: 16px;padding-bottom: 10px;" command="logout">退出登录</el-dropdown-item>
	        </el-dropdown-menu>
	    </el-dropdown> -->
		<!-- <span @click="logout" style="margin-left: 40px;font-size: 14px;cursor: pointer;">退出</span> -->
	<!-- </div> -->
  </div>

  </div>
</template>

<script>
import {logout} from '../api/index.js'
import Cookies from "js-cookie"

export default {
	data() {
	    return {
	    	dialog: {
	          editPaw: {
	            show: false
	          }
	        },
		    info2:'',
	    }
	  },
	  created() {
	  	var info1 = sessionStorage.getItem("zlInfo");
		if(info1 == null){
			this.$router.push("/login")
		}
		var info = JSON.parse(info1)
		this.info2 = info.phone
	 //  	this.info2 = localStorage.getItem("companyName");
	 //  	// var info1 = localStorage.getItem("authkey");
	 //  	var info = JSON.parse(info1)
	 //  	var exp =  60 * 60 * 24 * 30 * 1000; 
	 //  	if(info){
	 //  		var isTimed = (new Date().getTime() - info.time) > exp 
	 //  		if (isTimed) {
	 //  		    console.log('信息已过期');
	 //  		    localStorage.removeItem('accountInfo');
	 //  		    localStorage.removeItem('companyName');
	 //  		    localStorage.removeItem('authkey');
	 //  		    localStorage.removeItem('serialnum');
	 //  		    localStorage.removeItem('coord');
	 //  		    localStorage.removeItem('address');
	 //  		    this.$router.push("/login")
	 //  		}else{
	 //  		    console.log('已登录')
	 //  		}
	 //  	}
	  },
	  methods: {
		  userOperation(command){
		      switch(command){
		          case 'logout': 
		              this.logout()
		              break
		          case 'editPaw':
		              this.dialog.editPaw.show = true
		              console.log('编辑密码')
		              break
		      }
		  },
		  goPerson(){
			  this.$router.push("/personalCenter")
		  },
		  // logout() {
		  //     this.sysLogout().then(() => {
		  //         location.reload()
		  //         //this.$router.push('/login')
		  //     })
		  // },
	      // 退出登录
	      logout: function() {
	        this.$confirm("确认退出吗?", "提示", {
	          type: "warning"
	        })
	        .then(() => {
	          // sessionStorage.removeItem("user")
			  // localStorage.removeItem('accountInfo');
			  // localStorage.removeItem('companyName');
			  // localStorage.removeItem('authkey');
			  // localStorage.removeItem('serialnum');
			  // localStorage.removeItem('coord');
			  // localStorage.removeItem('address');
	          // this.deleteCookie("token")
	          logout().then((res) => {
	          	  if(res.code == 200){
					  sessionStorage.removeItem('zlInfo');
					  sessionStorage.removeItem('zlmenu');
					  this.$router.push("/login")
	          		  this.$message.success(res.msg);
	          	  }
	              }).catch(function(res) {
	          		console.log(res)
	            })
	          }) 
	          .catch(() => {})
	      },
		  goIndex(){
			  // window.location.href="http://www.yunmei168.com/front/index";
			  window.open("http://www.yunmei168.com/front/index");   
		  },
	      // 删除cookie
	      deleteCookie: function(name) { 
	          Cookies.remove(name)
	      },
		}
};
</script>

<style lang="less" scoped>
	.goLogin{
		position: absolute;
		right: 60px;
		div{
			text-align: right;
			span{
				color: #fff;
				opacity: 0.8;
				font-size: 12px;
				margin-left: 40px;
			}
		}
	}
	.gohome:hover{
		font-size: 26px!important;
		opacity: 1 !important;
	}
	.logoBox{
		width: 100%;
		min-width: 1200px;
		height: 80px;
		line-height: 80px;
		position: relative;
		background-image: linear-gradient(0deg, #2589ff 0%, #256ef8 100%), linear-gradient(#ffffff, #ffffff);
		background-blend-mode: normal, normal;
		box-shadow: 0px 2px 8px 0px rgba(37, 110, 248, 0.4);
	    border-radius: 0px 0px 10px 10px;
			div{
				display: inline-block;
			}
			.tit{
				margin-left: 50px;
				img{
					width: 60px;
					height: 60px;
					vertical-align: middle;
					position: relative;
					top:-6px;
				}
				span{
					margin-left: 20px;
					font-size: 26px;
					position: relative;
					top:0px;
					color: #fff;
				}
			}
			.titTab{
				margin-left: 17%;
				span{
					display: inline-block;
					width: 300px;
					text-align: center;
					font-size: 20px;
					cursor: pointer;
					color: #fff;
				}
			}
			
	}
// .po-re {
//   height: 92px;
//   width: 100%;
//   // background: url("../assets/top-bg.jpg") no-repeat;
//   color: white;
//   line-height: 92px;
//   h1{
//       text-align: center;
//       font-size: 40px;
// 	  font-weight: 400;
//   }
//   .logoBox {
//     left: 2%;
//     font-size: 18px;
//     & > *{
//         display: block;
//         float: left;
//     }
//     .logo{
//         margin-top: 24px;
//     }
//     .nameType{
//         margin-left: 14px;
//         margin-top: 8px;
//     }
//   }
//   .profile {
//     right: 30px;
//     top: 0;
//     .iconwode{
//         margin-right: 8px;
//     }
// 	.user{
// 		color: white;
// 		font-size: 14px;
// 	}
//   }
// }
</style>