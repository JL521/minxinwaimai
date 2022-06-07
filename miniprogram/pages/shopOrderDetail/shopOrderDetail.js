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
      name:'shopInterface',
      data:{
        type: 'busChangeOrderState',
        id:that.data.orderInfo._id,
        state:that.data.orderInfo.state == 1?2:that.data.orderInfo.state==2?3:that.data.orderInfo.state
      },
      success(resp){
        wx.showToast({
          title: '成功',
          success(){
            setTimeout(function () {
              wx.navigateBack()
            }, 2000) 
          }
        })
      },
    })

    //获取当前时间戳  
    var timestamp = Date.parse(new Date());  
    timestamp = timestamp / 1000;  
    console.log("当前时间戳为：" + timestamp);  
  
//获取当前时间  
    var n = timestamp * 1000;  
    var date = new Date(n);  
    //年  
    var Y = date.getFullYear();  
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
    //时  
    var h = date.getHours();  
    //分  
    var m = date.getMinutes();  
    //秒  
    var s = date.getSeconds();  
    
    console.log("当前时间：" +Y+M+D+h+":"+m+":"+s);  


    wxCloudAPI.request({
      showLoading:true,
      name:'subscribeInterface',
      data:{
        subMsg:{
          name7:{
            value:'民心外卖'
          },
          phone_number3:{
            value:'18865311316'
          },
          time4:{
            value:'2022-09-10 12:00'
          },
        },
        templateId:'UjKyvhA8T50W6o4fSiuVSfmJQv5cyT9wzO0sIc5nGYk',
        openId:that.data.orderInfo.openId
      },
      success(resp){
        wx.showToast({
          title: '成功',
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