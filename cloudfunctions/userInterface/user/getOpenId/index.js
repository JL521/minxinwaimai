const cloud = require('wx-server-sdk');
const db = cloud.database();
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  let res = await db.collection('user')
  .where({
    isShop:1,
    openId:wxContext.OPENID
  }).get()
  let isShop = false;
  if (res.data&&res.data.length>0) {
    isShop = true;
  }
  return {
    code:0,
    data:{
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      isShop:isShop,
    },
    msg:'成功'
  };
};
