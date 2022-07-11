// pages/shopInfoEdit/shopInfoEdit.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopInfo:getApp().globalData.busShopInfo
    })
  },

  onChange({ detail }) {
    wx.showModal({
      title: '提示',
      content: '是否变更店铺活动状态？',
      success: (res) => {
        if (res.confirm) {
          this.data.shopInfo.activityState = this.data.shopInfo.activityState==1?0:1
          this.setData({
            shopInfo:this.data.shopInfo
          })
        }
      },
    });
  },

  valueChange(e){
    if(e.currentTarget.id=='name'){
      this.data.shopInfo.name = e.detail
    }else if(e.currentTarget.id=='phone'){
      this.data.shopInfo.phone = e.detail
    }else if(e.currentTarget.id=='address'){
      this.data.shopInfo.address = e.detail
    }else if(e.currentTarget.id=='time'){
      this.data.shopInfo.time = e.detail
    }else if(e.currentTarget.id=='serviceAddress'){
      this.data.shopInfo.serviceAddress = e.detail
    }else if(e.currentTarget.id=='serviceDistance'){
      this.data.shopInfo.serviceDistance = e.detail 
    }else if(e.currentTarget.id=='servicePrice'){
      this.data.shopInfo.servicePrice = e.detail 
    }
    this.setData({
      shopInfo:this.data.shopInfo
    })
  },

  chooseImg(){
    let that = this
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
        count: 1, 
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res){
          // 获取成功,将获取到的地址赋值给临时变量
          var tempFilePaths = res.tempFilePaths;
          that.uploadFile(tempFilePaths[0]);
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
  },
  goShopActivity(){
    wx.navigateTo({
      url: '../shopActivity/shopActivity',
    })
  },
  chooseAddress(){
    let that = this
    wx.chooseLocation({
      success (res) {
        that.data.shopInfo.latitude = res.latitude
        that.data.shopInfo.longitude = res.longitude
        console.log(res)
        that.setData({
          shopInfo:that.data.shopInfo
        })
      }
     })
  },

  //上传操作
  uploadFile(path) {
    let that = this
    wx.showLoading({
      title: '',
      mask:true
    })
    wx.cloud.uploadFile({
      cloudPath: Date.parse(new Date())+'shop_banner.png', // 文件名
      filePath: path, // 文件路径
      success: res => {
        wx.hideLoading()
        that.data.shopInfo.imgUrl = res.fileID
        that.setData({
          shopInfo:that.data.shopInfo
        })
      },
      fail: err => {
        wx.hideLoading()
      }
    })
  },
  save(){
    if(this.data.shopInfo.name&&this.data.shopInfo.phone&&this.data.shopInfo.address&&this.data.shopInfo.time&&this.data.shopInfo.serviceAddress&&this.data.shopInfo.imgUrl&&this.data.shopInfo.serviceDistance&&this.data.shopInfo.latitude&&this.data.shopInfo.longitude){
      let that = this
      let map={};
      Object.keys(this.data.shopInfo).forEach(function (key) {
        if(key!='_id'){
          map[key] = that.data.shopInfo[key]
        }
       })
      wxCloudAPI.request({
        showLoading:true,
        name:'shopInterface',
        data:{
          type: 'busChangeShopInfo',
          id:this.data.shopInfo._id,
          data:map
        },
        success(resp){
          wx.showToast({
            title: '保存成功',
            icon:'none',
            success(){
              setTimeout(() => {
                wx.navigateBack()
              }, 2000);
            }
          })
          
        },
      })

    }else{
      wx.showToast({
        title: '请先完善店铺信息',
        icon:'none'
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