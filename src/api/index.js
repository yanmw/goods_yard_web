import request from './axios'

function random(n) {
  if (n > 21) return null
  return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}
// 
// export function getToken() {
//   return request({
//     url: '/qiniu/upload/token', // 假地址 自行替换
//     method: 'get'
//   })
// }
// 短信验证码
export function registerCode_get(data) {
  return request({
    url: '/sendSMS/registerCode_get',
    method: 'post',
    data: data
  })
}
// 短信验证码---忘记密码
export function changePasswordCode(data) {
  return request({
    url: '/sendSMS/changePasswordCode',
    method: 'post',
    params: data
  })
}
// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}
// 文件上传
export function upload(data) {
  return request({
    url: '/sysFile/upload',
    method: 'post',
	params:data
  })
}
// 菜单栏
export function findMenuTree(data) {
  return request({
    url: '/menu/findNavTree',
    method: 'post',
	params:data
  })
}
// 退出
export function logout() {
  return request({
    url: '/account/Loginout',
    method: 'post',
  })
}

// 发布公告
// 查询发布公告
export function sysAnnouncementPage(data) {
  return request({
    url: '/sysAnnouncement/findPage',
    method: 'post',
    data: data
  })
}
// 删除公告
export function noticeDelete(id) {
  return request({
    url: '/sysAnnouncement/delete/' + id,
    method: 'get',
  })
}
// 查询所有部门
export function findDeptAndUser(token) {
  return request({
    url: '/dept/findDeptAndUser',
    method: 'get'
  })
}
// 发布公告 
export function sysAnnouncementSave(data) {
  return request({
    url: '/sysAnnouncement/save',
    method: 'post',
	data:data
  })
}

// 查看公告
// 获取公告类型
export function getAnnouncementType(token) {
  return request({
    url: '/sysAnnouncement/getAnnouncementType',
    method: 'get'
  })
}
// 查看公告列表
export function sysAnnouncementPageCheck(data) {
  return request({
    url: '/sysAnnouncementReceiver/findPage',
    method: 'post',
    data: data
  })
}
// 标记已读
export function readly(id) {
  return request({
    url: '/sysAnnouncementReceiver/read/' + id,
    method: 'get'
  })
}


// 指令管理
// 查询所有指令类型
export function findInstructionType(data) {
  return request({
    url: '/sysInstruction/findInstructionType',
    method: 'get'
  })
}
// 指令类表分页查询
export function sysInstructionPageCheck(data) {
  return request({
    url: '/sysInstruction/findPage',
    method: 'post',
    data: data
  })
}
// 单个指令详情
export function sysInstructionDetail(id) {
  return request({
    url: '/sysInstruction/detail/' + id,
    method: 'get'
  })
}
// 删除指令
export function sysInstructionDelete(id) {
  return request({
    url: '/sysInstruction/delete/' + id,
    method: 'get',
  })
}
// 发布指令
export function sysInstructionSave(data) {
  return request({
    url: '/sysInstruction/save',
    method: 'post',
    data: data
  })
}
// 查询阅读状态数量
export function sysInstructionFindCount(id) {
  return request({
    url: '/sysInstruction/findCount/' + id,
    method: 'get'
  })
}
// 指令接收人管理
// 查看接收指令列表
export function sysInstructionReceiverPageCheck(data) {
  return request({
    url: '/sysInstructionReceiver/findPage',
    method: 'post',
    data: data
  })
}
// 回执信息
export function sysInstructionReceiverReply(data) {
  return request({
    url: '/sysInstructionReceiver/reply',
    method: 'post',
    data: data
  })
}
// 查询阅读状态数量
export function sysInstructionReceiverFindCount(id) {
  return request({
    url: '/sysInstructionReceiver/findCount/' + id,
    method: 'get'
  })
}

// 历史计划
// 历史计划请求、承认车分页查询
export function businessWorkPlanReqRespCar(data) {
  return request({
    url: '/businessWorkPlanReqRespCar/findPage',
    method: 'post',
    data: data
  })
}
// 历史计划送车、拉车分页查询
export function businessWorkPlanPushPullCar(data) {
  return request({
    url: '/businessWorkPlanPushPullCar/findPage',
    method: 'post',
    data: data
  })
}
// 历史计划公告信息分页查询
export function businessWorkPlanAnnouncement(data) {
  return request({
    url: '/businessWorkPlanAnnouncement/findPage',
    method: 'post',
    data: data
  })
}

// 发布作业计划
// 查询所有发货公司
export function findAllShipmentsCompany(data) {
  return request({
    url: '/businessShipmentsCompany/findAllShipmentsCompany',
    method: 'get'
  })
}
// 发布请求车、承认车信息
export function businessWorkPlanReqRespCarSave(data) {
  return request({
    url: '/businessWorkPlanReqRespCar/save',
    method: 'post',
    data: data
  })
}
// 发布送车、拉车新增
export function businessWorkPlanPushPullCarSave(data) {
  return request({
    url: '/businessWorkPlanPushPullCar/save',
    method: 'post',
    data: data
  })
}
// 发布公告新增
export function businessWorkPlanAnnouncementSave(data) {
  return request({
    url: '/businessWorkPlanAnnouncement/save',
    method: 'post',
    data: data
  })
}

