// pages/addShopFood/addShopFood.js
const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kindId:'',
    kindInfo:{},
    foodInfo:{
      state:1
    },
    list:[],
    columns: [],
    index:0
  },



  getList(){
    let that = this
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busGetFoodKindList',
        pageNum:0,
        pageSize:100
      },
      success(resp){
          that.setData({
            list:resp.data
          })
          if(that.data.kindId==''||that.data.kindId=='undefined'){
            that.setData({
              kindInfo:that.data.list[0],
              kindId:that.data.list[0]._id
            })
          }
          for(let i=0;i<that.data.list.length;i++){
            let kind = that.data.list[i]
            if(kind._id==that.data.kindId){
              that.setData({
                index:i,
                kindInfo:kind,
              })
            }
            that.data.columns.push(kind.name)
          }
          that.setData({
            columns:that.data.columns
          })
      },
    })
  },

  valueChange(e){
    if(e.currentTarget.id=='name'){
      this.data.foodInfo.name = e.detail
    }else if(e.currentTarget.id=='price'){
      this.data.foodInfo.price = e.detail
    }else if(e.currentTarget.id=='saleCount'){
      this.data.foodInfo.saleCount = e.detail
    }
    this.setData({
      footKind:this.data.footKind
    })
  },

  save(){
    let that = this
    this.data.foodInfo.kindId = this.data.kindId
    wxCloudAPI.request({
      showLoading:true,
      name:'shopInterface',
      data:{
        type: 'busAddFood',
        data:this.data.foodInfo
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

  bindPickerChange(e){
    console.log(e.detail.value);
    this.setData({
      kindId:this.data.list[e.detail.value]._id,
      kindInfo:this.data.list[e.detail.value],
      index:e.detail.value
    })
  },

  onStateChange({ detail }) {
    wx.showModal({
      title: '提示',
      content: '是否切换品类状态？',
      success: (res) => {
        this.data.foodInfo.state = this.data.foodInfo.state ==0 ?1:0
        if (res.confirm) {
          this.setData({ foodInfo: this.data.foodInfo });
        }
      },
    });
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

  //上传操作
  uploadFile(path) {
    let that = this
    wx.showLoading()
    wx.cloud.uploadFile({
      cloudPath: Date.parse(new Date())+'.png', // 文件名
      filePath: path, // 文件路径
      success: res => {
        wx.hideLoading()
        that.data.foodInfo.imgUrl = res.fileID
        that.setData({
          foodInfo:that.data.foodInfo
        })
      },
      fail: err => {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.kindId!='undefined'){
      this.setData({
        kindId:options.kindId,
      })
    }
    let data = options.food
    if(data!='undefined'){
      let item = JSON.parse(data)
      console.log(item.kindId)
      this.setData({
        foodInfo:item,
        kindId:item.kindId,
      })
     
    }
    this.getList()
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