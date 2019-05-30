<template>
    <div id="app_login">
       <header class="myheader">
         <p class="title">销售员登录</p>
       </header>
       <body class="box">
          <input v-model="saleman_tel" placeholder="请输入手机号" class="sale_input"></input><br>
          <input v-model="saleman_password" placeholder="密码" class="sale_input" type="password" minlength="6"></input> 
          <button class="btn_sub" @click="subSaleLogin()">登录</button>
          <div class="login_footer">
            <div  @click="remPaw()">
             <el-checkbox label="记住密码" name="type" class="a_style"  :checked='Mychecks' :disabled="mydisd"> </el-checkbox>
            </div>
            <div class="link_a">
              <router-link to="/SalemanSigin" class="a_style">免费注册</router-link>|
              <router-link to="/ForgetPaw" class="a_style">忘记密码？</router-link>
            </div>
         </div>
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
        saleman_password:'',
        Mychecks:false,
        mydisd:true
      }
    },
    methods:{
      remPaw(){
        if(!this.saleman_tel||!this.saleman_password){
            this.$message({
            message: '无法记住密码',
            type: 'error',
            center: true
          });
        this.Mychecks=false
        }else{
          localStorage.setItem('tel',this.saleman_tel)
          localStorage.setItem('paw',md5(this.saleman_password))
          this.mydisd=false
        }
        
      },
      showrem(){
        if(localStorage.getItem('paw')){
          this.saleman_tel=localStorage.getItem('tel')
          this.saleman_password=localStorage.getItem('paw')
          this.Mychecks=true
          this.mydisd=false
        }else{
          this.saleman_password='',
          this.saleman_tel=''
        }
      },
      subSaleLogin(){
        const that=this
        //  debugger
        // pub._CheckPhone(that.saleman_tel)
        var phone = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (!phone.test(that.saleman_tel)) {
          this.$message({
          message: '手机号格式错误',
          type: 'error',
          center: true
        });
          return; 
        }
        if(localStorage.getItem('paw')){
          that.saleman_password=localStorage.getItem('paw')
        }else{
          that.saleman_password=md5(that.saleman_password)
        }
        var subloginParam={
          that:that,
          _url:pub._url,
          ur:pub._DetailApi.api_SalemanLogin,
          data:{
            saleman_tel:that.saleman_tel,
            saleman_password:that.saleman_password
          },
          cbk:that.subLoginFun
        }
        pub._InitAjax(subloginParam);
      },
      subLoginFun(res){
        const that=this
        if(res.stateCode=='200'){
        this.$message({
          message: '登陆成功',
          type: 'success',
          center: true
        });
          this.$router.push("/Workbenck")
          that.saleman_password='',
          that.saleman_tel=''
          localStorage.setItem("tk",res.data.token)
          localStorage.setItem('id',res.data.saleman_id)
        }else{
          this.$message({
          message: '登陆失败',
          type: 'error',
          center: true
        });
         
        }
      }
    },
    created(){
      this.showrem()
    }
  }
  </script>
<style scoped>
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
 .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #82980f !important;
  }
.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #82980f !important;
    border-color: #82980f !important;
  }
  .Mycheck{
    margin-left: 0.1rem;
    color: #282828;
  }
  .link_a{
    margin-left: 0.26rem
  }
  </style>