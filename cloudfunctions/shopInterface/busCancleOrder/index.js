const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  let refundTime = Date.parse(new Date())
  try{
    let res = await db.collection('order').where({
      _id:event.id
    }).get();
    let order = res.data[0]
    const payMent = await cloud.cloudPay.refund({
      "out_trade_no": order.outTradeNo,
      "sub_mch_id": "1626840615", // 商户号
      "total_fee": order.info.totalPrice * 100,
      "refund_fee":order.info.totalPrice * 100,
      "envId": "jl-prod-7gez695863508f63", // 云环境id
      "functionName": "refundResult", // 支付回调云函数
      "nonce_str":createOutTradeNo(),
      "tradeType":"JSAPI",
      "out_refund_no":createOutTradeNo()
    })

    if(payMent.returnCode == 'SUCCESS'){
      await db.collection('order').where({
        _id: event.id,
      }).update({
       data:{
        state:4,
        refundTime:refundTime,
        des:'商家退款',
        type:'bus'
       }
      });
      return {
        code: 0,
        data: null,
        msg: '成功~',
      };
    }else{
      return {
        code: 1,
        data: payMent,
        msg: '退款失败~',
      };
    }
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '失败~'+e,
    };
  }
};
/** 创建随机的唯一订单号(32位) */
const createOutTradeNo = () => {
  let outTradeNo = new Date().getTime() // 获取当前13位时间戳
  let numStr = '0123456789';
  let randomStr = '';
  for (let i = (32 - 13); i > 0; --i) {
    randomStr += numStr[Math.floor(Math.random() * numStr.length)];
  }
  outTradeNo += randomStr
  return outTradeNo
}