import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
	{
	  path: "/login",
	  component: () => import("./views/login/login.vue")
	},
	{
	  path: "/loginUser",
	  component: () => import("./views/login/loginUser.vue")
	},
    {
      path: "/register",
      component: () => import("./views/login/register.vue")
    },
	{
	  path: "/retrievePassword",
	  component: () => import("./views/login/retrievePassword.vue")
	},
    {
      path: '/home',
      component: () => import('./views/home.vue')
    },
	// {
	//   path: '/about',
	//   component: () => import('./views/About.vue')
	// },
	{
	  path: '/personal',
	  component: () => import('./views/personal.vue'),
	  redirect: "/personal/personIndex",
	  children: [
		  {
		    path: "personIndex",
		    component: () => import("./views/personIndex.vue")
		  },
		  {
	        path: "preSettlement",
	        component: () => import("./views/order/preSettlement.vue")
	      },
		  {
		    path: "checkPending",
		    component: () => import("./views/order/checkPending.vue")
		  },
		  {
		    path: "actualSettlement",
		    component: () => import("./views/order/actualSettlement.vue")
		  },
		  {
		    path: "issue",
		    component: () => import("./views/goods/issue.vue")
		  },
		  {
		    path: "list",
		    component: () => import("./views/goods/list.vue")
		  },
		  {
		    path: "maintain",
		    component: () => import("./views/goods/maintain.vue")
		  },
		  {
		    path: "capitalList",
		    component: () => import("./views/finance/capitalList.vue")
		  },
		  {
		    path: "recharge",
		    component: () => import("./views/finance/recharge.vue")
		  },
		  {
		    path: "deal",
		    component: () => import("./views/finance/deal.vue")
		  },
		  {
		    path: "dealUser",
		    component: () => import("./views/finance/dealUser.vue")
		  },
		  {
		    path: "authentication",
		    component: () => import("./views/account/authentication.vue")
		  },
		  {
		    path: "phoneEdit",
		    component: () => import("./views/account/phoneEdit.vue")
		  },
		  {
		    path: "passwordEdit",
		    component: () => import("./views/account/passwordEdit.vue")
		  },
		  {
		    path: "accountBypass",
		    component: () => import("./views/account/accountBypass.vue")
		  },
		  {
		    path: "appointment",
		    component: () => import("./views/sellGoods/appointment.vue")
		  },
		  {
		    path: "offline",
		    component: () => import("./views/sellGoods/offline.vue")
		  },
		  {
		    path: "paymentCode",
		    component: () => import("./views/account/paymentCode.vue")
		  },
		  {
		    path: "waybill",
		    component: () => import("./views/buyGoods/waybill.vue")
		  },
		  {
		    path: "issueWaybill",
		    component: () => import("./views/buyGoods/issueWaybill.vue")
		  },
		  {
		    path: "preSettlementOrder",
		    component: () => import("./views/orderUser/preSettlementOrder.vue")
		  },
		  {
		    path: "checkPendingOrder",
		    component: () => import("./views/orderUser/checkPendingOrder.vue")
		  },
		  {
		    path: "actualSettlementOrder",
		    component: () => import("./views/orderUser/actualSettlementOrder.vue")
		  },
		  {
		    path: "issueBuy",
		    component: () => import("./views/intention/issueBuy.vue")
		  },
		  {
		    path: "listBuy",
		    component: () => import("./views/intention/listBuy.vue")
		  },
		  {
		    path: "maintainBuy",
		    component: () => import("./views/intention/maintainBuy.vue")
		  }
	  ]
	}
  ]
})
