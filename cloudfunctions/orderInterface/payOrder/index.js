const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContent = cloud.getWXContext() // openid等信息
  const openid = wxContent.OPENID
  const appid = wxContent.APPID
 
  const totalFee = event.totalFee // 支付金额（单位：分）
  const body = event.body // 商品名
  const outTradeNo = event.outTradeNo //订单号
 
  // 获取免鉴权支付参数
  const payMent = await cloud.cloudPay.unifiedOrder({
    "body": body,
    "outTradeNo": outTradeNo,
    "spbillCreateIp": "127.0.0.1",
    "subMchId": "1626840615", // 商户号
    "totalFee": totalFee,
    "envId": "jl-test-7gyjr92k7b1e9164", // 云环境id
    "functionName": "payResult", // 支付回调云函数
    "nonceStr":"5K8264ILTKCH16CQ2502SI8ZNMTM67VS",
    "tradeType":"JSAPI"
  })
 
  return {
    code:0,
    data:payMent.payment,
    msg:'成功~'
  }
};


