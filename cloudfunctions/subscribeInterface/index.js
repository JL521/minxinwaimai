// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const sendmsg = await cloud.openapi.subscribeMessage.send({
      touser: event.openId,  // 要推送的用户openid
      templateId: event.templateId, // 模板ID
      data: event.subMsg, //模板数据填充部分
      miniprogramState: 'trial' //小程序类型，默认为正式版，这里设置为开发者模式
    });
    return {
      code: 0,
      data: null,
      msg: '发布成功~',
    };
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '发布失败~'+e,
    };
  }
}