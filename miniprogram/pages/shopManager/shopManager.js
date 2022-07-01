// pages/shopManager/shopManager.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   * state: 0 暂停营业 1 营业中
   */
  data: {
    shopInfo:{},
    ispwd:true,
    auidoSrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  toDetail(e){
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
  },

  valueChange(e){
    if(e.currentTarget.id=='name'){
      this.data.shopInfo.name = e.detail
    }else if(e.currentTarget.id=='pwd'){
      this.data.shopInfo.pwd = e.detail
    }
    this.setData({
     shopInfo:this.data.shopInfo
    })
  },

  login(){
    if(!this.data.shopInfo.name||!this.data.shopInfo.pwd){
      wx.showToast({
        title: '请输入用户名密码',
        icon:'none'
      })
      return;
    }
    let that = this
   
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busShopLogin',
        name:that.data.shopInfo.name,
        pwd:that.data.shopInfo.pwd
      },
      success(resp){
        
        that.setData({
          shopInfo:resp.data
        })
        wx.showToast({
          title: '登录成功',
          icon:'none'
        })
      },
    })
    
   
  },

  onClickIcon(){
        this.setData({
          ispwd:!this.data.ispwd
        })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getShopInfo()
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