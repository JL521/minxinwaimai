// pages/shopFoodKindManager/shopFoodKindManager.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageNum:0,
    pageSize:10
  },


  kindFoots(e){
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../shopFoodManager/shopFoodManager?kindId='+data._id,
    })
  },

  delKind(e){
    let that = this
    let data = e.currentTarget.dataset.item
    wx.showModal({
      title: '提示',
      content: '删除品类后，品类下菜品将不再显示',
      confirmText:'删除',
      cancelText:'取消',
      success: (res) => {
        if (res.confirm) {
          wxCloudAPI.request({
            showLoading:true,
            name:'shopInterface',
            data:{
              type: 'busDelFoodKind',
              id:data._id
            },
            success(resp){
              that.data.pageNum = 0
              that.setData({
              pageNum:0
             })
             that.getList()
            },
          })
        }
      },
    });
   
  },

  addKind(e){
    let data;
    if(e.currentTarget.dataset.item){
      data = JSON.stringify(e.currentTarget.dataset.item)
    }
    
    wx.navigateTo({
      url: '../addShopFoodKind/addShopFoodKind?kind='+ data,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  getList(){
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busGetFoodKindList',
        pageNum:this.data.pageNum,
        pageSize:this.data.pageSize
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
    this.data.pageNum = 0
    this.setData({
      pageNum:this.data.pageNum
    })
    this.getList()
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pageNum++
    this.setData({
      pageNum:this.data.pageNum
    })
    this.getList()
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