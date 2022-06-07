const createOrder = require('./createOrder/index')
const orderList = require('./orderList/index')
const orderDetail = require('./orderDetail/index')
const cancleOrder = require('./cancleOrder/index')
const payOrder = require('./payOrder/index')


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type){
    case 'createOrder':
      return await createOrder.main(event,context)
    case 'orderList':
      return await orderList.main(event,context)
    case 'orderDetail':
      return await orderDetail.main(event,context)
    case 'cancleOrder':
      return await cancleOrder.main(event,context)
    case 'payOrder':
      return await payOrder.main(event,context)
  }

  return {
    code:-1,
    data: null,
    msg:'没有找到方法'
  }
}