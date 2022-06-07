// pages/order/order.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice:0,
    cars:[],
    addressInfo:{},
    message:'',
    orderNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      totalPrice:options.totalPrice,
      cars:getApp().globalData.cars,
    })
  },

   getOrderCode(){ 
    // 存放订单号
    let orderCode = '';
    // 6位随机数(加在时间戳后面)
    for(let i=0;i < 6; i++){
      orderCode += Math.floor(Math.random() * 10);
    }
    // 时间戳(用来生成订单号)
    orderCode = 'D' + new Date().getTime() + orderCode;
    // 打印
    return orderCode;
  },

  submitOrder(){
    let that = this
    if(this.data.orderNum==''){
      this.setData({
        orderNum:this.getOrderCode()
      })
      wx.requestSubscribeMessage({
        tmplIds: ['UjKyvhA8T50W6o4fSiuVSfmJQv5cyT9wzO0sIc5nGYk'],
        success(res){
          console.log('===========',res)
        }
      })
    }
    let order = {};
    order.info = this.data
    order.orderNum = this.data.orderNum
    order.body = "总计" + this.data.cars.length + '件商品'
    wxCloudAPI.request({
      showLoading:true,
      name:'orderInterface',
      data:{
        type: 'createOrder',
        order:order
      },
      success(resp){
        getApp().globalData.cars=[]
        wx.requestPayment(
          {
           ...resp.data,
           success(res){
            wxCloudAPI.request({
              showLoading:true,
              name:'orderInterface',
              data:{
                type: 'paySuccessOrder',
                orderNum:that.data.orderNum
              },
              success(resp){
                wx.showToast({
                  title: '提交成功',
                  success(){
                    setTimeout(function () {
                      wx.navigateBack()
                    }, 2000) 
                  }
                })
              },
            })
           },
           fail(err){
             console.log('zhifuerror===',err)
           }
          }
        )
      },
    })
  },

  goAdList(){
    wx.navigateTo({
      url: '../addressList/addressList?isChoose='+true,
    })
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
    }else if(e.currentTarget.id=='message'){
      this.setData({
        message:e.detail
      })
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(getApp().globalData.addressInfo!=undefined){
      this.setData({
        addressInfo:getApp().globalData.addressInfo,
      })
    }
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