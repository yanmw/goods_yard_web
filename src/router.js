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
 //    {
 //      path: '/home',
 //      component: () => import('./views/home.vue')
 //    },
	// {
	//   path: "todayDynamic",
	//   component: () => import("./views/noticeBoard/todayDynamic.vue")
	// },
	// {
	//   path: '/about',
	//   component: () => import('./views/About.vue')
	// },
	{
	  path: '/',
	  name:'首页',
	  component: () => import('./views/home.vue'),
	  redirect: "/bulletins/work",
	  children: [
		  {
		    path: "/business/today",
		    component: () => import("./views/business/todayDynamic.vue")
		  },
		  // {
	   //      path: "/bulletins/work",
	   //      component: () => import("./views/order/preSettlement.vue")
	   //    },
	   //业务部
		  {
		    path: "/business/observer/inform", //查看公告
		    component: () => import("./views/business/checkNotice.vue")
		  },
		  {
		    path: "/business/creator/inform",  //发布公告
		    component: () => import("./views/business/issueNotice.vue")
		  },
		  {
		    path: "/business/creator/work",  //发布作业计划
		    component: () => import("./views/business/planningQing.vue")
		  },
		  {
		    path: "/business/observer/work",  //历史计划
		    component: () => import("./views/business/historyQing.vue")
		  },
		  {
		    path: "/business/creator/instr",  //发布业务指令
		    component: () => import("./views/business/directiveBusiness.vue")
		  },
		  {
		    path: "/business/observer/instr", //接收业务指令
		    component: () => import("./views/business/receiveDirectiveBusiness.vue")
		  },
		  {
		    path: "/business/company", //发货公司
		    component: () => import("./views/business/shipments.vue")
		  },
		  {
		    path: "/business/contract", //合同添加
		    component: () => import("./views/business/contract.vue")
		  },
		  {
		    path: "/business/user", //部门人员
		    component: () => import("./views/business/user.vue")
		  },
		  {
		    path: "/business/performance", //绩效管理
		    component: () => import("./views/business/performance.vue")
		  },
		  {
		    path: "/business/apply", //我的申请
		    component: () => import("./views/business/apply.vue")
		  },
		  {
		    path: "/business/approval", //我的审批
		    component: () => import("./views/business/approval.vue")
		  },
		  {
		    path: "/business/report", //工作报告
		    component: () => import("./views/business/report.vue")
		  },
		  {
		    path: "/business/report/statistics", //报告统计
		    component: () => import("./views/business/statistics.vue")
		  },
		  //综合部
		  {
		    path: "/system/user", //员工管理
		    component: () => import("./views/system/user.vue")
		  },
		  {
		    path: "/sys/video", //发布视频
		    component: () => import("./views/system/issueVideo.vue")
		  },
		  {
		    path: "/system/dept", //组织架构
		    component: () => import("./views/system/organization.vue")
		  },
		  {
		    path: "/system/role", //岗位权限
		    component: () => import("./views/system/role.vue")
		  },
		  {
		    path: "/sys/observer/inform", //查看公告
		    component: () => import("./views/business/checkNotice.vue")
		  },
		  {
		    path: "/sys/creator/inform",  //发布公告
		    component: () => import("./views/business/issueNotice.vue")
		  },
		  {
		    path: "/sys/creator/instr",  //发布业务指令
		    component: () => import("./views/business/directiveBusiness.vue")
		  },
		  {
		    path: "/sys/observer/instr", //接收业务指令
		    component: () => import("./views/business/receiveDirectiveBusiness.vue")
		  },
		  {
		    path: "/sys/user", //部门人员
		    component: () => import("./views/business/user.vue")
		  },
		  {
		    path: "/sys/performance", //绩效管理
		    component: () => import("./views/business/performance.vue")
		  },
		  {
		    path: "/sys/apply", //我的申请
		    component: () => import("./views/business/apply.vue")
		  },
		  {
		    path: "/sys/approval", //我的审批
		    component: () => import("./views/business/approval.vue")
		  },
		  {
		    path: "/sys/report", //工作报告
		    component: () => import("./views/business/report.vue")
		  },
		  {
		    path: "/sys/statistics", //报告统计
		    component: () => import("./views/business/statistics.vue")
		  },
		  
		  
		  {
		    path: "/bulletins/work",
		    component: () => import("./views/noticeBoard/todayDynamic.vue")
		  },
		  {
		    path: "/dispatch/observer/inform",
		    component: () => import("./views/dispatching/checkNotice.vue")
		  },
		  {
		    path: "/dispatch/creator/inform",
		    component: () => import("./views/dispatching/issueNotice.vue")
		  },
		  {
		    path: "/dispatch/creator/instr",
		    component: () => import("./views/dispatching/directiveBusiness.vue")
		  },
		  {
		    path: "/dispatch/observer/instr",
		    component: () => import("./views/dispatching/receiveDirectiveBusiness.vue")
		  },
	  ]
	}
  ]
})
