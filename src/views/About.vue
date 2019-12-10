<template>
  <div class="about">
    <div class='am_payPwd' :id="`ids_${id}`">
        <input type="text"
          maxlength="1"
          @input="changeInput"
          @click="changePwd"
          v-model="pwdList[i]"
          @keyup="keyUp($event)"
          @keydown="oldPwdList = pwdList.length"
          class="shortInput"
          v-for="(v, i) in 6" :key="i">
      </div>
	  <button @click="aa">11111</button>
	  <!-- <MyNumberInput :point="2" :max="99999" placeholder="请输入金额" v-model.number="amount"></MyNumberInput> -->

	  	<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm1.beginDate"   format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsStart"></el-date-picker>

	  	<el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm1.endDate"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsEnd"></el-date-picker>

  </div>
</template>
<script>
	import MyNumberInput from '@/components/MyNumberInput';
	export default {
		    components: {
		       MyNumberInput //注册 
		    },
		data () {
		    return {
		      pwdList: [],
		      oldPwdList: [],
		      isDelete: false,
		      ipt: '',
			  amount:' ',
			  ruleForm1:{
				  beginDate:'',
				  endDate:''
			  },
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
		  props: {
		    id: String, // 当一个页面有多个密码输入框时，用id来区分
		    default: '1'
		  },
		  mounted () {
		    // this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`)
		    this.ipt = document.querySelectorAll(`.about #ids_${this.id} .shortInput`)
			console.log(this.ipt)
		  },
		  methods: {
			   // 时间开始选择器
			              // startTimeStatus:function(value){
			              //     this.ruleForm1.beginDate = value
			              // },
			              // // 时间结束选择器
			              // endTimeStatus:function(value){
			              //     this.ruleForm1.endDate = value
			              // },
			  aa(){
				  var reg = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g
				  var ss = String(this.pwdList).replace(reg,"")
				  console.log(ss)
			  },
		    keyUp (ev) {
		      let index = this.pwdList.length
		      if (!index) return
		      if (ev.keyCode === 8) {
		        this.isDelete = true
		        if (this.oldPwdList === this.pwdList.length) {
		          if (index === this.pwdList.length) {
		            this.pwdList.pop()
		          }
		          index--
		        } else {
		          index > 0 && index--
		        }
		        this.ipt[index].focus()
		      } else if (this.isDelete && index === this.pwdList.length && /^\d$/.test(ev.key)) {
		        this.isDelete = false
		        this.pwdList.pop()
		        this.pwdList.push(ev.key)
		        this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus()
		      }
		      this.$emit('getPwd', this.pwdList.join(''))
		    },
		    changePwd () {
		      let index = this.pwdList.length
		      index === 6 && index--
		      this.ipt[index].focus()
		    },
		    changeInput () {
		      let index = this.pwdList.length
		      let val = this.pwdList[index - 1]
		　　   if (!/[0-9]/.test(val)) {　
		        this.pwdList.pop() 　　　　  　　　　 
		        return 　　　 　　
		      }
		      if (!val) {
		        this.pwdList.pop()
		        index--
		        if (index > 0) this.ipt[index - 1].focus()
		      } else {
		        if (index < 6) this.ipt[index].focus()
		      }
		    }
		  }
	}
</script>
<style lang="less" scoped>
  h1{
    color: red;
  }
  .am_payPwd {
    display: inline-block;
    // width: 242px;
    height: 40px;
    border-radius: 5px;
    padding: 10px 0;
    position: relative;
    margin-left: 1px;
    .shortInput {
      text-align: center;
      font-size: 25px;
	  border: solid 1px #e3e3e3;
      float: left;
      width: 40px;
      height: 40px;
	  margin-right: 7px;
      color: #333;
      outline: #ff0067;
    }
  }
</style>