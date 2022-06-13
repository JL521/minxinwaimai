// pages/min/min.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInfo:false,
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    console.log('res',userInfo)
    if(userInfo){
      this.setData({
        isInfo:true,
        userInfo:JSON.parse(userInfo)
      })
    }
  },
  getInfo(res){
    let that = this
    wx.getUserProfile({
      desc: '获取用户昵称显示个人信息',
      success(res){
        console.log(res.userInfo)
        wx.setStorageSync('userInfo', JSON.stringify(res.userInfo))
        that.setData({
          isInfo:true,
          userInfo:res.userInfo
        })
        wxCloudAPI.request({
          showLoading:false,
          name:'userInterface',
          data:{
            type: 'saveInfo',
            userInfo:res.userInfo
          },
          success(resp){
           
          },
        })
      },fail(err){
        console.log(err)
      }
    })
  },

  toDetail(e){
    let url;
    if(e.currentTarget.dataset.type=='1'){
      url = '../orderList/orderList'
    }else if(e.currentTarget.dataset.type=='2'){
      url='../addressList/addressList';
    }else if(e.currentTarget.dataset.type=='3'){
      url = '../shop/shop'
    }else if(e.currentTarget.dataset.type=='4'){
      url = '../mkxcx/mkxcx'
    }
    wx.navigateTo({
      url: url,
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

  }
})