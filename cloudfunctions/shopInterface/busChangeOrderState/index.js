const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  
  try{
      await db.collection('order').where({
        _id: event.id,
      }).update({
       data:{
        state:event.state
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
