const wxCloudAPI = require('../../wx_cloud_api/wxCloudAPI')

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selectList:[],
    totalCount:0,
    totalPrice:0,
    disPrice:0,
    shopInfo:{},

    scrollTops: 0,  
    tabCur: 0, 
    rightCur: 0, 
    show:false
  },

  getShopInfo(res){
    let that = this
    wxCloudAPI.request({
      showLoading:false,
      name:'shopInterface',
      data:{
        type: 'busGetShopInfo',
        id:'6842667962a43f0105787b6b3bd234d1',
      },
      success(resp){
        that.setData({
          shopInfo:resp.data
        })
        getApp().globalData.busShopInfo = that.data.shopInfo
      }
    })
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

  onLoad(options) {
  },

  getfoods(){
    let that = this
    wxCloudAPI.request({
      showLoading:false,
      name:'footInterface',
      data:{
        type:'footList'
      },
      success(result){
        let arr = []
      for(let i=0;i<result.data.length;i++){
        let item = result.data[i]
        for(let j=0;j<item.list.length;j++){
          let data = item.list[j]
          data.num = 0
          data.index = i
          data.indexs = j
        }
        if(item.list.length>0){
          arr.push(item)
        }
      }
      that.setData({
        list:arr
      })
      console.log('foots ============' ,that.data.list)
      }
    })  
  },

  onShow(){
    let cars = getApp().globalData.cars;
    if(cars==undefined||cars.length==0){
      for(let i=0;i<this.data.list.length;i++){
        let item = this.data.list[i]
        for(let j=0;j<item.list.length;j++){
          let data = item.list[j]
          data.num = 0
          this.data.list[i].list[j] = data
        }
      }
      this.setData({
        list:this.data.list,
        selectList:[],
        totalPrice:0,
        disPrice:0,
        totalCount:0
      })
      this.getfoods()
    }
    this.getShopInfo()
  },

  add(e){
    var data = e.currentTarget.dataset.item
    if(e.detail.type==0){
      data = e.detail.item
    }
    data.num = data.num + 1
    let isHave = false
    let tcount = 0
    let tprice = 0
    for(let i=0;i<this.data.selectList.length;i++){
      let e = this.data.selectList[i]
      if(e._id == data._id){
        isHave = true
        tcount = tcount + data.num
        tprice = tprice + data.num * data.price
        this.data.selectList[i] = data
      }else{
        tcount = tcount + e.num
        tprice = tprice + e.num * e.price
      }
    }

    
    this.data.list[data.index].list[data.indexs] = data
    if(!isHave){
      this.data.selectList.push(data)
      tcount = tcount + 1
      tprice = tprice + data.num * data.price
      console.log('selestlist====',this.data.selectList)
    }
    let disP = 0;
    if (this.data.shopInfo.activities) {
      for(let i=0;i<this.data.shopInfo.activities.length;i++){
        if (tprice >= this.data.shopInfo.activities[i].maxPrice) {
          disP = this.data.shopInfo.activities[i].disPrice
        }
      }
    }
    tprice = tprice - disP
    this.setData({
      selectList:this.data.selectList,
      list:this.data.list,
      totalCount:tcount,
      totalPrice:tprice,
      disPrice:disP
    })
  },
  del(e){
    var data = e.currentTarget.dataset.item
    if(e.detail.type==0){
      data = e.detail.item
    }
    if(data.num<1){
      return;
    }
    data.num = data.num-1
    for(let i=0;i<this.data.selectList.length;i++){
      if(this.data.selectList[i]._id==data._id){
        this.data.list[data.index].list[data.indexs] = data
        this.data.selectList[i] = data
        if(data.num<1){
          this.data.selectList.splice(i,1)
        }
        this.setData({
          selectList:this.data.selectList,
          list:this.data.list,
          totalCount:this.data.totalCount-1,
        })
        break
      }
    }

    let tprice = 0;
    for(let i=0;i<this.data.selectList.length;i++){
      let e = this.data.selectList[i]
      tprice = tprice + e.num * e.price
    }

    let disP = 0;
    if (this.data.shopInfo.activities) {
      for(let i=0;i<this.data.shopInfo.activities.length;i++){
        if (tprice >= this.data.shopInfo.activities[i].maxPrice) {
          disP = this.data.shopInfo.activities[i].disPrice
        }
      }
    }
    tprice = tprice - disP

    this.setData({
      totalPrice:tprice,
      disPrice:disP
    })

    if(this.data.selectList.length<=0){
      this.setData({show:false})
    }
  },
  goShopCar(){
    if(this.data.selectList.length<=0)return
    let s = !this.data.show
    this.setData({
      show:s
    })
  },
  goOrder(){
    if(this.data.selectList.length<1){
      return;
    }
    if(this.data.shopInfo.state!=1){
      wx.showModal({
        showCancel:false,
        confirmText:'确定',
        title:'提示',
        content:'店家休息中,请稍后再来~，'
      })
      return
    }
    if (this.data.totalPrice<this.data.shopInfo.servicePrice) {
      wx.showToast({
        title: '最低￥'+this.data.shopInfo.servicePrice+'起送',
        icon:'none'
      })
      return;
    }
    getApp().globalData.cars = this.data.selectList
    wx.navigateTo({
      url: '../order/order?totalPrice='+this.data.totalPrice,
    })
  },
  goShop(){
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  // 切换左边菜单并联动右边
  tabNav(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      tabCur: index,
      rightCur: index,
      // 实现左边自动滑动到某个位置 4表示自动滑动到 第五项 （4为索引值）
      scrollTops: (index - 4) * 50
    })
  },
  /**
   * 滑动右边对应左边菜单切换
   * 1、拿到该元素的高度，设定它的top和bottom
   * 2、判断滑动的距离是否大于 设定的top并小于设定的bottom，然后对应左边菜单的滑动
   */
  scrollLink(e) {
    // console.log(e);
    let list = this.data.list
    let itemHeight = 0;
    for (let i = 0; i < list.length; i++) {
      //拿到每个元素
      let els = wx.createSelectorQuery().select("#scroll-" + i);
      els.fields({
        size: true
      }, function (res) {
        list[i].top = itemHeight; // 节点顶部位置
        itemHeight += res.height;// 节点高度
        list[i].bottom = itemHeight;//节点底部位置
      }).exec()
    }
    this.setData({
      list:list
    })
    let scrollTop = e.detail.scrollTop;     // 拿到滚动的高度
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        this.setData({
          tabCur: i,
          scrollTops: (i - 4) * 50
        })
        return false
      }
    }
  }
})

