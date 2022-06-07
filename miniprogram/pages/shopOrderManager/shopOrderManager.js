// pages/orderList/orderList.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,
    orders:[],
    pageNum:0,
    pageSize:10
  },

  onPullDownRefresh:function(){
    this.data.pageNum = 0
    this.setData({
      pageNum:0
    })
    this.getList()
  },

  onReachBottom(){
    this.pageNum++
    this.setData({
      pageNum:this.data.pageNum
    })
    this.getList()
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
      name:'shopInterface',
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
      data:{
        type: 'busGetOrderList',
        state:that.data.state-0
      },
      success(resp){
        wx.stopPullDownRefresh()
         that.setData({
           orders:resp.data
         })
      },
    })
  },

  goDetail(e){
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../shopOrderDetail/shopOrderDetail?id='+data._id,
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