const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  let payTime = Date.parse(new Date())
  try{
      await db.collection('order').where({
        orderNum: event.orderNum,
      }).update({
       data:{
        state:1,
        payTime:payTime
       }
      });
  return {
    code: 0,
    data: null,
    msg: '成功~',
  };
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '失败~'+e,
    };
  }
};
