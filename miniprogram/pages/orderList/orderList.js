// pages/orderList/orderList.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:0,
    orders:[]
  },

  onChange(event){
    this.setData({
      state:event.detail.name
    })
    this.getList()
  },

  getList(){
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'orderInterface',
      data:{
        type: 'orderList',
        state:that.data.state
      },
      success(resp){
         that.setData({
           orders:resp.data
         })
      },
    })
  },

  goDetail(e){
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+data._id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
   this.getList()
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