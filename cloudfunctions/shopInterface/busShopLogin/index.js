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
      name:event.name,
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
      if(shop.pwd!=event.pwd){
        return {
          code: 002,
          data: res.data,
          msg: '密码错误~',
        };
      }
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
