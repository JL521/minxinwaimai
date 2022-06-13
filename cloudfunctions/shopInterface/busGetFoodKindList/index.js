const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  
  try{
    let res = await db.collection('footKind')
    .orderBy('order','asc')
    .skip(event.pageNum * event.pageSize)
    .limit(event.pageSize)
    .get();

    let arr = []
    for(let i =0;i<res.data.length;i++){
      let kind = res.data[i]
      let totalPage = await db.collection('food')
      .where({
        kindId:kind._id,
      }).count()
      kind.count = totalPage.total
      arr.push(kind)
    }
      return {
        code: 0,
        data: arr,
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
