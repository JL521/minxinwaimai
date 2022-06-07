const busShopLogin = require('./busShopLogin/index')
const busChangeShopInfo = require('./busChangeShopInfo/index')
const busGetShopInfo = require('./busGetShopInfo/index')
const busAddFootKind = require('./busAddFootKind/index')
const busGetFoodKindList = require('./busGetFoodKindList/index')
const busAddFood = require('./busAddFood/index')
const busGetFoodList = require('./busGetFoodList/index')
const busGetOrderList = require('./busGetOrderList/index')
const busChangeOrderState = require('./busChangeOrderState/index')
const busCancleOrder = require('./busCancleOrder/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type){
    case 'busShopLogin':
      return await busShopLogin.main(event,context)
    case 'busChangeShopInfo':
      return await busChangeShopInfo.main(event,context)
    case 'busGetShopInfo':
      return await busGetShopInfo.main(event,context)
    case 'busAddFootKind':
      return await busAddFootKind.main(event,context)
    case 'busGetFoodKindList':
      return await busGetFoodKindList.main(event,context)
    case 'busAddFood':
      return await busAddFood.main(event,context)
    case 'busGetFoodList':
      return await busGetFoodList.main(event,context)
    case 'busGetOrderList':
      return await busGetOrderList.main(event,context)
    case 'busChangeOrderState':
      return await busChangeOrderState.main(event,context)
    case 'busCancleOrder':
      return await busCancleOrder.main(event,context)
  }

  return {
    code:-1,
    data: null,
    msg:'没有找到方法'
  }
}