// pages/addShopFoodKind/addShopFoodKind.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    footKind: {
      state:1
    },
  },

  valueChange(e){
    if(e.currentTarget.id=='name'){
      this.data.footKind.name = e.detail
    }
    this.setData({
      footKind:this.data.footKind
    })
  },

  save(){
    if(!this.data.footKind.name){
      wx.showToast({
        title: '请输入品类名称',
        icon:'none'
      })
      return
    }
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busAddFootKind',
        data:this.data.footKind
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

  },

  onChange({ detail }) {
    wx.showModal({
      title: '提示',
      content: '是否切换品类状态？',
      success: (res) => {
        this.data.footKind.state = this.data.footKind.state ==0 ?1:0
        if (res.confirm) {
          this.setData({ footKind: this.data.footKind });
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.kind
    if(data!='undefined'){
      this.setData({
        footKind:JSON.parse(data)
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

  }
})