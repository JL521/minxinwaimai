// pages/shopFoodManager/shopFoodManager.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kindId:'',
    list:[],
    pageNum:0,
    pageSize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.kindId){
      this.setData({
        kindId:options.kindId
      })
    }
  },

  getList(){
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busGetFoodList',
        pageNum:this.data.pageNum,
        pageSize:this.data.pageSize,
        kindId:this.data.kindId
      },
      success(resp){
        wx.stopPullDownRefresh()
        if(that.data.pageNum==0){
          that.setData({
            list:resp.data
          })
        }else{
          that.data.list = that.data.list.concat(resp.data)
          that.setData({
            list:that.data.list
          })
        }
        
      },
    })
  },

  onPullDownRefresh:function(){
    this.data.pageNum = 0
    this.setData({
      pageNum:0
    })
    this.getList()
  },

  onReachBottom(){
    this.data.pageNum++
    this.setData({
      pageNum:this.data.pageNum
    })
    this.getList()
  },

  addKind(e){
    let data;
    if(e.currentTarget.dataset.item){
      data = JSON.stringify(e.currentTarget.dataset.item)
    }
    wx.navigateTo({
      url: '../addShopFood/addShopFood?kindId='+this.data.kindId+'&food='+data,
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
    this.data.pageNum = 0
    this.setData({
      pageNum:0
    })
    this.getList()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})