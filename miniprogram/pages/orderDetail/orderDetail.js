// pages/orderDetail/orderDetail.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice:0,
    addressInfo:{},
    message:'',
    cars:[],
    orderInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'orderInterface',
      data:{
        type: 'orderDetail',
        id:options.id
      },
      success(resp){
        let data  = resp.data[0]
         that.setData({
           orderInfo:data,
           totalPrice:data.info.totalPrice,
           addressInfo:data.info.addressInfo,
           message:data.info.message,
           cars:data.info.cars
         })
      },
    })
  },

  submitOrder(){
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'orderInterface',
      data:{
        type: 'payOrder',
        id:that.data.orderInfo._id,
        totalFee:1,
        body:'支付测试'
      },
      success(resp){
        
       wx.requestPayment(
         {
          ...resp.data,
          success(res){
            console.log('zhifu===',res)
          },
          fail(err){
            console.log('zhifuerror===',err)
          }
         }
       )
      },
    })
  },
  cancleOrder(){
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'orderInterface',
      data:{
        type: 'cancleOrder',
        id:that.data.orderInfo._id
      },
      success(resp){
        wx.showToast({
          title: '取消成功',
          success(){
            setTimeout(function () {
              wx.navigateBack()
            }, 2000) 
          }
        })
      },
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