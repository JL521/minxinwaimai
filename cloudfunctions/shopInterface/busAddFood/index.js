const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let data = event.data
  data.operatorId = wxContext.OPENID
  data.createTime = Date.parse(new Date())
  data.updateTime = Date.parse(new Date());
  data.delFlag = 0
  
  try{

    let res
    if(data._id!=undefined&&data._id!=null){
      let map={};
      Object.keys(data).forEach(function (key) {
        if(key!='_id'){
          map[key] = data[key]
        }
       })
      res = await db.collection('food').doc(data._id).update({
        data: map,
      });
    }else{
       res = await db.collection('food')
      .add({
        data:data
      });
    }
    
    return {
      code: 0,
      data: res.data,
      msg: '成功~',
    };
  }catch(e){
    return {
      code: -1,
      data: null,
      msg: '失败~'+e,
    };
  }
};
