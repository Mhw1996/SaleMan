<template>
  <div id="app_changePhone">
      <router-link to="/UsermodifyInfo">
        <i class="el-icon-arrow-left myleft"></i> 
      </router-link>
      <header class="myheader">
          <p class="title">更换手机号</p>
      </header>
        
  </div>
</template>
  <script>
    export default{
      data(){
        return{
  
        }
      },
      methods:{
     
      }
    }
  </script>
  <style>
 #app_changePhone .myleft{
      position: fixed;
      font-size:0.28rem;
      padding:0.1rem;
      color: #333;
      }
 #app_changePhone .title{
      text-align: center;
      }
 #app_changePhone .myheader{
      border-bottom: 1px solid #ddd;
      }
  
  </style>