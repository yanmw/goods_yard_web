import request from '@/util/ajax'

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
    params: data
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
    url: '/account/login',
    method: 'post',
    params: data
  })
}
// 退出
export function logout() {
  return request({
    url: '/account/Loginout',
    method: 'post',
  })
}
// 注册
export function register(data) {
  return request({
    url: '/account/register',
    method: 'post',
    params: data
  })
}
// 找回密码
export function retrievePassword(data) {
  return request({
    url: '/account/findPassword',
    method: 'post',
    params: data
  })
}

// 获取普通用户金额
export function getMoney(data) {
  return request({
    url: '/account/getAccount',
    method: 'get',
    params: data
  })
}
// 用户头像上传
export function uploadImg(data) {
  return request({
    url: '/pic/photo',
    method: 'post',
    params: data
  })
}

// 首页
// 查询种类
export function selectGoodsCategory(data) {
  return request({
    url: '/goods/getCategoryList',
    method: 'get',
    params: data
  })
}
// 根据货品种类查询货源厂家
export function selectGoodsSupplier(data) {
  return request({
    url: '/index/selectGoodsSupplier',
    method: 'get',
    params: data
  })
}
// 获取采购列表
export function selectGoodsSource(data) {
  return request({
    url: '/index/selectGoodsSource',
    method: 'get',
    params: data
  })
}
// 我要采购-填写订单
export function settleAdd(data) {
  return request({
    url: '/settle/add',
    method: 'post',
    params: data
  })
}
// 输入密码-冻结金额
export function settlePay(data) {
  return request({
    url: '/settle/pay',
    method: 'post',
    params: data
  })
}
// 运单填写
export function deliveryAdd(data) {
  return request({
    url: '/delivery/add',
    method: 'post',
    params: data
  })
}
// 查询求购列表
export function selectPurchaseList(data) {
  return request({
    url: '/index/selectPurchaseList',
    method: 'get',
    params: data
  })
}
// 意向交易-意向供货
export function intentionAdd(data) {
  return request({
    url: '/intention/add',
    method: 'post',
    params: data
  })
}

// 订单管理
// 预结算订单
export function selectSettlePage(data) {
  return request({
    url: '/settle/selectSettlePage',
    method: 'get',
    params: data
  })
}
// 查询条件
export function selectQueryList(data) {
  return request({
    url: '/settle/selectQueryList',
    method: 'get',
    params: data
  })
}
// 导出查询列表
export function selectSettleList(data) {
  return request({
    url: '/settle/selectSettleList',
    method: 'get',
    params: data
  })
}
// 待审核订单
export function selectIntentionPage(data) {
  return request({
    url: '/pending/selectIntentionPage',
    method: 'get',
    params: data
  })
}
// 查询条件
export function pendingSelectQueryList(data) {
  return request({
    url: '/pending/selectQueryList',
    method: 'get',
    params: data
  })
}
// 修改吨数
export function pendingEdit(data) {
  return request({
    url: '/pending/edit',
    method: 'post',
    params: data
  })
}
// 待审核确认
export function pendingUpdateStatus(data) {
  return request({
    url: '/pending/updateStatus',
    method: 'post',
    params: data
  })
}

//实际结算订单
export function selectActualSettlePage(data) {
  return request({
    url: '/settle/selectActualSettlePage',
    method: 'get',
    params: data
  })
}
//结算订单详情
export function selectSettle(data) {
  return request({
    url: '/settle/selectSettle',
    method: 'get',
    params: data
  })
}
// 结算订单完成
export function settleFinish(data) {
  return request({
    url: '/settle/finish',
    method: 'post',
    params: data
  })
}
// 实际结算订单导出查询
export function selectSettlementList(data) {
  return request({
    url: '/settle/selectSettlementList',
    method: 'get',
    params: data
  })
}

