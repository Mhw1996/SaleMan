import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/login.vue'
import SalemanSigin from './components/salemansigin.vue'
import reset from './components/resetpawd.vue'
import ChangeTel from './components/changetel.vue'
import ForgetPaw from './components/forgetpaw.vue'
import Workbenck from './jobpage/workbenck.vue'
import UsermodifyInfo from './jobpage/usermodifyinfo.vue'
import SalemanList from './jobpage/salemanlist.vue'
import SaleTc from './jobpage/saleTc.vue'
import TcDetails from './jobpage/Tcdetails.vue'
import ChangeEwm from './jobpage/changeEwm.vue'
import SalemanInfo from './jobpage/salemanInfo.vue'
import Basicdata from './jobpage/Basicdata.vue'
// import ChangePhone from './jobpage/ChangePhone.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/', name: 'home',component: Home},
    {path:'/',component:Login},
    {path: '/about',name: 'about',component: () => import('./views/About.vue')},
    {path:'/SalemanSigin',component:SalemanSigin},
    {path:'/Reset',component:reset},
    {path:'/ChangeTel',component:ChangeTel},
    {path:'/ForgetPaw',component:ForgetPaw},
    {path:'/Workbenck',component:Workbenck},
    {path:'/UsermodifyInfo',component:UsermodifyInfo},
    {path:'/SalemanList',component:SalemanList},
    {path:'/SaleTc',component:SaleTc},
    {path:'/TcDetails',component:TcDetails},
    {path:'/ChangeEwm',component:ChangeEwm},
    {path:'/SalemanInfo',component:SalemanInfo},
    {path:'/Basicdata',component:Basicdata},
    // {path:'/ChangePhone',component:ChangePhone}
  ]
})
