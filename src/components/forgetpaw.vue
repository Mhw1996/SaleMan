<template>
	<div id="app_reset">
		<router-link to="/">
			<i class="el-icon-arrow-left myleft"></i> 
		</router-link>
		<header class="myheader">
				<p class="title">忘记密码</p>
		</header>
		<body class="box">
				<input v-model="saleman_tel" placeholder="请输入手机号" class="sale_input"></input>
				<input type="text" v-model="code" placeholder="手机验证码" class="tel_test">
				<button class="btn" @click="getCode()" :class="{mygettel:ismygettel}">获取验证码</button>
				<button class="btn" :class="{mysend:ismysend}">已发送{{downtimes}}s...</button> 
				<input v-model="saleman_password_new" placeholder="新密码" class="sale_input" type="password"></input> 
				<input v-model="saleman_password" placeholder="确定密码" class="sale_input" type="password"></input> 
				<button class="btn_sub" @click="modifypwd()">确定修改</button>
		</body>
	</div>
</template>    
<script>
import pub from '.././myaxios.js'
import $ from "jquery"
import md5 from 'js-md5'
export default {
	data(){
			return{
			saleman_tel:'',
			saleman_password_new:'',
			saleman_password:'',
			code:'',
			ismysend:true,
			ismygettel:false,
			downtimes:100,
			}
	},
methods:{
	getCode(){
		// 获取手机验证码
			const that=this
			var phone = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
			if (!phone.test(that.saleman_tel)) {
				this.$message({
				message: '手机号格式错误',
				type: 'error',
				center: true
				});
				return; 
			}
		var subtelParam={
			that: that,
			_url: pub._url,
			ur: pub._DetailApi.api_tel_param,
			data: {
				telePhoneNum:that.saleman_tel,
				templateCode:"SMS_153325741"
			},
			cbk: that.subtelRes
			}
			console.log(subtelParam)
			pub._InitAjax(subtelParam);
		},
		subtelRes(res){
			const that=this;
			console.log(res)
			if(res.code=='200'){
				that.ismysend=false
				that.ismygettel=true
			const mytimes=setInterval(()=>{
					that.downtimes--
					if(that.downtimes==0){
						that.ismysend=true
						that.ismygettel=false
						that.downtimes=100
						clearInterval(mytimes)
					}
				},1000)

			}else{
				this.$message({
				message: '网路错误！！',
				type: 'error',
				center: true
				});
			}
		},
		modifypwd(){
			// 提交销售员的注册信息
			const that=this;
			const pawd=/^[a-zA-Z0-9]{6}$/
			if(!pawd.test(that.saleman_password) && !pawd.test(that.saleman_password_new)){
					this.$message({
					message: '密码至少六个字符',
					type: 'error',
					center: true
				});
				return false;
			}
			if(that.saleman_password_new!=that.saleman_password){
				// alert("两次密码不一致")
				this.$message({
					message: '两次密码不一致',
					type: 'error',
					center: true
				});
					return false;
			}
		var subPwdParam={
			that:that,
			_url:pub._url,
			ur:pub._DetailApi.api_forgetPwd,
			data:{
				saleman_tel:that.saleman_tel,
				code:that.code,
				saleman_password:md5(that.saleman_password)
			},
			cbk:that.subPwdcbk
		}
		console.log(subPwdParam) 
		pub._InitAjax(subPwdParam)
		},
		subPwdcbk(res){
			const that=this
			console.log(res)
			if(res.code=='200' || res.stateCode=='200'){
				this.$message({
					message: '成功修改密码',
					type: 'success',
					center: true
				});
			this.$router.push('/')
			}else{
				this.$message({
					message: res.stateMsg,
					type: 'error',
					center: true
				});
			}
		}

	},
	created(){
		
	}
}
</script>
<style scoped>
.myleft{
		position: fixed;
		font-size:0.28rem;
		padding:0.1rem;
		color: #333;
		}
.title{
		text-align: center;
		}
.myheader{
		border-bottom: 1px solid #ddd;
		}
.login_footer{
		display: flex;
		justify-content: space-around;
		margin-top: 0.2rem
	}
.Mycheck{
		margin-left: 0.1rem;
		margin-right: 0.08rem;
		color: #282828;
	}
	.tel_test{
		width: 52.5% !important;
		text-align: left
}
.btn{
		width: 31%;
		border: 1px solid #ddd;
		height: 0.35rem;
		margin-left: 0.12rem;
		background: rgba(130,152,15,0.2);
		color: #82980f;
		border: 0px;
		vertical-align: bottom;
}
.mysend{
		display: none;
cursor: not-allowed;
}
.mygettel{
		display: none;
}
</style>