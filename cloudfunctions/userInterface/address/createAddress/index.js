const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let address = event.address
  address.openId = wxContext.OPENID
  address.updateTime = Date.parse(new Date());
  address.delFlag = 0
  try{
    if(address._id!=undefined&&address._id!=null){
      let map={};
      Object.keys(address).forEach(function (key) {
        if(key!='_id'){
          map[key] = address[key]
        }
       })
      await db.collection('address').doc(address._id).update({
        data: map,
      });
    }else{
      address.createTime = Date.parse(new Date())
      await db.collection('address').add({
        data: address,
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
