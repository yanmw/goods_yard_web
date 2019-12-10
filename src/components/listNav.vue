<template>
  <div class="aside">
	  <el-menu
	    :default-active="this.$route.path"
	    class="el-menu-vertical-demo" unique-opened>
		    <router-link to='personIndex'>
	  		    <el-menu-item index="/personal/personIndex" style="margin-top: 40px;border:none!important;border-bottom: 1px solid #e8e7ec!important;font-size: 16px;">
				    <i class="el-icon-s-home" style="color: #266ff9;"></i>
					<span slot="title" >用户首页</span>
	  		    </el-menu-item>
			</router-link>
	        <el-submenu index="2">
	          <template slot="title">
	            <img class="iconImg" src="../assets/1.png" alt="">
	            <span>订单管理</span>
	          </template>
	          <el-menu-item-group>
				  <router-link to='preSettlement'>
	                 <el-menu-item index="/personal/preSettlement">预结算订单</el-menu-item>
				  </router-link>
				  <router-link to='checkPending'>
					  <el-menu-item index="/personal/checkPending">待审核订单</el-menu-item>
				  </router-link>
				  <router-link to="actualSettlement">
				  	<el-menu-item index="/personal/actualSettlement">实际结算订单</el-menu-item>
				  </router-link>
	          </el-menu-item-group>
	        </el-submenu>
			<el-submenu index="3" v-if="role != 2">
			  <template slot="title">
			    <img class="iconImg" src="../assets/6.jpg" alt="">
			    <span>卖货管理</span>
			  </template>
			  <el-menu-item-group>
				  <router-link to="appointment">
				  	 <el-menu-item index="/personal/appointment">预约卖货</el-menu-item>
				  </router-link>
				  <router-link to="offline">
				  	 <el-menu-item index="/personal/offline">线下卖货</el-menu-item>
				  </router-link>
			  </el-menu-item-group>
			</el-submenu>
			<el-submenu index="4">
			  <template slot="title">
			    <img class="iconImg" src="../assets/2.png" alt="">
			    <span>货品管理</span>
			  </template>
			  <el-menu-item-group>
				  <router-link to="issue">
				  	 <el-menu-item index="/personal/issue">发布货品</el-menu-item>
				  </router-link>
				  <router-link to="list">
				  	 <el-menu-item index="/personal/list">货品列表</el-menu-item>
				  </router-link>
				  <router-link to="maintain">
				  	 <el-menu-item index="/personal/maintain">货品维护</el-menu-item>
				  </router-link>
			  </el-menu-item-group>
			</el-submenu>
			<el-submenu index="5" v-if="role != 2">
			  <template slot="title">
			     <img class="iconImg" src="../assets/3.png" alt="">
			    <span>财务管理</span>
			  </template>
			  <el-menu-item-group>
				  <router-link to="capitalList">
					  <el-menu-item index="/personal/capitalList">资金账户列表</el-menu-item>
				  </router-link>
				  <router-link to="recharge">
				  	  <el-menu-item index="/personal/recharge">充值记录</el-menu-item>			  
				  </router-link>
				  <router-link to="deal">
				  	  <el-menu-item index="/personal/deal">交易流水</el-menu-item>			  
				  </router-link>
			  </el-menu-item-group>
			</el-submenu>
			<el-submenu index="6" v-if="role != 2">
			  <template slot="title">
			    <img class="iconImg" src="../assets/4.png" alt="">
			    <span>账户管理</span>
			  </template>
			  <el-menu-item-group>
			     <router-link to="authentication">
			     	<el-menu-item index="/personal/authentication">认证信息</el-menu-item>
			     </router-link>
				 <router-link to="phoneEdit">
				 	<el-menu-item index="/personal/phoneEdit">修改手机号</el-menu-item>
				 </router-link>
				 <router-link to="passwordEdit">
				 	<el-menu-item index="/personal/passwordEdit">修改登录密码</el-menu-item>
				 </router-link>
				 <router-link to="accountBypass">
				 	<el-menu-item index="/personal/accountBypass">子账号管理</el-menu-item>
				 </router-link>
			  </el-menu-item-group>
			</el-submenu>
	  </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:false,
	  role:''
    };
  },
  created() {
	  var info1 = sessionStorage.getItem("zlInfo");
	  if(info1 == null){
	  	this.$router.push("/login")
	  }
	  var info = JSON.parse(info1)
	  this.role = info.role
	// this.$router.push('preSettlement');
    // let currentPath = this.$route.path.slice(6);
    // this.navArray.forEach((e, i) => {
    //   if (e.path === currentPath) {
    //     this.navI = i;
    //     this.$emit("cb", e.name)
    //   }
    // });
  },
  watch: {
    $route() {}
  },
  methods: {
	  handleOpen(key, keyPath) {
	    console.log(key, keyPath);
	  },
	  handleClose(key, keyPath) {
	    console.log(key, keyPath);
	  },
    // navClick(i, path, name) {
    //   this.navI = i;
    //   this.$router.push("/home/" + path);
    //   this.$emit("cb", name)
    // }
  }
};
</script>

<style lang="less" scoped>
	a{
		text-decoration: none;
	}
.aside{
	height: 800px;
	display: inline-block;
	width: 280px;
	float: left;
	margin-left: 20px;
	margin-right: 20px;
	padding-left: 20px;
	padding-right: 20px;
	margin-top: 40px;
	border-radius: 14px;
	box-shadow: 0px 5px 16px 0px rgba(54, 196, 209, 0.14);
	background-color: #fff;
	ul{
		border-radius: 14px 14px 0 0;
		border-right:0px;
		padding: 0px 10px;
		.el-submenu{
			border-bottom: 1px solid #e8e7ec !important;
		}
		li{
			border-bottom: 1px solid #e8e7ec;
			font-size: 15px;
			color: #333;
			font-weight: 600;
			i{
				font-size: 22px;
			}
			div{
				span{
					font-size: 16px;
				}
			}
			.el-menu-item{
				border: 1px solid #bebebe;
				border-radius: 18px;
				margin-left: 20px;
				color: #888;
				height: 36px;
				line-height: 36px;
				margin-bottom: 20px;
				padding-left: 30px !important;
			}
		}
	}
}
.iconImg{
	width: 18px;
	margin-right: 10px;
}
.el-menu-item.is-active{
	color: #266ff9!important;
	border:1px solid #266ff9 !important;
}
</style>