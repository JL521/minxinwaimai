const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  
  try{
    let res = await db.collection('activity')
    .orderBy('maxPrice','asc')
    .get();
      return {
        code: 0,
        data: res.data,
        msg: '查询成功~',
      };
    
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '查询失败~'+e,
    };
  }
};
