const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  
  let query = {}
  if(event.kindId){
    query.kindId = event.kindId
  }

  try{
    let res = await db.collection('food')
    .where(query)
    .skip(event.pageNum * event.pageSize)
    .limit(event.pageSize)
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
