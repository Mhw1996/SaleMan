<template>
  <div id="app_work">
    <header class="work_header">
      <router-link to='/UsermodifyInfo'>
        <img src="../../public/img/set.png" alt="setting" class="setting">
      </router-link>
      <div class="box_img">
        <img src="../../public/img/boy.png" alt="头像" class="boy_img" v-if="!imgUrls">
        <img :src="imgUrls" alt="头像" class="boy_img" v-else>
        <p class="username" v-if="!SaleName">who are you?</p>
        <p class="username" v-else>{{SaleName}}</p>
      </div>
      <router-link to="/ChangeEwm">
      <img src="../../public/img/ewm.png" alt="二维码" class="ewm">
      </router-link>
    </header>
    <body>
      <ul class="myicon">
        <li>
          <router-link to='/SaleTc'>
            <img src="../../public/img/money.png" alt="" class="img_icon">
            <p>销售提成</p>
        </router-link>
      </li>
        <li>
          <router-link to='/SalemanList'>
            <img src="../../public/img/uselist.png" alt="" class="img_icon">
          <p>用户列表</p>
        </router-link>
      </li>
        <li>
          <router-link to='/SalemanInfo'>
            <img src="../../public/img/usepro.png" alt="" class="img_icon1">
            <p>销售员信息</p>
        </router-link>
      </li>
      </ul>
    </body>
  </div>
</template>

<script>
  import pub from '.././myaxios.js'
  import $ from "jquery"
  export default{
    data(){
      return{
        saleman_id:localStorage.getItem('id'),
        imgUrls:'',
        SaleName:''
      }
    },
    methods:{
      findSaleMan_info(){
        const that=this
        var saleinfoParams={
          that: that,
					_url: pub._url,
          ur: pub._DetailApi.api_SaleManInfo,
          data:{
            saleman_id:that.saleman_id,       
          },
          cbk:that.getInfoOneCbk
        }
        pub._InitAjax(saleinfoParams)
      },
      getInfoOneCbk(res){
        const that=this
        // console.log(res)
        if(res.stateCode=='200'){
          that.imgUrls=res.data[0].saleman_img
          that.SaleName=res.data[0].saleman_name
        }else{
          this.$message({
            message: '获取信息失败！！！',
            type: 'error',
            center: true
          });
        }
      }
    },
    created(){
      this.findSaleMan_info()
    }
  }
</script>
<style>
 #app_work .work_header{
    width: 100%;
    height:1.8rem;
    background: #82980f;    
    position: relative;
  }
 #app_work .box_img{
    text-align: center;
  }
  .boy_img{
    border: 0.03rem solid #b8cb63;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-top: 0.4rem;
  }
  .ewm{
    width: 0.4rem;
    height: 0.4rem;
    margin: -1rem 0.7rem 0rem 0rem ;
    float: right;
    border: 1px solid rgb(189, 189, 189);
  }
  .setting{
    position: absolute;
    right: 0.2rem;
    top: 0.1rem;
    width:0.3rem;
    height: 0.3rem;
  }
  .myicon{
    display: flex;
    justify-content: space-around;
    align-items:center;
    margin-top: 0.5rem;
    
  }
  .img_icon{
    margin-left: 0.14rem;
    width: 0.32rem;
    height: 0.32rem;
  }
  .img_icon1{
    margin-left: 0.26rem;
    width: 0.32rem;
    height: 0.32rem;
  }
  .username{
    color: #fff;
    padding-top:0.1rem
  }
  .myicon p{
    padding-top: 0.1rem;
    color: #999;
    font-size: 0.16rem;
  }
</style>