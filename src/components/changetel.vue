<template>
<div id="app_changeTel">
	<router-link to="/UsermodifyInfo">
			<i class="el-icon-arrow-left myleft"></i> 
	</router-link>
	<header class="myheader">
			<p class="title">更换绑定手机</p>
	</header>
	<body class="box">
			<input v-model="saleman_tel" placeholder="请输入新绑定的手机号" class="sale_input"></input><br>
			<div>
				<input type="text" v-model="code" placeholder="手机验证码" class="tel_test">
				<button class="btn" @click="subtel()" :class="{mygettel:ismygettel}">获取验证码</button>
				<button class="btn" :class="{mysend:ismysend}">已发送{{downtimes}}s...</button> 
			</div>
			<button class="btn_sub" @click="changePawd()">确定</button>
	</body>
</div>
</template>
<script>
import pub from '.././myaxios.js'	
import $ from "jquery"
export default {
    data(){
        return{
				saleman_tel:'',
				code:'',
				ismysend:true,
        ismygettel:false,
				downtimes:100,
				saleman_id:localStorage.getItem('id')
        }
    },
    methods:{
			subtel(){
				const that=this
				console.log('获取验证码')
				var phone = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
				if (!phone.test(that.saleman_tel)) {
					this.$message({
					message: '手机号格式错误',
					type: 'error',
					center: true
					});
					return; 
				}
				var subtelParam = {
				that: that,
				_url: pub._url,
				ur: pub._DetailApi.api_tel_param,
				data: {
					telePhoneNum: that.saleman_tel,
					templateCode:"SMS_153325741"
				},
				cbk: that.subtelRes
				}
				pub._InitAjax(subtelParam);
		},
		subtelRes(res){
			const that=this
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
					alert('网络错误！！！')
					return;
				} 
			},
			changePawd(){
					console.log('确定密码')
					const that=this
					var changetelParam={
						that:that,
						_url:pub._url,
						ur:pub._DetailApi.api_updateSalemanInfo,
						data:{
							saleman_tel:that.saleman_tel,
							saleman_id:that.saleman_id,
							code:that.code
						},
						cbk:that.subChangeTelCbk
					}
					pub._InitAjax(changetelParam)
			},
			subChangeTelCbk(res){
				const that=this
				// console.log(res)
				if(res.stateCode=='200'){
					this.$message({
            message: '修改成功',
            type: 'success',
            center: true
					});
					that.saleman_tel=""
					that.code=""
				}else{
					this.$message({
            message: res.stateMsg,
            type: 'error',
            center: true
					});
					that.saleman_tel=""
					that.code=""
				}
			}
    },
    created(){
        
    }
}
</script>
<style scoped>
#app_changeTel .myleft{
    position: fixed;
    font-size: 0.28rem;
    padding:0.1rem;
		margin-left: 0.1rem;
		color: #333;
    }
#app_changeTel .title{
    text-align: center;
    }
#app_changeTel .myheader{
    border-bottom: 1px solid #ddd;
    }
#app_changeTel .login_footer{
    display: flex;
    justify-content: space-around;
    margin-top: 0.2rem
    }
#app_changeTel .Mycheck{
    margin-left: 0.1rem;
    margin-right: 0.08rem;
    color: #282828;
    }
#app_changeTel .tel_test{
		width: 52.5% !important;
		text-align: left
}
#app_changeTel .btn{
		width: 31%;
		border: 1px solid #ddd;
		height: 0.35rem;
		margin-left: 0.12rem;
		background: rgba(130,152,15,0.2);
		color: #82980f;
		border: 0px;
		vertical-align: bottom;
  }
#app_changeTel .mysend{
		display: none;
cursor: not-allowed;
}
#app_changeTel .mygettel{
		display: none;
}
</style>