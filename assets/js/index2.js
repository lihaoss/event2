$(function(){
  getUserInfo()
  let layer = layui.layer
  $('#btnLogout').on('click',function(){
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'},
     function(index){
      //1.清空本地存储
      localStorage.removeItem('token')
      //2.重新跳转登录页面
      location.href = '/login2.html'
      
      layer.close(index);
    });
  })





  function getUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      //请求头配置对象
      // headers:{
      //   Authorization:localStorage.getItem('token') || ''
      // },
      success(res){
        if(res.status !==0){
          return layui.layer.msg('获取信息失败')
        }
        renderAvatar(res.data)
      },
  //     complete:function(res){

  //   console.log(res);
  //   if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！'){
  //  localStorage.removeItem('token')
  //  location.href = '/login2.html'
  //   }
  //     }
    })
  }
  //渲染用户的头像
function renderAvatar(user){
  //用户名称
  let name = user.nickname || user.username
  //欢迎的文本
  $('#welcome').html(`欢迎  ${name}`)
 //按需渲染用户的头像
  if(user.user_pic!==null){
    //渲染图片头像
      $('.layui-nav-img').attr('src',user.user_pic).show()
      $('.text-avatar').hide()
  }else{
   //渲染文本头像
   $('.layui-nav-img').hide()
   let first = name[0].toUpperCase()
   $('.text-avatar').html(first).show()
  }
}















})