// 货品管理
// 查询货品种类-查询条件
export function getModelByCategory(data) {
  return request({
    url: '/goods/getModelByCategory',
    method: 'get',
    params: data
  })
}
// 查询货源厂家-查询条件
export function getSuppliers(data) {
  return request({
    url: '/goods/getSuppliers',
    method: 'get',
    params: data
  })
}
// 发布货品
export function issueGoods(data) {
  return request({
    url: '/goodsSource/add',
    method: 'post',
    params: data
  })
}
// 根据货品获取ID
export function selectGoodsID(data) {
  return request({
    url: '/goodsSource/selectGoodsSource',
    method: 'get',
    params: data
  })
}
// 修改货品
export function issueGoodsEdit(data) {
  return request({
    url: '/goodsSource/updateGoodsSource',
    method: 'post',
    params: data
  })
}
// 货品列表
// 货品的列表
export function selectGoodsSourcePage(data) {
  return request({
    url: '/goodsSource/selectGoodsSourcePage',
    method: 'get',
    params: data
  })
}
// 货品上下架
export function goodsUpdateStatus(data) {
  return request({
    url: '/goodsSource/updateStatus',
    method: 'post',
    params: data
  })
}
// 货品维护
// 货品维护列表
export function selectGoodsPage(data) {
  return request({
    url: '/goods/selectGoodsPage',
    method: 'get',
    params: data
  })
}
// 新增货品维护
export function addGoods(data) {
  return request({
    url: '/goods/add',
    method: 'post',
    params: data
  })
}
// 删除
export function deleteGoods(data) {
  return request({
    url: '/goods/deleteGoods',
    method: 'post',
    params: data
  })
}

// 财务管理
// 资金账户列表
export function selectFundPage(data) {
  return request({
    url: '/fund/selectFundPage',
    method: 'get',
    params: data
  })
}
// 根据手机号查询
export function selectAuthByPhone(data) {
  return request({
    url: '/fund/selectAuthByPhone',
    method: 'get',
    params: data
  })
}
// 新增资金账户
export function addFund(data) {
  return request({
    url: '/fund/addFund',
    method: 'post',
    params: data
  })
}
// 编辑资金账户修改
export function updateFund(data) {
  return request({
    url: '/fund/updateFund',
    method: 'post',
    params: data
  })
}
// 充值账户
export function recharge(data) {
  return request({
    url: '/fund/recharge',
    method: 'post',
    params: data
  })
}
// 提现账户
export function cashOut(data) {
  return request({
    url: '/fund/cashOut',
    method: 'post',
    params: data
  })
}
// 充值记录列表
export function selectRechargePage(data) {
  return request({
    url: '/fund/selectRechargePage',
    method: 'get',
    params: data
  })
}
// 交易流水账户列表
export function selectTradeRecordsPage(data) {
  return request({
    url: '/fund/selectTradeRecordsPage',
    method: 'get',
    params: data
  })
}
// 交易流水的交易对象
export function queryList(data) {
  return request({
    url: '/fund/queryList',
    method: 'get',
    params: data
  })
}
// 交易流水的导出查询
export function selectTradeRecordsListExport(data) {
  return request({
    url: '/fund/selectTradeRecordsList',
    method: 'get',
    params: data
  })
}

// 账户管理
// 查询认证信息
export function getAccountAuth(data) {
  return request({
    url: '/account/getAccountAuth',
    method: 'get',
    params: data
  })
}
// 认证信息
export function sendAccountAuth(data) {
  return request({
    url: '/account/accountAuth',
    method: 'post',
    params: data
  })
}
// 修改手机号
export function modifyPhone(data) {
  return request({
    url: '/account/updatePhone',
    method: 'post',
    params: data
  })
}
// 修改密码
export function modifyPwd(data) {
  return request({
    url: '/account/editPassword',
    method: 'post',
    params: data
  })
}
// 修改子账户
// 子账户分页
export function selectAccountPage(data) {
  return request({
    url: '/account/selectAccountPage',
    method: 'get',
    params: data
  })
}
// 添加子账户
export function addAccount(data) {
  return request({
    url: '/account/addAccount',
    method: 'post',
    params: data
  })
}
// 获取货源厂家
export function selectSupplierList(data) {
  return request({
    url: 'account/selectSupplierList',
    method: 'get',
    params: data
  })
}
// 修改子账户
export function updateAccount(data) {
  return request({
    url: '/account/updateAccount',
    method: 'post',
    params: data
  })
}
//  查询子账户
export function selectAccount(data) {
  return request({
    url: '/account/selectAccount',
    method: 'get',
    params: data
  })
}
// 冻结-解冻
export function updateAccountStatus(data) {
  return request({
    url: '/account/updateStatus',
    method: 'post',
    params: data
  })
}
// 普通用户-支付密码设置
export function updatePayPassword(data) {
  return request({
    url: '/account/updatePayPassword',
    method: 'post',
    params: data
  })
}
// 普通用户-重置支付密码
export function resetPayPassword(data) {
  return request({
    url: '/account/resetPayPassword',
    method: 'post',
    params: data
  })
}

