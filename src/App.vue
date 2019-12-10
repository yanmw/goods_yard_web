<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
	@font-face {
	  font-family: "准元黑简";
	  src: url("./assets/fontFile/FZY3JW.TTF");
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
	background-color: #f5f8ff;
}
#app {
  font-family:Source Han Sans CN;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}

.el-table--fit {
	border-top: 1px solid #256ff8 !important;
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
