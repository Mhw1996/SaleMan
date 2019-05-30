import $ from "jquery"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const pub={
    // _url:"http://teashop.yanxukj.com:8083/popularize", 
    _url:'http://192.168.1.123/popularize',//本地服务；
    _DetailApi:{
      api_tel_param:'/api/sendSms',//销售员提交手机号获取验证码
      api_AddSaleman:'/saleman/save_saleman_info', //销售员注册
      api_SalemanLogin:'/saleman/saleman_login',//销售员登陆
      api_SaleList:'/p_customer/get_customer_info',//客户列表信息
      api_SaleTc:'/commission/get_commission_info',//销售提成列表信息
      api_ListTcDetails:'/commission/get_commission_detail',//列表提成单详情
      api_SaleManInfo:'/saleman/find_saleman_info', //销售员基本信息详情；
      api_forgetPwd:'/saleman/editBySalemanTel',//忘记密码；
      api_originalPwd:'/saleman/checkOriginalPassword',//找到原始密码;
      api_updateSalemanInfo:'/saleman/update_saleman_info',//修改密码；
      api_upImg:'/api/imgUploadPost',//上传销售员头像；
      
    }, 
  /**
   * @param {*} that this指向
   * @param {*} _url 公共接口地址
   * @param {*} ur 具体接口地址
   * @param {*} data 形参
   * @param {*} cbk 回调
   */
  _InitAjax: function (op) {
    $.ajax({
      type: "POST",
      headers: {
        token: localStorage.getItem('tk'),
      },
      contentType: "application/json",
      url: op._url + op.ur,
      data: JSON.stringify(op.data),
      error: function (request) {
        console.log(request, "ajax请求失败");
      },
      success: function (res) {
        // console.log(res)
        if (res.stateCode == '400' || res.code == '401' ) {
          window.location.href='/'
          // console.log('token 失效！！！')
          alert('token失效！！！')
        } else{
          op.cbk(res);
        }
      },
      fail: function (r) {
        console.log("Ajax的fail函数，", r);
      }
    });
  },
  //手机号的验证
  /**
   * @param {*} tgt 输入框绑定的值
   */
  _CheckPhone(tgt) {
    var phone = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phone.test(tgt)) {
      alert("手机号格式错误")
      tgt = "";
      return
    }
  },
// 验证用户输入不能为空
/**
 * @param val 输入框中的值
 */
  _checkVal(val){
    if(!val){
      alert("输入的值不能空着")
      return;
    }
  }

}
export default pub  