const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  let res = await db.collection('order').where({
    orderNum:event.orderNum
  }).get();
  let order = res.data[0]
  // 获取免鉴权支付参数
  const payMent = await cloud.cloudPay.unifiedOrder({
    "body": order.body,
    "outTradeNo": order.outTradeNo,
    "spbillCreateIp": "127.0.0.1",
    "subMchId": "1626840615", // 商户号
    "totalFee": order.info.totalPrice * 100,
    "envId": "jl-test-7gyjr92k7b1e9164", // 云环境id
    "functionName": "payResult", // 支付回调云函数
    "nonceStr":createOutTradeNo(),
    "tradeType":"JSAPI"
  })
 
  return {
    code:0,
    data:payMent.payment,
    msg:'成功~'
  }
};


