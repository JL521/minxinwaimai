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

  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.addressInfo.phone,
      success(){
        console.log('成功')
      },
      fail(){
        console.log('失败')
      }
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

            var tme = new Date();  
    var Y = tme.getFullYear();
    var M = (tme.getMonth() + 1 < 10 ? '0' + (tme.getMonth() + 1) : tme.getMonth() + 1);
    var D = tme.getDate() < 10 ?'0' + tme.getDate():tme.getDate();
    var h = tme.getHours() < 10 ?'0' + tme.getHours():tme.getHours();
    var m = tme.getMinutes()< 10 ?'0' + tme.getMinutes():tme.getMinutes();
    var s = tme.getSeconds()< 10 ?'0' + tme.getSeconds():tme.getSeconds();
    let tem1 = Y + '-' + M + '-' + D + ' ' + h + '-' + m + '-' + s
    console.log("当前时间：" +tem1);  
    let time10 = new Date().getTime()
    wxCloudAPI.request({
      showLoading:true,
      name:'subscribeInterface',
      data:{
        subMsg:{
          thing2:{
            value:'民心外卖'
          },
          thing5:{
            value:'商家已接单，请您耐心等待'
          },
          phrase7:{
            value:'已接单'
          },
        },
        templateId:'X_ceO6xTGcEUJVOvluc5wNGoZK-X1cagw871PM8riK0',
        openId:that.data.orderInfo.openId
      },
      success(resp){
        wx.showToast({
          title: '成功',
        })
      },
    })

          }
        })
      },
    })
  },

  async cancleOrder(){
    let that = this
    const model = await wx.showModal({
      title: '提示',
      content: '确认取消订单并退款',
      confirmText: '取消退款'
    })
    if (model.confirm){
      wxCloudAPI.request({
        showLoading:true,
        name:'shopInterface',
        data:{
          type: 'busCancleOrder',
          id:that.data.orderInfo._id,
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
    }
   
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