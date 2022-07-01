// pages/min/min.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInfo:false,
    userInfo:{},
    shopInfo:{},
    isShop:false
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
    this.setData({
      isShop:wx.getStorageSync('isShopId')
    })
  },

  onChange({ detail }) {
    wx.showModal({
      title: '提示',
      content: '是否变更店铺营业状态？',
      success: (res) => {
        if (res.confirm) {
          this.chageShopState()
        }
      },
    });
  },

  chageShopState(){
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busChangeShopInfo',
        id:this.data.shopInfo._id,
        data:{
          state:this.data.shopInfo.state == 0? 1:0
        }
      },
      success(resp){
        that.data.shopInfo.state = that.data.shopInfo.state == 0? 1:0
        that.setData({
          shopInfo:that.data.shopInfo
        })
      },
    })

  },

  getShopInfo(){
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busGetShopInfo',
        id:'6842667962a43f0105787b6b3bd234d1',
      },
      success(resp){
        that.setData({
          shopInfo:resp.data
        })
      },
      fail(resp){
        if(resp.code=='001'){
          that.setData({
            shopInfo:{}
          })
          wx.removeStorage({
            key: 'shopInfo',
          })
        }
      }
    })
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
    if(this.data.isShop){
      getApp().globalData.busShopInfo = this.data.shopInfo
      let url;
      if(e.currentTarget.dataset.type=='1'){
        url = '../shopInfoEdit/shopInfoEdit'
      }else if(e.currentTarget.dataset.type=='2'){
        url='../shopOrderManager/shopOrderManager';
      }else if(e.currentTarget.dataset.type=='3'){
        url = '../shopFoodKindManager/shopFoodKindManager'
      }else if(e.currentTarget.dataset.type=='4'){
        url = '../shopFoodManager/shopFoodManager'
      }
      wx.navigateTo({
        url: url,
      })
    }else{
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
    if (this.data.isShop) {
      this.getShopInfo()
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
})