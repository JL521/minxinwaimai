// pages/shop/shop.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:{}
  },

  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.shopInfo.phone,
      success(){
        console.log('成功')
      },
      fail(){
        console.log('失败')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getShopInfo(res){
    let that = this
    wxCloudAPI.request({
      showLoading:false,
      name:'shopInterface',
      data:{
        type: 'busGetShopInfo',
        id:'6842667962a43f0105787b6b3bd234d1',
      },
      success(resp){
        that.setData({
          shopInfo:resp.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getShopInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

/**
  * 用户点击右上角分享
  */
 onShareAppMessage: function () {
  return {
    title:'平阴民心外卖',
    path:'pages/demo/demo',
    imageUrl:'../../images/share.png'
  };
},
})