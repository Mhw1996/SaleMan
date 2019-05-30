<template>
  <div id="app" cloak>
    <router-view/>
  </div>
</template>
<script>
import rem from './rem.js'
import md5 from 'js-md5'
export default{

  }
</script>
<style lang="scss">
*{
  padding: 0px;
  margin: 0px;
  font-family: "PingFang SC", "Lantinghei SC", "Microsoft YaHei", "HanHei SC", "Helvetica Neue", "Open Sans", Arial, "Hiragino Sans GB", 微软雅黑, STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif !important;
  font-size: 0.14rem;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
.title{
    text-align: center;
    font-size: 0.2rem;
    padding: 0.1rem
    }
.box{
    text-align: center;
    padding: 0.1rem;
}
input{
    width: 87%;
    margin-top: 0.12rem;
    border: 0px;
    border-bottom:1px solid rgb(222, 220, 220);
    padding: 10px;
    color: #282828;
}
input::-webkit-input-placeholder {color: #999 !important;}
input:-moz-placeholder {color: #999 !important;}
input::-moz-placeholder {color: #999 !important; }
input:-ms-input-placeholder {color: #999 !important; }
.btn_sub{
    width: 87%;
    background: #82980f;
    border: 0px;
    color: #fff;
    height: 0.35rem;
    font-size: 0.17rem;
    margin-top: 0.3rem;
    border-radius: 2px;
}
.a_style{
  color: #282828;
}
[v-cloak] {
      display: none !important;
    }
</style>
