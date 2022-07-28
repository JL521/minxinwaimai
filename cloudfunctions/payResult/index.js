// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('回调参数====',event)
  const outTradeNo = event.outTradeNo
  const returnCode = event.returnCode
  if(returnCode == 'SUCCESS'){
    if (event.resultCode=='SUCCESS') {
      let payTime = Date.parse(new Date())
       try{
        db.collection('order').where({
          outTradeNo: outTradeNo,
        }).update({
         data:{
          state:1,
          payTime:payTime
         }
        });
       }catch{

       }
    }
    return  {errcode:0,errmsg:''}
  }
}