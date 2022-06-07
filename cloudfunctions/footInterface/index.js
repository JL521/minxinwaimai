// 云函数入口文件
const footList = require('./footList/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type){
    case 'footList':
      return await footList.main(event,context);
  }
  return {
    code:-1,
    data: null,
    msg:'没有找到方法'
  }
}