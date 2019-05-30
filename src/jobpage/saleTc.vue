<template>
    <div id="app_saleTc">
      <div class="mytou">
          <router-link to="/Workbenck">
            <i class="el-icon-arrow-left mylefts"></i> 
          </router-link>
          <span class="title myheaders">销售提成</span>
      </div>
        <body>
          <br><br> 
          <ul class="box" v-for="item of userList" :key='item.id'>
            <li class="box-item">
              <p class="timedata">{{item.commission_date}}</p>
              <p style="padding-top:0.02rem" @click="jumpTcDetails" :data-comissionId="item.commission_id">提成详情</p>
            </li>
            <li class="line"></li>
            <li class="spc_font">
              <p>订单数量：{{item.order_count}}</p>
              <p>提成金额/元：{{item.commission_money}}</p>
            </li>
          </ul>
        </body>
        <br><br><br>
        <footer class="myfootermore">
          <div class="page"></div>
          <div class="getmore" @click="getcusromerinfoIc()">加载更多...</div> 
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
          saleman_id:localStorage.getItem('id'),
          userList:[]
        }
      },
       created(){
        this.getcusromerinfoIc()
      },
    methods:{
      getcusromerinfoIc(){
          const that=this
          const pageNum=that.pageNum++
          var cusromerinfoparam={
            that:that,
            _url:pub._url,
            ur:pub._DetailApi.api_SaleTc,
            data:{
              pageNum:pageNum,
              pageSize:that.pageSize,
              saleman_id:that.saleman_id
            },
            cbk:that.getCusromerInfoCbk
          }
          pub._InitAjax(cusromerinfoparam);
        },
        getCusromerInfoCbk(res){
          const that=this
          // console.log(res)
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
        jumpTcDetails(e){
          // console.log(e.target.dataset.comissionid)
          const comissionid=e.target.dataset.comissionid
          this.$router.push('/TcDetails?comissionid='+comissionid)
        }
      }
     
    }
  </script>
  <style>
    #app_saleTc .mylefts{
      color: #333;
      font-size: 0.28rem;
      margin-left: 0.1rem;
      position: fixed;
      line-height: 0.5rem;
      top: 0px;
      z-index: 999;
    }
    #app_saleTc .line{
      width:100%;
      border-bottom: 1px solid #f0f0f0;
    }
    #app_saleTc .box{
      padding:0.05rem 0.16rem;
      background-color: #fff;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
      margin:0.16rem;
      border-radius: 0.05rem;
    }
   #app_saleTc .box li p{
      display:  flex;
      color: #666;
      font-size: 0.16rem;
    }
   #app_saleTc .box-item{
      display: flex;
      justify-content: space-between;
      line-height: 2.4;
      margin-bottom: 0.06rem;
    }
    #app_saleTc .timedata{
      font-size: 0.18rem !important;
    }
   #app_saleTc .spc_font p{
      font-size: 0.12rem !important;
      color: #999;
      padding: 0.1rem 0 0.06rem 0;
    }
    #app_saleTc .page{
      border: 0.06rem solid #eee;
    }
    #app_saleTc .getmore{
      width: 100%;
      text-align: center;
      padding: 0.14rem;
      font-size: 0.16rem;
    }
    #app_saleTc .myheaders{
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      border-bottom: 1px solid #ddd;
      background: #fff;
    }
   #app_saleTc .myfootermore{
     position: fixed;
     bottom: 0px;
     width: 100%;
     background: #fff;
   }
  </style>