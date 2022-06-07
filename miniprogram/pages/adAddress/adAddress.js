// pages/adAddress/adAddress.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {   
    addressInfo:{}
  },

  valueChange(e){
    if(e.currentTarget.id=='name'){
      this.data.addressInfo.name = e.detail
    }else if(e.currentTarget.id=='phone'){
      this.data.addressInfo.phone = e.detail
    }else if(e.currentTarget.id=='address'){
      this.data.addressInfo.address = e.detail
    }else if(e.currentTarget.id=='detailAddress'){
      this.data.addressInfo.detailAddress = e.detail
    }
    this.setData({
      addressInfo:this.data.addressInfo
    })
  },

  chooseAddress(){
    let that = this
    wx.chooseLocation({
      success (res) {
        that.data.addressInfo.address = res.name
        that.setData({
          addressInfo:that.data.addressInfo
        })
      }
     })
  },

  adAddress(){
    wxCloudAPI.request({
      showLoading:true,
      name:'userInterface',
      data:{
        type: 'addressCreate',
        address:this.data.addressInfo,
      },
      success(resp){
        wx.showToast({
          title: '保存成功',
          success(){
            setTimeout(function () {
              wx.navigateBack()
            }, 2000) 
          }
        })
      },
    })
  },

  delAddress(){
    wxCloudAPI.request({
      showLoading:true,
      name:'userInterface',
      data:{
        type: 'deladdress',
        id:this.data.addressInfo._id,
      },
      success(resp){
        wx.showToast({
          title: '删除成功',
          success(){
            getApp().globalData.addressInfo = {}
            setTimeout(function () {
              wx.navigateBack()
            }, 2000) 
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(getApp().globalData.addressInfo!=undefined){
      this.setData({
        addressInfo:getApp().globalData.addressInfo,
      })
    }
    console.log(this.data.addressInfo._id)
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