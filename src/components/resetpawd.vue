<template>
<div id="app_reset">
	<router-link to="/UsermodifyInfo">
			<i class="el-icon-arrow-left myleft"></i> 
	</router-link>
	<header class="myheader">
			<p class="title">登录密码重置</p>
	</header>
	<body class="box">
			<input v-model="saleman_password_old" placeholder="原始密码" class="sale_input" @change="originalPwd()" type="password"></input>
			<input v-model="saleman_password_new" placeholder="新密码" class="sale_input" type="password"></input> 
			<input v-model="saleman_password" placeholder="确定密码" class="sale_input" type="password"></input> 
			<button class="btn_sub" @click="resetpawd()">确定重置密码</button>
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
			saleman_password_old:'',
			saleman_id:localStorage.getItem('id'),
			saleman_password_new:'',
			saleman_password:'',
		}
	},
	methods:{
		originalPwd(){
			// console.log('获取原始密码')
			const that=this
			var subOldPwdParam={
				that:that,
				_url:pub._url,
				ur:pub._DetailApi.api_originalPwd,
				data:{
					saleman_id:that.saleman_id,
					saleman_password_old:md5(that.saleman_password_old)
				},
				cbk:that.subOldPwdcbk
			}
			pub._InitAjax(subOldPwdParam)
		},
		subOldPwdcbk(res){
			const that=this
			if(res.stateCode=='200'){
				this.$message({
				message:'与原始密码一致',
				type: 'success',
				center: true
				});
			}else{
			this.$message({
				message:res.stateMsg,
				type: 'error',
				center: true
				});
			}
		},
		resetpawd(){
			const that=this
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
				this.$message({
					message: '两次密码不一致',
					type: 'error',
					center: true
				});
					return false
			}
			var subResetPwdParam={
				that:that,
				_url:pub._url,
				ur:pub._DetailApi.api_updateSalemanInfo,
				data:{
					saleman_id:that.saleman_id,
					saleman_password:md5(that.saleman_password)
				},
				cbk:that.subResetPwdcbk
			}
			pub._InitAjax(subResetPwdParam)
		},
		subResetPwdcbk(res){
			const that=this
			// console.log(res)
			if(res.stateCode=='200'){
				this.$message({
					message: '重置密码成功',
					type: 'success',
					center: true
				});
				localStorage.clear();
				this.$router.push('/')
			}else{
			this.$message({
				message: '信息错误',
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
</style>