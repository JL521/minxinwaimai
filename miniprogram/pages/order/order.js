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
    orderNum:'',
    minDate: new Date().getTime()+40*60*1000,
    maxDate: new Date(2099, 10, 1).getTime(),
    expectTime: new Date().getTime()+40*60*1000,
    show:false,
    distance:-1,
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

  chooseTime(){
    this.setData({
      show:true
    })
  },

  onInput(event) {
    this.setData({
      expectTime: event.detail,
      show:false
    });
  },

  onClose(){
    this.setData({
      show:false
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
    if (!this.data.addressInfo.name||!this.data.addressInfo.phone||!this.data.addressInfo.address||!this.data.addressInfo.detailAddress||!this.data.expectTime) {
      wx.showToast({
        title: '请先完善联系信息~',
        icon:'none'
      })
      return 
    }

    var date = new Date(this.data.expectTime)
   if (date.getHours()<9||date.getHours()>20) {
    wx.showToast({
      title: '营业时间09:00~21:00',
      icon:'none'
    })
    return 
   }

    let that = this
    if (this.data.addressInfo.latitude&&this.data.addressInfo.longitude) {
      let dis = this.getMapDistance(this.data.addressInfo.latitude,this.data.addressInfo.longitude,getApp().globalData.busShopInfo.latitude,getApp().globalData.busShopInfo.longitude)
      console.log('距离============' + dis)
      this.setData({
        distance:dis
      })
      if (dis > getApp().globalData.busShopInfo.serviceDistance) {
        wx.showModal({
          title: '提示',
          content: '超出配送范围需到店自提',
          confirmText:'继续下单',
          cancelText:'取消',
          success: (res) => {
            if (res.confirm) {
              if(this.data.orderNum==''){
                this.setData({
                  orderNum:this.getOrderCode()
                })
              }
                that.createOrder()
            }
          },
        });
        return
      }
    }else{
      wx.showToast({
        title: '请选择地址~',
        icon:'none'
      })
      return
    }

    if(this.data.orderNum==''){
      this.setData({
        orderNum:this.getOrderCode()
      })
    }
      this.createOrder()
  },

  createOrder(){
    let that = this
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
        that.data.addressInfo.latitude = res.latitude
        that.data.addressInfo.longitude = res.longitude
        console.log(res)
        that.setData({
          addressInfo:that.data.addressInfo
        })
      }
     })
  },
 /*
  计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  默认单位km
 */
  getMapDistance(la1,lo1,la2,lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;//地球半径
    s = Math.round(s * 10000) / 10000;
    console.log("计算结果",s);
    return s;
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