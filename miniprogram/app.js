// app.js
const wxCloudAPI = require('./wx_cloud_api/wxCloudAPI')

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // 生产 jl-prod-7gez695863508f63  shopId 6842667962a43f0105787b6b3bd234d1
        // 测试 jl-test-7gyjr92k7b1e9164 shopId b69f67c0629d9552061977f15efcdf73
        // 接单通知id X_ceO6xTGcEUJVOvluc5wNGoZK-X1cagw871PM8riK0
        env: 'jl-prod-7gez695863508f63',
        traceUser: true,
      });
    }
    this.globalData = {
       cars:[],
       address:{},
       busShopInfo:{}
    };
    wx.removeStorageSync('isShopId')
    wxCloudAPI.request({
      showLoading:true,
      name:'userInterface',
      data:{
        type: 'getOpenId',
      },
      success(resp){
       console.log(resp)
       if (resp.data.openid == 'o8ma44gSdZFzsLXVqjzpRP4S_riI') {
         wx.setStorageSync('isShopId', resp.data.openid)   
       }
      },
    })
  },
});
