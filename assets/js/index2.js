$(function(){
  getUserInfo()
  function getUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      //请求头配置对象
      headers:{
        Authorization:localStorage.getItem('token') || ''
      },
      success(res){
        console.log(res);
      }
    })
  }
})