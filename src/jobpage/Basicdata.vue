<template>
  <div id="app_Basicdata">
      <router-link to="/UsermodifyInfo">
        <i class="el-icon-arrow-left myleft"></i> 
      </router-link>
      <header class="myheader">
          <p class="title">基本资料</p>
      </header>
      <body class="box">
        <div class="work_header">
            <!-- <img src="../../public/img/boy.png" alt="头像" class="boy_imgs"> -->
            <div class="imgbig">
              <img src="../../public/img/boy.png" alt="头像" class="boy_imgs" v-if="!imgUrls">
              <img :src="imgUrls" alt="头像" class="boy_imgs" v-else>
            </div>
          <p><label for="file">选择图片</label></p>
        </div> 
        <form action="" method="post" id="imgForm" enctype="multipart/form-data">
          <input hidden type="file" multiple id="file" name="file" @change="upImg()">
          <input hidden type="text" id="url" name="filedir" value="img/czy" />
        </form>
        <input type="text" placeholder="销售员名称" class="inputTextName" v-model='saleman_name'>
        <button class="btn_sub  small" @click="SubBasic()">保存</button>
      </body>
  </div>
  </template>
  <script>
  import pub from '.././myaxios.js'
  import $ from "jquery"
  export default{
    data(){
      return{
        imgUrls:'',
        saleman_id:localStorage.getItem('id'),
        saleman_name:''
      } 
    },
    methods:{
      upImg(){
        const that=this
        var imgForm = $("#imgForm");
        var formData = new FormData(imgForm[0])
        $.ajax({
          url: pub._url+pub._DetailApi.api_upImg,
          type: "POST",
          dataType: "json",
          data: formData,
          headers: {
            token: localStorage.getItem('tk'),
          },
          contentType: false,
          processData: false,
          success: function (res) {
            console.log(res)
            if(res.stateCode=='200'){
              that.imgUrls=res.data.imgUrl
            }else{
              this.$message({
              message: '上传图片错误',
              type: 'error',
              center: true
          });
            }
          }
        })
      },
      SubBasic(){
        const that=this
        var subSaleInfoNameParams={
          that: that,
					_url: pub._url,
          ur: pub._DetailApi.api_updateSalemanInfo,
          data:{
            saleman_img:that.imgUrls,
            saleman_id:that.saleman_id,
            saleman_name:that.saleman_name
          },
          cbk:that.getInfoNameCbk
        }
        pub._InitAjax(subSaleInfoNameParams)
      },
      getInfoNameCbk(res){
        const that=this
        // console.log(res)
        if(res.stateCode=='200'){
          this.$message({
            message: '修改成功',
            type: 'success',
            center: true
          });
        }else{
          this.$message({
            message: '修改信息失败！！！',
            type: 'error',
            center: true
          });
        }
      },
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
        }else{
          this.$message({
            message: '修改信息失败！！！',
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
  #app_Basicdata .work_header{
    width: 100%;
    height:1.8rem;
    background: #82980f;    
    text-align: center;
    color: #ddd;
    overflow: hidden;
  }
 #app_Basicdata .myleft{
    position: fixed;
    font-size:0.28rem;
    padding:0.1rem;
    color: #fff;
  }
 #app_Basicdata .title{
    text-align: center;
    color: #fff;
  }
 #app_Basicdata .myheader{
    background-color: #82980f;
  }
  #app_Basicdata .myheader{
    border:none !important;
  }
  #app_Basicdata .box{
    padding:0 !important;
  }
  #app_Basicdata .imgbig{
    width: 1rem;
    height: 1rem;  
    border-radius: 50%;
    margin: 0.3rem auto 0.1rem ;
    
  }
  #app_Basicdata .boy_imgs{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;    
    border: 0.03rem solid #b8cb63;
    
  }
  #app_Basicdata .small{
    width: 2.5rem;
  }
  </style>