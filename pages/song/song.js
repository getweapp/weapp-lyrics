Page({
  data:{
    songTitle:'',
    songText:'',
    songTexts:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    wx.request({
      url: 'https://api.getweapp.com/vendor/baidu/ting?method=baidu.ting.song.lry&songid=' + options.id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        //console.log(res)
        if(!res.data.error_code){ //当歌词查询成功
          var t = [];
          if(res.data.lrcContent)
            t = res.data.lrcContent.split('\n')
          that.setData({
           songTitle:res.data.title,
           songText:res.data.lrcContent,
           songTexts: t
         })
        }else{ // 歌词查询出错
          that.setData({
           songTitle:"歌曲信息错误",
           songText:"查询歌词失败"
           })
        }
        
      },
      fail: function() {
        that.setData({
           songTitle:"歌曲信息错误",
           songText:"查询歌词失败"
           })
      }
    })
  }
})