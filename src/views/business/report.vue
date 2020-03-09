<template>
	<div>
		<p class="spanTab" v-if="tabSpanHome == 1">业务部 > 内部管理 > <span>工作报告</span></p>
		<p class="spanTab" v-if="tabSpanHome == 5">综合部 > 部门管理 > <span>工作报告</span></p>
		<div class="indexPerson" style="padding: 80px 0;">
			<img style="width: 40%;margin-left:30%;" src="../../assets/none.png" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tabSpanHome:''
			}
		},
		created() {
			this.tabSpanHome = sessionStorage.getItem("qrTab");

				// this.tabSpan = sessionStorage.getItem("qrDept");
				// var info1 = sessionStorage.getItem("qrInfo");
				// var info = JSON.parse(info1)
				// this.login = info
		}
	}
</script>

<style>
</style>
