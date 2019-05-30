<template>
    <div id="app_SalemanInfo">
      <div class="mytou">
          <router-link to='/Workbenck'>
            <i class="el-icon-arrow-left myleft"></i> 
          </router-link>
        <header class="myheader">
              <p  class="title">销售员信息</p> 
        </header>
      </div>
    <body class="infoBox" v-for="item of SaleManList">
      <p class="saleName">销售员：{{item.saleman_name}}</p>
      <div class="line"></div>
      <p class="team">所属团队：{{!item.team_name?"无":item.team_name}}</p>
      <p>个人状态：{{!item.saleman_status_name?"无":item.saleman_status_name}}</p>
      <p>个人类型：{{!item.saleman_type_nam?"无":item.saleman_type_nam}}</p>
      <p>个人等级：{{!item.saleman_level_name?"无":item.saleman_level_name}}</p>
      <p>联系电话：{{!item.saleman_tel?"无":item.saleman_tel}}</p>
      <p>邮箱：{{!item.saleman_email?"无":item.saleman_email}}</p>
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
        SaleManList:[]
      }  
    },
    methods:{
      getSaleManInfo(){
        const that=this
        var salemanParam={
          that:that,
          _url:pub._url,
          ur:pub._DetailApi.api_SaleManInfo,
          data:{
            saleman_id:that.saleman_id
          },
          cbk:that.getSaleManInfocbk
        }
        pub._InitAjax(salemanParam);
      },
      getSaleManInfocbk(res){
        // console.log(res)
        const that=this
        if(res.stateCode=='200'){
           that.SaleManList=res.data
        }else{
          this.$message({
            message: '信息加载失败....',
            type: 'error',
            center: true
          });
        }
      }
    },
    created(){
      this.getSaleManInfo()
    }
  }
</script>
<style>
#app_SalemanInfo  .myheader{
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  }
#app_SalemanInfo  .myleft{
  position: fixed;
  padding:0.1rem;
  color: #333;
  font-size: 0.28rem;
  margin-left: 0.1rem;
  }
#app_SalemanInfo .infoBox{
  padding:0.05rem 0.16rem;
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  margin:0.8rem 0.16rem;
  border-radius: 0.05rem
}
#app_SalemanInfo .saleName{
  padding: 0.1rem !important;
  color: #282828 !important;
  font-size: 0.2rem !important;
  font-weight: 600
}
#app_SalemanInfo .line{
  width:100%;
  border-bottom: 1px solid #f0f0f0;
}
#app_SalemanInfo .team{
  font-size: 0.18rem !important;
  padding: 0.1rem;
  color:#333333 !important;
}
#app_SalemanInfo .infoBox p{
  padding:0.14rem 0 0 0.14rem;
  color: #777777;
  font-size: 0.16rem;
}
</style>