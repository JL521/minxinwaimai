function request({
   showLoading = false,
   name,data,
   success,fail
}){
  if(showLoading){
    wx.showLoading({
      title: '',
    });
  }
  let map = data
  console.log('请求参数==============',map)
 wx.cloud.callFunction({
    name: name,
    data: map
  }).then((resp) => {
    console.log('返回结果==============',resp.result)
    if(resp.result.code==0){
      success(resp.result)
    }else{
      wx.showToast({
        title: resp.result.msg,
        icon:'none'
      })
      if(fail!=undefined&&fail!=null){
        fail(resp.result)
      }
    }
    wx.hideLoading();
 }).catch((e) => {
   console.log(e)
   if(fail!=undefined&&fail!=null){
    fail(resp.result)
  }
   wx.hideLoading();
  });
}

module .exports = {
  request
  }