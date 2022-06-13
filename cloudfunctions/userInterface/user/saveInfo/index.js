const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let info = event.userInfo
  info.openId = wxContext.OPENID
  info.updateTime = Date.parse(new Date());
  info.delFlag = 0
  try{
    let totalPage = await db.collection('user')
    .where({
      openId:info.openId
    }).count()
    let total = totalPage.total
    if(total >0){
      await db.collection('user')
      .where({
        openId:info.openId
      })
      .update({
        data: info,
      });
    }else{
      await db.collection('user').add({
        data: info,
      });
    }
    
  return {
    code: 0,
    data: null,
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
