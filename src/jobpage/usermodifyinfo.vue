<template>
  <div id="app_modify">
      <router-link to="/Workbenck">
        <i class="el-icon-arrow-left myleft"></i> 
      </router-link>
      <header class="myheader">
          <p class="title">信息修改</p>
      </header>
      <body>
        <ul class="box_list">
          <li>
            <router-link to='/Basicdata'>
              <img src="../../public/img/userbaseinfo.png" alt="基本资料">
              <span>基本资料</span>
            </router-link>
          </li>
          <li>
            <router-link to='/ChangeTel'>
              <img src="../../public/img/phone.png" alt="手机绑定">
              <span>手机绑定</span>
            </router-link>
          </li>
          <li>
            <router-link to='/Reset'>
              <img src="../../public/img/pawd.png" alt="修改密码">
              <span>重置密码</span>
            </router-link>
          </li>
        </ul>
      </body>
      <footer class="footer" @click="loginout()">
          <img src="../../public/img/loginout.png" alt="" class="loginout">
          <span>退出登陆</span>
      </footer>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      loginout(){
        this.$router.push('/')
        localStorage.clear()
      }
    }
  }
</script>
<style>
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
.box_list img{
  vertical-align: middle;
  margin:0.1rem 0.18rem 0.1rem 0.18rem;
  width: 0.32rem;
  height: 0.32rem;
}
.box_list li{
  border-bottom: 1px solid #ddd;
}
.box_list li span{
  font-size: 0.19rem;
  color: #666;
}
.loginout{
  vertical-align: middle;
  width: 0.32rem;
  height: 0.32rem;
}
#app_modify footer{
  text-align: center;
  margin-top: 2.5rem;
}
#app_modify footer span{
  font-size: 0.2rem;
  color: #999;
  margin-top: 0.1rem;
}
</style>