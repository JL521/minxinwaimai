const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let map = {}
  if(event.state){
    map.state = event.state
  }
  
  try{
    let res
    if (map.state==4) {
      res = await db.collection('order').where({
        state:4,
        type:'bus'
      })
      .skip(event.pageNum * event.pageSize)
    .limit(event.pageSize)
    .orderBy('createTime','desc')
    .get();
    }else{
      res = await db.collection('order').where(map)
      .skip(event.pageNum * event.pageSize)
    .limit(event.pageSize)
    .orderBy('createTime','desc')
    .get();
    }
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
