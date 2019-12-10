<template>
  <div class="aside">
	  <el-menu
	    :default-active="path"
	    class="el-menu-vertical-demo" unique-opened>
		    <router-link to='personIndex'>
	  		    <el-menu-item index="/personal/personIndex" style="margin-top: 40px;border:none!important;border-bottom: 1px solid #e8e7ec!important;font-size: 16px;">
				    <i class="el-icon-s-home" style="color: #266ff9;"></i>
					<span slot="title" >用户首页</span>
	  		    </el-menu-item>
			</router-link>
	        <el-submenu index="2">
	          <template slot="title">
	            <img class="iconImg" src="../assets/5.jpg" alt="">
	            <span>买货管理</span>
	          </template>
	          <el-menu-item-group class="index1" style="position: relative;top:-10px;border-bottom: none!important;">
				  <el-submenu index="2-1" style="border-bottom: none!important;margin-left: 20px;">
				      <template slot="title" style="font-size: 16px!important;">平台购买</template>
				  		<router-link to="preSettlementOrder">
				            <el-menu-item index="/personal/preSettlementOrder" style="border: none!important;">订单管理</el-menu-item>
				        </router-link>
				  		<router-link to='waybill'>
				  			<el-menu-item index="/personal/waybill" style="border: none!important;">运单管理</el-menu-item>
				      </router-link>
				   </el-submenu>
				  <el-submenu index="2-2" style="margin-left: 20px;border-bottom: none!important;">
				      <template slot="title" style="border: solid 1px #bebebe!important;font-size: 16px!important;">意向购买</template>
				  	  <router-link to="issueBuy">
				         <el-menu-item index="/personal/issueBuy" style="border: none!important;">发布求购</el-menu-item>
				      </router-link>
				  	  <router-link to='listBuy'>
				  		 <el-menu-item index="/personal/listBuy" style="border: none!important;">求购列表</el-menu-item>
				      </router-link>
					  <router-link to='maintainBuy'>
					  	 <el-menu-item index="/personal/maintainBuy" style="border: none!important;">意向订单</el-menu-item>
					  </router-link>
				   </el-submenu>
	          </el-menu-item-group>
	        </el-submenu>
			<el-submenu index="3">
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
			     <img class="iconImg" src="../assets/3.png" alt="">
			    <span>财务管理</span>
			  </template>
			  <el-menu-item-group>
				  <router-link to="dealUser">
				  	  <el-menu-item index="/personal/dealUser">交易流水</el-menu-item>			  
				  </router-link>
				  <router-link to="recharge">
				  	  <el-menu-item index="/personal/recharge">充值记录</el-menu-item>			  
				  </router-link>
			  </el-menu-item-group>
			</el-submenu>
			<el-submenu index="5">
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
				 <router-link to="paymentCode">
				 	<el-menu-item index="/personal/paymentCode">支付密码设置</el-menu-item>
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
	  path:''
    };
  },
  created() {
	  // console.log(this.$route.path)
	  this.path = this.$route.path
	  if(this.$route.path == '/personal/issueWaybill'){
		  this.path = "/personal/waybill"
	  }else if(this.$route.path == '/personal/checkPendingOrder' || this.$route.path == '/personal/actualSettlementOrder' ){
			this.path = '/personal/preSettlementOrder'
		 }
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
   $route(to,from){ 
		 // this.path = this.$route.path
		 if(to.path == '/personal/actualSettlementOrder'){
		 	this.path = "/personal/preSettlementOrder"
		 }else if(to.path == '/personal/checkPendingOrder' ){
			this.path = '/personal/preSettlementOrder'
		 }else{
			 this.path = this.$route.path
		 }
       }
  },
  methods: {
	  handleOpen(key, keyPath) {
	    console.log(key, keyPath);
	  },
	  handleClose(key, keyPath) {
	    console.log(key, keyPath);
	  },
    navClick(i, path, name) {
      this.navI = i;
      this.$router.push("/home/" + path);
      this.$emit("cb", name)
    }
  }
};
</script>

<style lang="less" scoped>
	// .index1 .el-submenu{
	// 	.el-submenu__title{
	// 		height: 30px!important;
	// 		line-height: 30px!important;
	// 		border: solid 1px #bebebe!important;
	// 		border-radius: 20px;
	// 	}
	// }
	// .el-menu-item, .el-submenu__title{
	// 	height: 30px!important;
	// 	line-height: 30px!important;
	// 	border: solid 1px #bebebe!important;
	// 	border-radius: 20px;
	// }
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
	background-color: #fff !important;
}
</style>
