const createAddress = require('./address/createAddress/index')
const addressList = require('./address/addressList/index')
const getOpenId = require('./user/getOpenId/index')
const deladdress = require('./address/deladdress/index')
const saveInfo = require('./user/saveInfo/index')
const getShopIds = require('./user/getShopIds/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type){
    case 'addressCreate':
      return await createAddress.main(event,context)
      case 'addressList':
      return await addressList.main(event,context)
      case 'getOpenId':
      return await getOpenId.main(event,context)
      case 'deladdress':
      return await deladdress.main(event,context)
      case 'saveInfo':
      return await saveInfo.main(event,context)
      case 'getShopIds':
      return await getShopIds.main(event,context)
  }

  return {
    code:-1,
    data: null,
    msg:'没有找到方法'
  }
}