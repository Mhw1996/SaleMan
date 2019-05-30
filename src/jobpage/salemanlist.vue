<template>
  <div id="app_salemanList">
    <div class="mytou">
        <router-link to="/Workbenck">
          <i class="el-icon-arrow-left mylefts"></i> 
        </router-link>
        <span class="title myheaders">客户列表</span>
    </div>
      <body>
        <br><br> 
        <ul class="box" v-for="item of userList" :key=item.id>
          <li class="box-item">
            <p>客户名称：{{item.customer_name}}</p>
            <p>客户类型：{{item.customer_type_name}}</p>
          </li>
          <li class="line"></li>
          <li class="box-item spc_font">
            <p>客户状态：{{item.customer_type_name}}</p>
            <p>{{item.creat_time}}</p>
          </li>
        </ul>
      </body>
      <br><br><br>
      <footer class="myfootermore">
        <div class="page"></div>
        <div class="getmore" @click="getcusromerinfo()">加载更多...</div> 
      </footer>
  </div>
</template>
<script>
  import pub from '.././myaxios.js'
  import $ from "jquery"
  export default{
    data(){
      return{
        pageNum:1,
        pageSize:5,
        binding_saleman_id:localStorage.getItem('id'),
        userList:[]
      }
    },
     created(){
      this.getcusromerinfo()
    },
  methods:{
      getcusromerinfo(){
        const that=this
        const pageNum=that.pageNum++
        var cusromerinfoparam={
          that:that,
          _url:pub._url,
          ur:pub._DetailApi.api_SaleList,
          data:{
            pageNum:pageNum,
            pageSize:that.pageSize,
            binding_saleman_id:that.binding_saleman_id
          },
          cbk:that.getCusromerInfoCbk
        }
        pub._InitAjax(cusromerinfoparam);
      },
      getCusromerInfoCbk(res){
        const that=this
        if(res.code=='0'){
          var rowsList=that.userList.concat(res.page.list)
          that.userList=rowsList;
        }else{
          this.$message({
          message: '信息加载失败....',
          type: 'error',
          center: true
        });
        }
        if(res.page.list.length==0){
          this.$message({
          message: '没有更多信息....',
          center: true
        });
        }
      },
      
    }
   
  }
</script>
<style>
  #app_salemanList .mylefts{
    color: #333;
    font-size: 0.28rem;
    margin-left: 0.1rem;
    position: fixed;
    line-height: 0.5rem;
    top: 0px;
    z-index: 999;
  }
  #app_salemanList .line{
    width:100%;
    border-bottom: 1px solid #f0f0f0;
  }
  #app_salemanList .box{
    
    padding:0.05rem 0.16rem;
    background-color: #fff;
    box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.2);
    margin:0.16rem;
    border-radius: 0.05rem;
  }
 #app_salemanList .box li p{
    display:  flex;
    color: #666;
    font-size: 0.16rem;
  
  }
 #app_salemanList .box-item{
    display: flex;
    justify-content: space-between;
    line-height: 2.4;
    margin-bottom: 0.06rem;
  }
 #app_salemanList .spc_font p{
    font-size: 0.12rem !important;color: #999;
  }
  #app_salemanList .page{
    border: 0.06rem solid #eee;
  }
  #app_salemanList .getmore{
    width: 100%;
    text-align: center;
    padding: 0.14rem;
    font-size: 0.16rem;
  }
  #app_salemanList .myheaders{
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0px;
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
 .myfootermore{
   position: fixed;
   bottom: 0px;
   width: 100%;
   background: #fff;
 }
</style>