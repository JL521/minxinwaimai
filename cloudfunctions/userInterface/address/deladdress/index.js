const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  try{
    let res = await db.collection('address').where({
      _id:event.id,
      openId:wxContext.OPENID
    }).remove();
  return {
    code: 0,
    data: res.data,
    msg: '成功~',
  };
  }catch{
    return {
      code: -1,
      data: null,
      msg: '查询失败~',
    };
  }
};
