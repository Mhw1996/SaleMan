<template>
    <div id="app_TcDetails">
      <div class="mytou">
          <router-link to="/SaleTc">
            <i class="el-icon-arrow-left mylefts"></i> 
          </router-link>
          <span class="title myheaders">提成详情</span>
      </div>
        <body>
          <br><br> 
          <ul class="box" v-for="item of TcDetailsList">
            <li class="box-item">
              <p class="timedata">单号：{{item.order_id}}</p>
            </li>
            <li class="line"></li>
            <li class="spc_font">
              <p style="font-size: 0.18rem !important;">订单金额：{{item.order_money}}</p>
              <p>提成金额/元：{{item.order_commission_money}}</p>
              <p>提成参数：{{item.commission_value}}</p>
              <p>提成级别：{{item.commission_level_name}}</p>
            </li>
          </ul>
        </body>
        <br><br><br>
        <footer class="myfootermore">
          <div class="page"></div>
          <div class="getmore" @click="ListTcDetails()">加载更多...</div> 
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
          pageSize:3,
          TcDetailsList:[]
        }
      },
       created(){
        this.ListTcDetails()
      },
    methods:{
      ListTcDetails(){
          const that=this
          var commission_id=that.$route.query.comissionid
          const pageNum=that.pageNum++
          var ListTcDetailsparam={
            that:that,
            _url:pub._url,
            ur:pub._DetailApi.api_ListTcDetails,
            data:{
              pageNum:pageNum,
              pageSize:that.pageSize,
              commission_id:commission_id
            },
            cbk:that.ListTcDetailsCbk
          }
          pub._InitAjax(ListTcDetailsparam);
        },
        ListTcDetailsCbk(res){
          const that=this

          console.log(res)
          if(res.code=='0'){
            var rowsList=that.TcDetailsList.concat(res.page.list)
            that.TcDetailsList=rowsList;
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
    #app_TcDetails .mylefts{
      color: #333;
      font-size: 0.28rem;
      margin-left: 0.1rem;
      position: fixed;
      line-height: 0.5rem;
      top: 0px;
      z-index: 999;
    }
    #app_TcDetails .line{
      width:100%;
      border-bottom: 1px solid #f0f0f0;
    }
    #app_TcDetails .box{
      padding:0.05rem 0.16rem;
      background-color: #fff;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
      margin:0.16rem;
      border-radius: 0.05rem;
    }
   #app_TcDetails .box li p{
      display:  flex;
      color: #666;
      font-size: 0.16rem;
    }
   #app_TcDetails .box-item{
      display: flex;
      justify-content: space-between;
      line-height: 2.4;
      margin-bottom: 0.06rem;
    }
    #app_TcDetails .timedata{
      font-size: 0.16rem !important;
    }
   #app_TcDetails .spc_font p{
      font-size: 0.12rem !important;
      color: #999;
      padding: 0.1rem 0 0.06rem 0;
    }
    #app_TcDetails .page{
      border: 0.06rem solid #eee;
    }
    #app_TcDetails .getmore{
      width: 100%;
      text-align: center;
      padding: 0.14rem;
      font-size: 0.16rem;
    }
    #app_TcDetails .myheaders{
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      border-bottom: 1px solid #ddd;
      background: #fff;
    }
   #app_TcDetails .myfootermore{
     position: fixed;
     bottom: 0px;
     width: 100%;
     background: #fff;
   }
  </style>