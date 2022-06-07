const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  
  try{
    let res = await db.collection('shop')
    .where({
      _id:event.id,
    })
    .update({
      data:event.data
    });
    return {
      code: 0,
      data: res.data,
      msg: '更新成功~',
    };
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '查询失败~'+e,
    };
  }
};