//发货公司
//发货公司列表
export function businessShipmentsCompanyPage(data) {
  return request({
    url: '/businessShipmentsCompany/findPage',
    method: 'post',
    data: data
  })
}
// 统计所有公司数和欠款公司数
export function businessShipmentsCompanyCount(data) {
  return request({
    url: '/businessShipmentsCompany/count',
    method: 'get'
  })
}
// 删除发货公司
export function businessShipmentsCompanyDelete(id) {
  return request({
    url: '/businessShipmentsCompany/delete/' + id,
    method: 'get'
  })
}
// 新增修改发货公司
export function businessShipmentsCompanySave(data) {
  return request({
    url: '/businessShipmentsCompany/save',
    method: 'post',
    data: data
  })
}
// 上传图片
export function businessShipmentsCompany(data) {
  return request({
    url: '/businessShipmentsCompany',
    method: 'post',
    data: data
  })
}


// 绩效管理
// 绩效管理列表
export function sysPerformancePage(data) {
  return request({
    url: '/sysPerformance/findPage',
    method: 'post',
    data: data
  })
}
// 查询部门人员
export function userFindUserByInfo(data) {
  return request({
    url: '/user/findUserByInfo',
    method: 'post',
    data: data
  })
}
// 删除效绩管理
export function sysPerformanceDelete(id) {
  return request({
    url: '/sysPerformance/delete/' + id,
    method: 'get'
  })
}
// 发布效绩管理
export function sysPerformanceSave(data) {
  return request({
    url: '/sysPerformance/save',
    method: 'post',
    data: data
  })
}


// 合同添加
// 合同列表
export function businessContractPage(data) {
  return request({
    url: '/businessContract/findPage',
    method: 'post',
    data: data
  })
}
// 合同添加
export function businessContractSave(data) {
  return request({
    url: '/businessContract/save',
    method: 'post',
    data: data
  })
}
// 合同删除
export function businessContractDelete(id) {
  return request({
    url: '/businessContract/delete/' + id,
    method: 'get'
  })
}
// 合同下载
export function sysFileDownload(id) {
  return request({
    url: '/sysFile/download/' + id,
    method: 'get'
  })
}

//部门人员
// 部门人员列表
export function userPage(data) {
  return request({
    url: '/user/findPage',
    method: 'post',
    data: data
  })
}
//统计人员
export function userCountDept(id) {
  return request({
    url: '/user/countDept/' + id,
    method: 'get'
  })
}
// 查看详情
export function userFindUserById(id) {
  return request({
    url: '/user/findUserById/' + id,
    method: 'get'
  })
}


//我的申请
//我的申请列表
export function sysAskForLeavePage(data) {
  return request({
    url: '/sysAskForLeave/findPage',
    method: 'post',
    data: data
  })
}
// 查询所有请假类型
export function findAllAskForLeaveType(data) {
  return request({
    url: '/sysAskForLeave/findAllAskForLeaveType',
    method: 'get'
  })
}
// 查询所有审批状态  
export function findAllApplyStatus(data) {
  return request({
    url: '/sysApply/findAllApplyStatus',
    method: 'get'
  })
}
// 添加取消接口
export function sysAskForLeaveSave(data) {
  return request({
    url: '/sysAskForLeave/save',
    method: 'post',
    data: data
  })
}
// 请假详情
export function sysAskForLeaveDetail(id) {
  return request({
    url: '/sysAskForLeave/detail/' + id,
    method: 'get'
  })
}


// 我的审批
// 我的审批列表
export function sysAskForLeaveFindApprovePage(data) {
  return request({
    url: '/sysAskForLeave/findApprovePage',
    method: 'post',
    data: data
  })
}



// 综合部
//人员管理
//查询所有部门
export function deptFindTreeAll(data) {
  return request({
    url: '/dept/findTreeAll',
    method: 'get'
  })
}
// 查询所有学历
export function userFindAllEdu(data) {
  return request({
    url: '/user/findAllEdu',
    method: 'get'
  })
}
// 查询所有角色
export function roleFindAll(data) {
  return request({
    url: '/role/findAll',
    method: 'get'
  })
}
// 添加修改人员管理
export function userSave(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data: data
  })
}

// 删除人员
export function userDelete(id) {
  return request({
    url: '/user/delete/' + id,
    method: 'get'
  })
}

// export function refreshToken(token) {
//   return request({
//     url: '/admin/index/refreshToken/' + token,
//     method: 'get'
//   })
// }
// // 装车  导出
// export function getTrackExport(data) {
//   return request({
//     url: '/systempc/exportLoadCar',
//     method: 'post',
// 	params:data
//   })
// }


// export function deleteKnowledge(id) {
//   return request({
//     url: 'admin/knowledge/del/' + id,
//     method: 'get'
//   })
// }