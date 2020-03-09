<template>
	<div class="home">
		<div class="header">
			<p>
				<span class="head_left"><img src="../assets/1.png" alt="">{{loginInfo.name}}</span>
				<span style="font-size: 22px;letter-spacing: 1px;">河南强润物流有限公司智慧电子货场综合管理平台</span>
				<span class="head_right">
					<span><img src="../assets/2.png" alt=""><span class="mark">1</span></span>
					<span @click="logout" style="cursor: pointer;"><img src="../assets/3.png" alt=""></span>
				</span>
			</p>
			<div class="goLogin">
				<div class="across">
					<span class="span" v-for="(i,index) in menuList"  v-bind:class="{ headActive:index==current}" @click="selected(i,index)">
						<i class="iconfont" :class="i.icon"></i>
					    {{i.name}}
					</span>
				</div>
			</div>
		</div>
		<div class="main">
			    <el-aside id="asideNav">
					<div style="background-color: #fff;width: 200px; border-radius:0px 10px 10px 0px;min-height: 800px;">
						<div class="logo-name">
						  <p><i class="iconfont" :class="icon"></i>{{title}}</p>
						</div>
						<el-menu :default-active="path" class="el-menu-vertical"
						         @select="selectmenu"
						         text-color="#666"
						         active-text-color="#fff"
						         :collapse-transition="true"
								 :default-openeds="openeds"
								 router 
						>
						  <template v-for="(item,index) in menu" v-if="!item.hidden">
						    <el-submenu  v-if="item.children.length>0"  :index="index+''">
						      <template slot="title">
						        <span slot="title" style="color: #1E1F1F;font-size: 18px;">{{ item.name }}</span>
						      </template>
								<menu-tree :menuData="item.children"></menu-tree>
						   </el-submenu>
							   	 <el-menu-item :index="item.url" v-else>
							   	 	<span class="menuDot"></span>
							   	    <span slot="title">{{ item.name}}</span>
									<span class="markList" v-if="item.mark">{{item.mark}}</span>
							   		<span class="bergin"></span>
							   	 </el-menu-item>
						  </template>
									
						</el-menu>
					</div>
			      
			    </el-aside>
				<div class="rightbox">
				  <router-view></router-view>
				</div>
		</div>
	</div>	
</template>

