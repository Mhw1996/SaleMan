<template>
    <div id="app_salemanSigin">
      <router-link to='/'>
        <i class="el-icon-arrow-left myleft"></i> 
      </router-link>
		<header class="myheader">
					<p  class="title">销售员注册</p> 
		</header>
		<body class="box">
				<input v-model="telePhoneNum" placeholder="请输入手机号" class="sale_input"></input><br>
				<input type="text" v-model="code" placeholder="手机验证码" class="tel_test">
				<button class="btn" @click="subtel()" :class="{mygettel:ismygettel}">获取验证码</button>
				<button class="btn" :class="{mysend:ismysend}">已发送{{downtimes}}s...</button> 
				<input v-model="saleman_name" placeholder="销售员名称" class="sale_input"></input><br>
				<input v-model="saleman_password_new" placeholder="密码" class="sale_input" type="password"></input><br>
				<input v-model="saleman_password" placeholder="确定密码" class="sale_input" type="password"></input><br>
				<button class="btn_sub" @click="subSaleMag()">注册</button>
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
        telePhoneNum:'',//发送验证码时的手机号；
        templateCode:'',
        saleman_password_new:'',//第一次的密码
        saleman_password:'',
        saleman_name:'',
        code:'',//手机号发送后获取的验证码
        saleman_tel:"",//提交注册时的手机号
        ismysend:true,
        ismygettel:false,
        downtimes:100,
        
      }
    },
    created(){
     
    },
    methods:{
			subtel(){
					// 获取手机验证码
					const that = this
					pub._CheckPhone(that.telePhoneNum)
					var subtelParam = {
					that: that,
					_url: pub._url,
					ur: pub._DetailApi.api_tel_param,
					data: {
            telePhoneNum: that.telePhoneNum,
            templateCode:"SMS_153325741"
					},
					cbk: that.subtelRes
					}
					pub._InitAjax(subtelParam);
			},
			subtelRes(res){
					const that=this
					// console.log(res.code)
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
			subSaleMag(){
        // 提交销售员的注册信息
        const that=this;
        var  saleman_id=that.$route.query.binding_saleman_id
        if(!that.saleman_name){
            this.$message({
            message: '提交信息不能为空',
            type: 'error',
            center: true
          });
          return;
        }
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
            return
        }
        var subSaleMagparam={
          that:that,
          _url:pub._url,
          ur:pub._DetailApi.api_AddSaleman,
          data:{
            saleman_tel:that.telePhoneNum,
            code:that.code,
            saleman_name:that.saleman_name,
            saleman_password:md5(that.saleman_password),
            binding_saleman_id:saleman_id
          },
          cbk:that.subSaleMagfun
        }  
        console.log(subSaleMagparam)
        pub._InitAjax(subSaleMagparam)
      },
      subSaleMagfun(res){
        const that=this
        if(res.stateCode=='200'){
          // alert('注册成功')
          this.$message({
            message: '注册成功',
            type: 'success',
            center: true
          });
          that.saleman_name='',
          that.saleman_password='',
          that.saleman_password_new='',
          that.telePhoneNum="",
          that.code='',
          this.$router.push("/")
        }else{
          // alert('注册失败')
        this.$message({
          message: '注册失败',
          type: 'error',
          center: true
        });
          that.saleman_name='',
          that.saleman_password='',
          that.saleman_password_new='',
          that.telePhoneNum="",
          that.code=''
        }
      }

    }
  }
  </script>
  <style scoped>
    .myheader{
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #ddd;
    }
    .myleft{
        position: fixed;
        padding:0.1rem;
        color: #333;
        font-size: 0.28rem;
		    margin-left: 0.1rem;
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
	