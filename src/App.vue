<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
	@font-face {
	  font-family:Noto Sans S Chinese;
	  src: url("./assets/fontFile/SOURCEHANSANSCN-MEDIUM.OTF");
	}
html{
	width: 100%;
	height: 100%;
}
body{
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	background-color: #EAEFF3;
}
#app {
  font-family:Noto Sans S Chinese;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
.spanTab{
	margin-bottom: 20px;
	font-size: 14px;
	color: #666666;
	span{
		color: #00BF6F;
	}
}
.authTit{
		margin-bottom: 30px;
		color: #666666;
		text-align: left;
		i{
			display: inline-block;
			width: 3px;
			height: 16px;
			background-color: #00BF6F;
			vertical-align: bottom;
			margin-right: 8px;
			position: relative;
			top:-5px;
		}
	}
.el-table--fit {
	border-top: 1px solid #00BF6F !important;
}
	.orderH{
		padding:0 50px;
		.oTit{
			position: relative;
			top:-40px;
			font-size: 16px;
			span{
				color: #2d8ef9;
			}
		}
		
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: absolute;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 100px;
	    height: 100px;
	    line-height: 100px!important;
	    text-align: center;
	  }
	  .avatar {
	    width: 100px;
	    height: 100px;
	    display: block;
	  }

</style>