<script>
	import Cookies from 'js-cookie'
	import {findMenuTree} from '@/api/index'
	import menuTree from './menuTree'
	export default{
		name: 'asideNav',
		components: {
		  menuTree,
		},
		watch: {
		  $route(to,from){ 
		  	this.path = to.path
			if(this.$route.path == 'historyCheng'){
				this.path = '/business/observer/work'
			}
		  }
		},
		data() {
			return {
				openeds:['0','1','2','3','4','5'],
				menuList:[],
				menu:[],
				loginInfo:'',
				title:'',
				icon:'',
				info2:'',
				path:'',
				tabSpan:0,
				pwdList: [],
				oldPwdList: [],
				isDelete: false,
				info:{
					userName:''
				},
				current:0,
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

				
			}
		},
		
		created() {	
			var info1 = sessionStorage.getItem("qrInfo");
			this.tabSpan = sessionStorage.getItem("qrTab");
			if(this.tabSpan == null){
				this.tabSpan = 1
			}
			this.current = this.tabSpan
			this.loginInfo = JSON.parse(info1)
			if(this.loginInfo == null){
				this.$router.push("/login")
			}
			this.getMenuList()
			this.path = this.$route.path
			if(this.$route.path == 'historyCheng'){
				this.path = '/business/observer/work'
			}
			// console.log(this.menuList)
			
			
			// var info1 = sessionStorage.getItem("zlInfo");
			// this.isAuth = sessionStorage.getItem("zlIsAuth")
			// this.typeId = sessionStorage.getItem("zlmenu");
			// var info = JSON.parse(info1)
			// if(info1 == null){
			// 	console.log('未登录')
			// }else{
			// 	this.login = info
			// 	this.info2 = info.phone
			// }
			// this.getCategory()
			// this.getSource()
			// this.getUserList()
			// this.getBuyUserList()
			// console.log(this.current)
		},
		methods: {
			selected(row, idx) {
			    this.current = idx
				sessionStorage.setItem('qrTab',idx)
				sessionStorage.setItem('qrDept',row.id)
				this.menu = row.children
				this.title = row.name
				this.icon = row.icon 
				
				// this.path = row.children[0].children[0].url
				// this.$router.push(row.children[0].children[0].url)
				// console.log(row.children[0].children[0].url)
				location.reload()
			},
			selectmenu (key) {
				// console.log(key)
				this.path = key
				document.scrollingElement.scrollTop = 0;
				// // this.$router.push(key)
			 //        let router = this.menu
			 //       let name = ''
			 //       let navTitle = function (path, routerARR) {
			 //         for (let i = 0; i < routerARR.length; i++) {
			 //           if (routerARR[i].children.length > 0 || routerARR[i].path === path) {
			 //             if (routerARR[i].path === path && routerARR[i].children.length < 1) {
			 //               name = routerARR[i].name
			 //               break
			 //             }
			 //             navTitle(path, routerARR[i].children)
			 //           }
			 //         }
			 //         return name
			 //       }
					// console.log(this.$store)
			  //       this.$store.dispatch('addTab', {
			  //         title: navTitle(key, router),
			  //         path: key
			  //       })
			      },
				  getMenuList(){
					  findMenuTree({userName:this.loginInfo.username}).then((res) => {
					      if (res.code == 200) {
					          this.menuList = res.data
							  this.menu = this.menuList[this.tabSpan].children
							  this.title = this.menuList[this.tabSpan].name
							  this.icon = this.menuList[this.tabSpan].icon
					      } else {
					  		this.$message.error(res.msg);
					          this.categorys = []
					      }
					  }).catch(() => {
					      this.loading = false
					  })
				 },
			// getCategory(){
			// 	selectGoodsCategory().then((res) => {
			// 	    if (res.code == 200) {
			// 	        this.tabSpan = res.data
			// 	    } else {
			// 			this.$message.error(res.msg);
			// 	        this.categorys = []
			// 	    }
			// 	}).catch(() => {
			// 	    this.loading = false
			// 	})
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
			    // logout().then((res) => {
			    	  // if(res.code == 200){
						  sessionStorage.removeItem('qrInfo');
						  sessionStorage.removeItem('qrTab');
						  sessionStorage.removeItem('qrDept');
						  Cookies.remove('qrToken')
						  this.$router.push("/login")
			    		  // this.$message.success(res.msg);
			    	 //  }
			      //   }).catch(function(res) {
			    		// console.log(res)
			      // })
			    }) 
			    .catch(() => {})
			},
		}
	}
