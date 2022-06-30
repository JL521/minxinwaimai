const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  try{
    let res = await db.collection('user')
    .where({
      isShop:1
    }).get()
    
  return {
    code: 0,
    data: res.data,
    msg: '保存成功~',
  };
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '保存失败~'+e,
    };
  }
};
