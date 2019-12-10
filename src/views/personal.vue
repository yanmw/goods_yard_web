<template>
  <div class="mainIndex">
    <!-- <router-view class="view header" name="header"></router-view> -->
    <head-n></head-n>
    <!-- <router-view class="menu" name="headn"></router-view> -->
    <list-n v-if="user == 1"></list-n>
	<list-use v-if="user == 2"></list-use>
    <div class="rightbox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadN from "../components/head.vue";
import ListN from "../components/listNav.vue";
import ListUse from "../components/listNavUser.vue";
import { constants } from "crypto";
export default {
  data() {
    return {
      title: "",
	  user: 1
    };
  },
  components: {
    HeadN,
    ListN,
	ListUse
  },
  created() {
      this.user = sessionStorage.getItem("zlmenu");
	  // console.log(info)
  },
  methods: {
    contentTitle(e) {
      this.title = e;
    }
  },
};
</script>

<style lang="less">
// .dataOverview {
//   display: flex;
//   justify-content: space-around;
//   & > div {
//     width: 25%;
//     margin: 0 3%;
//     border: solid 1px;
//     height: 85px;
//     border-radius: 6px;
//     p {
//       margin: 10px 0 0 24px;
//       font-size: 16px;
//       color: white;
//     }
//   }
// }
.el-table--fit{
	border-top: 1px dashed #E1E1E1 !important;
	color: #4D6375 !important;
}
.pagination-container[data-v-72233bcd] {
    background-color: transparent !important;
    padding: 20px 16px;
}
.mainIndex{
	background-color: #f5f8ff ;
	height: 100%;
}

	.personHead{
		width: 98.5%;
		min-width: 1390px;
		height: 67px;
		padding: 0 10px;
		line-height: 67px;
		background: #fff;
		position: relative;
		box-shadow: 0px 2px 8px 0px rgba(54, 196, 209, 0.2);
		border-radius: 5px;
		.ge-head{
			margin-right: 20px;
			label{
				margin-right: 5px;
			}
		}
	}
	.btn-b{
		background-image: linear-gradient(#256ff8, #256ff8), linear-gradient(#3862ff, #3862ff);
		background-blend-mode: normal, normal;
		box-shadow: 0px 3px 5px 0px rgba(0, 197, 195, 0.2);;
		border-radius: 3px;
		color: #fff;
		padding: 7px 20px;
		cursor: pointer;
	}
	.btn-ba{
		border-radius: 3px;
		border: solid 1px #256ff8;
		color: #256ff8;
		padding: 7px 20px;
		margin-left: 20px;
		cursor: pointer;
	}
	.export{
		color: #256ff8;
		cursor: pointer;
	}
	.personTit{
		padding: 30px 0;
		color: #256ff8;
		font-size: 16px;
		font-weight: bold;
		position: relative;
		letter-spacing: 2px;
		.export{
			position: absolute;
			right: 2%;
		}
		.btn-b{
			position: absolute;
			right: 2%;
		}
	}
	.tableB{
		height: 27px !important;
		line-height: 27px;
		.tableBtn{
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
			background-color: #256ff8;
			color: #fff;
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
	.dioOrder{
		color: #333333;
		font-size: 18px;
		border-bottom: 1px #c6c6c6 dashed;
		text-align: center;
		padding: 10px 0;
		position: relative;
		// margin-bottom: 60px;
		span{
			position: absolute;
			bottom:0px;
			font-size: 14px;
			color: #2589ff;
		}
	}
	.el-upload{
		.btn-ba{
			padding: 4px 10px !important;
		}
	}
	.preInfo{
		padding: 20px;
		margin-bottom:10px;
		div{
			span{
				display: inline-block;
				vertical-align: top;
				width: 33%;
				padding-left: 5%;
				margin-bottom: 30px;
				font-size: 16px;
				color:#333;
				label{
					color: #666;
					font-size: 14px;
				}
			}
		}
	}
	.wayNav{
		position: relative;
		margin-bottom: 10px;
		padding: 10px;
		span{
			display: inline-block;
			padding: 15px 30px;
			color: #333;
			border: solid 1px #d2d2d2;
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
		border-top: 2px solid #075cf0!important;
		border-bottom: none !important;
	}
	.logoBox{
		width: 100%;
		min-width: 1200px;
		height: 80px;
		line-height: 80px;
		color: #fff;
		background-image: linear-gradient(0deg, 
				#2589ff 0%, 
				#256ef8 100%), 
			linear-gradient(
				#ffffff, 
				#ffffff);
			background-blend-mode: normal, 
				normal;
			box-shadow: 0px 2px 8px 0px 
				rgba(37, 110, 248, 0.4);
			border-radius: 0px 0px 10px 10px;
			div{
				display: inline-block;
			}
			.tit{
				margin-left: 50px;
				img{
					width: 50px;
					height: 50px;
					vertical-align: middle;
				}
				span{
					margin-left: 20px;
					font-size: 26px;
					position: relative;
					top:4px;
				}
			}
			.titTab{
				margin-left: 15%;
				span{
					display: inline-block;
					width: 260px;
					text-align: center;
					font-size: 20px;
					cursor: pointer;
				}
			}
			
	}

</style>
<style lang="less" scoped>
.rightbox {
  width: calc(100% - 320px);
  margin-top: 40px;
  float: left;
  .title {
    font-size: 22px;
    color: #888;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    // background: url("../assets/tab-bg.png") no-repeat;
	background-size: 100% 100%;
    margin-bottom: 20px;
  }
}

</style>
