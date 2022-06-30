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
    .get();
    if(res.data.length<=0){
      return {
        code: 001,
        data: res.data,
        msg: '用户不存在~',
      };
    }else{
      let shop = res.data[0]
      let activities = await db.collection('activity')
         .orderBy('maxPrice','asc')
         .get();
      shop.activities = activities.data;
      return {
        code: 0,
        data: shop,
        msg: '查询成功~',
      };
    }
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '查询失败~'+e,
    };
  }
};