// 普通用户 卖货管理
// 线下卖货
//  查询线下卖货列表
export function selectByPage(data) {
  return request({
    url: '/line/selectByPage',
    method: 'get',
    params: data
  })
}
//  查询条件列表
export function selectBySupplier(data) {
  return request({
    url: '/line/selectBySupplier',
    method: 'get',
    params: data
  })
}
// 列表录入
export function lineAdd(data) {
  return request({
    url: '/line/add',
    method: 'post',
    params: data
  })
}
// 列表修改
export function lineEdit(data) {
  return request({
    url: '/line/edit',
    method: 'post',
    params: data
  })
}
// 线下卖货导入
export function exportRu(data) {
  return request({
    url: '/line/import',
    method: 'post',
    data: data
  })
}
// 导出  查询是否为空
export function lineSelectList(data) {
  return request({
    url: '/line/selectList',
    method: 'get',
    params: data
  })
}
// 预约卖货
// 预约卖货列表
export function salesSelectBySupplier(data) {
  return request({
    url: '/sales/selectBySupplier',
    method: 'get',
    params: data
  })
}
// 修改单价
export function salesEdit(data) {
  return request({
    url: '/sales/edit',
    method: 'post',
    params: data
  })
}
// 查询条件
export function salesSelectByPage(data) {
  return request({
    url: '/sales/selectByPage',
    method: 'get',
    params: data
  })
}
// 导出 查询是否为空
export function salesSelectList(data) {
  return request({
    url: '/sales/selectList',
    method: 'get',
    params: data
  })
}
// 普通用户  交易流水
//查询条件列表 
export function tradeUserSelectQueryList(data) {
  return request({
    url: '/tradeUser/selectQueryList',
    method: 'get',
    params: data
  })
}
// 交易流水分页
export function tradeUserSelectPageList(data) {
  return request({
    url: '/tradeUser/selectPageList',
    method: 'get',
    params: data
  })
}

//用户管理  买货管理
 // 求购列表
export function purchaseSelectPurchasePage(data) {
  return request({
    url: '/purchase/selectPurchasePage',
    method: 'get',
    params: data
  })
}
// 删除
export function purchaseRemove(data) {
  return request({
    url: '/purchase/remove',
    method: 'post',
    params: data
  })
}
// 发布求购
export function purchaseAddPurchase(data) {
  return request({
    url: '/purchase/addPurchase',
    method: 'post',
    params: data
  })
}
// 根据id查询求购记录
export function purchaseSelectPurchase(data) {
  return request({
    url: '/purchase/selectPurchase',
    method: 'get',
    params: data
  })
}
// 修改求购记录
export function purchaseUpdatePurchase(data) {
  return request({
    url: '/purchase/updatePurchase',
    method: 'post',
    params: data
  })
}

// 意向订单
// 意向订单列表
export function intentionSelectIntentionPage(data) {
  return request({
    url: '/intention/selectIntentionPage',
    method: 'get',
    params: data
  })
}
// 意向订单详情
export function intentionSelectIntention(data) {
  return request({
    url: '/intention/selectIntention',
    method: 'get',
    params: data
  })
}
// 查询条件
export function intentionSelectQueryList(data) {
  return request({
    url: '/intention/selectQueryList',
    method: 'get',
    params: data
  })
}
// 查询条件  运单
export function deliverySelectQueryList(data) {
  return request({
    url: '/delivery/selectQueryList',
    method: 'get',
    params: data
  })
}
// 运单列表
export function deliverySelectPage(data) {
  return request({
    url: '/delivery/selectPage',
    method: 'get',
    params: data
  })
}
// 运单列表详情
export function deliverySelectDetails(data) {
  return request({
    url: '/delivery/selectDetails',
    method: 'get',
    params: data
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