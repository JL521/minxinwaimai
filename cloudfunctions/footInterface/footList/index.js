const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {

  let foods = []
  try{
    let totalPage = await db.collection('footKind')
    .where({
      delFlag:0,
      state:1
    }).count()
    let maxSize = 100
    let total = totalPage.total
    let total_times = Math.ceil(total / maxSize)

    for(let i=0;i<total_times;i++){
      let res = await db.collection('footKind')
    .where({
      delFlag:0,
      state:1
    })
    .skip(i * maxSize)
    .limit(maxSize)
    .get();

    for(let i=0;i<res.data.length;i++){
      let kind = res.data[i]
      let ftotalPage = await db.collection('food')
    .where({
      delFlag:0,
      kindId:kind._id,
      state:1
    }).count()
    let fmaxSize = 100
    let ftotal = ftotalPage.total
    let ftotal_times = Math.ceil(ftotal / fmaxSize)

    let farr = []
    for(let i=0;i<ftotal_times;i++){
      let list = await db.collection('food')
      .where({
        kindId:kind._id,
        delFlag:0,
        state:1
      })
      .skip( i * fmaxSize)
      .limit(fmaxSize)
      .get()
      farr = farr.concat(list.data)
    }
      kind.list = farr
      foods.push(kind)
    }

    }

    
  
return {
  code: 0,
  data: foods,
  msg: '成功~',
};
}catch(e){
  return {
    code: -1,
    data: null,
    msg: '失败~'+e,
  };
}
}