<template>
  <div id="app_SalemanInfo">
    <div class="mytou">
      <router-link to='/Workbenck'>
        <i class="el-icon-arrow-left myleft"></i> 
      </router-link>
      <header class="myheader">
          <p  class="title">二维码</p> 
      </header>
    </div>
    <div class="code">
      <div class="canvasBox">
        <canvas id="Salecanvas"  class="mycanvas"  :class="{Salecanvas:isSale}"></canvas>
        <canvas id="canvas" class="myusercanvas" :class="{userCanvas:isuser}"></canvas>
      </div> 
      <div class="btn">
        <button @click="SaleEwmFun()" :class="{Salecolor:Saleiscolor}">销售员二维码</button>
        <button class="userEwm" @click="UserEwmFun()" :class="{UserColor:userisColor}">用户二维码</button>
      </div>
    </div>
  </div>
  </div>
</template>
 
<script>
  import pub from '.././myaxios.js'
  import $ from "jquery"
  import QRCode from "qrcode";
  export default{
    data(){
      return{
        saleman_id:localStorage.getItem('id'),
        isuser:true,
        isSale:false,
        Saleiscolor:true,
        userisColor:false
      }
    },
    methods:{
      useqrcode() {
        var userCode_url='http://teashop.yanxukj.com/modelApp/login.html?binding_saleman_id='+this.saleman_id;
        var canvas = document.getElementById("canvas");
        QRCode.toCanvas(canvas,userCode_url, function(error) {
          if (error) console.error(error);
          console.log("二维码生成成功!");
        });
      },
      Saleqrcode() {
        var  SaleCode_url='http://teashop.yanxukj.com/#/SalemanSigin?binding_saleman_id='+this.saleman_id
        console.log(SaleCode_url)
        var canvas = document.getElementById("Salecanvas");
        QRCode.toCanvas(canvas,SaleCode_url, function(error) {
          if (error) console.error(error);
          console.log("二维码生成成功!");
        });
      },
      SaleEwmFun(){
        this.Saleiscolor=true,
        this.isSale=false,
        this.isuser=true,
        this.userisColor=false
      },
      UserEwmFun(){
        this.userisColor=true,
        this.Saleiscolor=false
        this.isSale=true
        this.isuser=false
      },
    },
    created(){
    },
    mounted() {
      this.useqrcode();
      this.Saleqrcode()             
    },
  }
</script>
<style scoped>
  .code{
    width:100%;
    text-align: center;
    margin:0.56rem auto; 
  }
  .canvasBox{
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
  }
  .mycanvas{
    border: 0.01rem solid #a7e90c;
    width: 100% !important;
    height: 100% !important;
  }
  .myusercanvas{
    border: 0.01rem solid #ffd900;
    width: 100% !important;
    height: 100% !important;    
  }
  .userCanvas{
    display: none;
  }
  .Salecanvas{
    display: none;
  }
  .Salecolor{
    color: #a7e90c !important    
  }
  .UserColor{
    color: #ffd900 !important    
  }
  .btn{
    margin-top:0.5rem;
  }
  .btn button{
    padding: 0.06rem;
    width: 1.3rem;
    background: #82980f no-repeat;
    border: 0px;
    border-radius: 0.2rem;
    color: #fff;
    margin-right: 0.04rem;
  }
  .userEwm{
    margin-left:0.04rem 
  }
</style>