</script>
<style lang="less" >
	@media only screen and (max-width: 1640px) {
		// .personHead{
		// 	font-size: 12px;
		// }
	}
	body{
		height: 100%;
	}
	a {
		text-decoration: none;
	}
	.el-submenu__title{
		width: 200px;
	}
	// .el-submenu__icon-arrow{
	// 	right: 40px !important;
	// }
	.iconfont{
		font-size: 20px;
	}
    .header{
		width:100%;
		min-width: 1380px;
		height:151px;
		text-align: center;
		color: #fff;
		background: url(../assets/bg.png) no-repeat;
		background-size: 100% 100%;
		background-color:rgba(52,100,224,1);
		border-radius:0px 0px 30px 0px;
		p{
			padding: 20px 40px;
			position: relative;
			.head_left{
				position: absolute;
				left: 40px;
				cursor: pointer;
			}
			.head_right{
				position: absolute;
				right: 40px;
				span{
					margin-left: 40px;
					cursor: pointer;
					position: relative;
				}
			}
			img{
				width: 24px;
				vertical-align: middle;
				margin-right: 5px;
			}
		}
		
		.goLogin{
			min-width: 1380px;
			height: 70px;
			line-height: 70px;
			text-align: left;
			font-size: 22px;
			.across{
				margin-left: 240px;
				.span{
					display: inline-block;
					width: 12%;
					cursor: pointer;
					text-align: center;
					i{	
						margin-right: 5px;
						vertical-align: middle;
						position: relative;
						top:-2px;
					}
				}
			}
		}  
	}
	.mark{
		position: absolute !important;
		left: -30px;
		top:-8px;
		font-size: 12px;
		background-color: #FF3333;
		border-radius: 20px;
		padding: 4px 8px;
		transform: scale(0.8);
	}
	.markList{
		position: absolute !important;
		right: 20px;
		top:10px;
		font-size: 12px;
		height: 22px;
		line-height: 22px;
		background-color: #FF3333;
		border-radius: 20px;
		padding: 0px 7px;
		color: #fff;
		transform: scale(0.6);
	}
	.headActive{
		background: url(../assets/select-bg.png) no-repeat;
		background-size: 100% 100%;
		color: #00BF6F;
		// font-size: 20px;
		padding-top: 10px;
		i{
			margin-right: 10px;
			font-size: 24px;
		}
	}
	.menuDot{
		display: inline-block;
		margin-left: 20px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border:1px solid #666;
		background-color: #fff;
		margin-right: 10px;
	}
	  .main{
		  // display: flex;
		 position: relative;
	  }
	  .rightbox{
		   // width: 100%;
		   display: inline-block;
		   position: absolute;
		   top:20px;
		   left: 240px;
		   width: calc(100% - 250px);
		   min-width: 950px;
	  }
	  #asideNav {
		width: 220px!important;	    // width: auto !important;
		min-height: 800px;
		position: relative;
	    // height: 800px;
		// background-color: #fff;
		// border-radius:0px 10px 10px 0px;
		top:-70px;
	    display: flex;
	    flex-direction: column;
	    .logo-name {
	      background-color: #fff !important;
		  border-radius:0px 10px 0px 0px;
		  width: 200px;
	      // @extend %w100;
	      font-weight: 300;
	      z-index: 999;
	      p {
	        height: 70px;
	        line-height: 70px;
	        text-align: left;
	        font-size: 20px;
			margin-left: 20px;
	        color: #00BF6F;
			i{
				vertical-align: middle;
				margin-right: 10px;
				position: relative;
				top: -2px;
			}
	      }
	    }
	    .el-menu-vertical:not(.el-menu--collapse) {
	      width: 220px;
		  height: 100%;
	      // @extend %h100;
	      overflow-y: scroll;
	    }
		.bergin{
			position: absolute;
			top:14px;
			right: -27px;
			display: inline-block;
			width: 0;
			height: 0; 
			border-top: 12px solid transparent; 
			border-bottom: 12px solid transparent; 
			// border-left: 15px solid transparent; 
			// // border-left: 15px solid #00BF6F; 
			border-right: 12px solid transparent;
		}
	    .el-menu {
	      flex: 1;
	      overflow: inherit;
	      border-right: none;
		  background-color: transparent!important;
		   border-radius:0px 0px 10px 0px;
	      &::-webkit-scrollbar {
	        display: none;
	      }
	      .fa {
	        vertical-align: middle;
	        margin-right: 5px;
	        width: 24px;
	        text-align: center;
	        font-size: 18px;
	      }
		  a{
			  position: relative;
		  }
	      .el-menu-item {
			  width: 200px;
			  // min-width: 180px !important;
			  font-size: 16px!important;
	          background-color: #fff !important;
	        // border-bottom: 1px solid #020f1d;
	        &:hover {
	          color: #ffffff !important;
	          background: rgba(0,191,111,0.5) !important;
			  border-radius:0px 0px 0px 0px !important;
			  .menuDot{
			  	border:1px solid #fff;
			  }
	        }
	      }
		  .el-menu-item:nth-last-child(1){
			  border-radius:0px 0px 10px 0px;
		  }
	      .el-menu-item.is-active {
			position: relative;
			width: 200px;
	        background-color: #00BF6F !important;
			border-radius:0px 0px 0px 0px;
			.menuDot{
				border:1px solid #fff;
			}
			.bergin{
				border-left: 15px solid #00BF6F!important;
			}
	      }
		 
	      .is-opened > .el-submenu__title > .el-icon-arrow-down {
	        color: #666;
	        font-weight: 500;
	        font-size: 18px;
	      }
	    }
	
	  }
	  .personHead{
	  	width: 98.5%;
	  	padding: 0 10px;
	  	line-height: 60px;
	  	background: #fff;
	  	position: relative;
	  	box-shadow: 0px 2px 8px 0px rgba(54, 196, 209, 0.2);
	  	border-radius: 5px;
	  	.ge-head{
			display: inline-block;
	  		margin-right: 20px;
			font-size: 14px;
	  		label{
	  			margin-right: 5px;
	  		}
	  	}
	  }
	  .btn-b{
		display: inline-block;
	  	background-image: linear-gradient(#256ff8, #256ff8), linear-gradient(#3862ff, #3862ff);
	  	background-blend-mode: normal, normal;
	  	box-shadow: 0px 3px 5px 0px rgba(0, 197, 195, 0.2);;
	  	border-radius: 3px;
	  	color: #fff;
	  	padding: 0px 20px;
		height: 35px;
		line-height: 35px;
	  	cursor: pointer;
	  }
	  .btn-ba{
		display: inline-block;
	  	border-radius: 3px;
	  	border: solid 1px #EBEBEB;
	  	color: #999999;
	  	padding: 0px 20px;
		height: 35px;
		line-height: 35px;
	  	margin-left: 20px;
	  	cursor: pointer;
	  }
	  .tableB{
	  	height: 27px !important;
	  	line-height: 27px;
	  	.tableBtn{
			display: inline-block;
	  		border-radius: 3px;
	  		padding: 3px 10px;
	  		margin-left: 10px;
	  		cursor: pointer;
	  	}
	  	.gray{
	  		border: solid 1px #999999;
	  		color: #999;
	  	}
	  	.green{
	  		border: solid 1px #096a1e;
	  		color: #096a1e;
	  	}
	  	.blue{
	  		
	  		color: #256ff8;
	  	}
	  	.blueB{
	  		border: solid 1px #256ff8;
	  		color: #256ff8;
	  	}
	  	.redB{
	  		border: solid 1px #ff0000;
	  		color: #ff0000;
	  	}
	  }
	  .wayNav{
	  	position: relative;
	  	margin-bottom: 10px;
	  	padding: 10px;
	  	span{
	  		display: inline-block;
	  		padding: 15px 30px;
	  		color: #666666;
	  		border: solid 1px #D2D2D2;
	  		margin-left: -1px;
	  		cursor: pointer;
	  	}
	  	.btn-b{
	  		position: absolute;
	  		right: 20px;
	  		color: #fff;
	  		height: 40px;
	  		line-height: 10px;
	  		padding: 15px 10px;
	  		font-size: 14px;
	  	}
	  }
	  .tabspan{
	  	border-top: 2px solid #00BF6F!important;
	  	border-left: 2px solid #00BF6F!important;
	  	border-right: 3px solid #00BF6F!important;
	  	border-bottom: none !important;
		color: #00BF6F !important;
	  }
	  .indexPerson{
	  	width: 98%;
		min-width: 1100px;
	  	height: 700px;
	  	background-color: #ffffff;
	  	border-radius: 6px;
	  	padding: 30px 40px;
	  }
	  .fromInput{
		  width: 700px;
		  margin: 0px auto;
		  margin-top: 80px;
	  }
	  .red{
		  color: #FF0000;
	  }
	  .greenZhu{
		  color: #00BF6F;
	  }
	  .el-dialog__footer {
	      padding: 10px 20px 60px !important;
          text-align: center!important;
	  }
	  .weiDot{
		  display: inline-block;
		  width:8px;
		  height:8px;
		  border:1px solid rgba(102,102,102,1);
		  border-radius:50%;
		  margin-right: 5px;
	  }
	  .redDot{
		  display: inline-block;
		  width:8px;
		  height:8px;
		  border:1px solid rgba(255,0,0,1);
		  border-radius:50%;
		  margin-right: 5px;
	  }
	  .greenDot{
		  display: inline-block;
		  width:8px;
		  height:8px;
		  border:1px solid  #00BF6F;
		  border-radius:50%;
		  margin-right: 5px;
	  }
	  .el-dialog__header{
		  background-color: #F0F0F0;
	  }
	  .dialog-footer{
	  	
	  	button{
	  		width: 200px;
	  	}
	  }
</style>
