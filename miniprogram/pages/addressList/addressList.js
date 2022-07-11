// pages/addressList/addressList.js

const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    isChoose:false
  },

  adAddress(){
    getApp().globalData.addressInfo = {}
    wx.navigateTo({
      url: '../adAddress/adAddress',
    })
  },

  chooseAddress(e){
    if(this.data.isChoose){
      getApp().globalData.addressInfo = e.currentTarget.dataset.item
      wx.navigateBack()
    }
  },

  editAdress(e){
    getApp().globalData.addressInfo = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../adAddress/adAddress',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isChoose:options.isChoose
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
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'userInterface',
      data:{
        type: 'addressList',
      },
      success(resp){
        that.setData({
          addressList:resp.data
        })
      }
    })
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
onShareTimeline:function(){
  return {
    title:'平阴民心外卖',
    path:'pages/demo/demo',
    imageUrl:'../../images/share.png'
  };
},
})