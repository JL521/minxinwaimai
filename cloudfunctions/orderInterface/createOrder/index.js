const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let order = event.order
  
  try{
    let shops = await db.collection('shop')
    .where({
      _id:'6842667962a43f0105787b6b3bd234d1',
    })
    .get();
    let shop = shops.data[0]
    if (shop.state!=1) {
      return {
        code:-1,
        data:null,
        msg:'店铺休息中，请稍后再来~'
      }
    }
    
    let res = await db.collection('order').where({
      orderNum:order.orderNum
    }).get();
    if(res.data!=null&&res.data.length>0){
      order = res.data[0]
    }else{
      order.openId = wxContext.OPENID
      order.createTime = Date.parse(new Date())
      order.updateTime = Date.parse(new Date());
      order.delFlag = 0
      order.state = 0 //0 待支付  1已支付等待商家确认 2商家已确认  3已完成 4 已取消 
      const outTradeNo = createOutTradeNo() // 订单号
      order.outTradeNo = outTradeNo  

      await db.collection('order').add({
        data: order,
      });

    }
    const payMent = await cloud.cloudPay.unifiedOrder({
      "body": order.body,
      "outTradeNo": order.outTradeNo,
      "spbillCreateIp": "127.0.0.1",
      "subMchId": "1626840615", // 商户号
      "totalFee": order.info.totalPrice * 100,
      "envId": "jl-prod-7gez695863508f63", // 云环境id
      "functionName": "payResult", // 支付回调云函数
      "nonceStr":createOutTradeNo(),
      "tradeType":"JSAPI"
    })
  return {
    code: 0,
    data: payMent.payment,
    msg: '成功~',
  };
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '保存失败~'+e,
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