// pages/orderList/orderList.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:0,
    orders:[],
    pageNum:0,
    pageSize:100
  },

  onChange(event){
    this.setData({
      state:event.detail.name,
      pageNum:0
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
        state:that.data.state,
        pageNum:this.data.pageNum,
        pageSize:this.data.pageSize,
      },
      success(resp){
        wx.stopPullDownRefresh()
        if(that.data.pageNum==0){
          that.setData({
            orders:resp.data
          })
        }else{
          that.data.orders = that.data.orders.concat(resp.data)
          that.setData({
            orders:that.data.orders
          })
        }         
      },
    })
  },

  onPullDownRefresh:function(){
    this.data.pageNum = 0
    this.setData({
      pageNum:0
    })
    this.getList()
  },

  onReachBottom(){
    this.data.pageNum++
    this.setData({
      pageNum:this.data.pageNum
    })
    this.getList()
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