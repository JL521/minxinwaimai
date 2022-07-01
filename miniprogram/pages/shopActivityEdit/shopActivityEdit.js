// pages/shopActivityEdit/shopActivityEdit.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.activity
    if(data!='undefined'){
      this.setData({
        activity:JSON.parse(data)
      })
    }
  },

  valueChange(e){
    if(e.currentTarget.id=='maxPrice'){
      this.data.activity.maxPrice = e.detail
    }else if(e.currentTarget.id=='disPrice'){
      this.data.activity.disPrice = e.detail
    }
    this.setData({
      activity:this.data.activity
    })
  },

  addActivity(){
    this.data.activity.maxPrice = this.data.activity.maxPrice - 0
    this.data.activity.disPrice = this.data.activity.disPrice - 0
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busAddActivity',
        data:this.data.activity
      },
      success(resp){
        wx.showToast({
          title: '保存成功',
          success(){
            setTimeout(() => {
              wx.navigateBack()
            }, 2000);
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
  return {
    title:'平阴民心外卖',
    path:'pages/demo/demo',
    imageUrl:'../../images/share.png'
  };
},
})