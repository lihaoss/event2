$(function(){
  //点击 注册账号 的链接
  $('#link_reg').on('click',function(){
  $('.login-box').hide()
  $('.reg-box').show()
  })

  //点击“去登录”的链接
  $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()

  })
  //从layui中获取form对象
  let form = layui.form
  let layer = layui.layer
  //通过form.verity()函数自定义校验规则
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    repwd:function(value){
      let pwd =$('.reg-box [name=password]').val()
      if(pwd!==value){
        return '两位密码不一致'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    $.ajax({
      type:'POST',
      url:'/api/reguser',
      data:{
     username:$('#form_reg [name=username]').val(),
     password:$('#form_reg [name=password]').val()
      },
      success(res){
        if(res.status!==0){
          // return console.log(res.message);
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        $('#link_login').click()
      }
    })
  })
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/api/login',
      //快速获取表单中的元素
      data:$(this).serialize(),
      success(res){
        if(res.status !==0){
          return layer.msg(res.message)
        }
        layer.msg('登录成功')
        // console.log(res.token);
        localStorage.setItem('token',res.token)
        //跳转到后台页面
        location.href='/index.html'
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcwNTIsInVzZXJuYW1lIjoibGloYW8iLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2MzU5NDI3NiwiZXhwIjoxNjYzNjMwMjc2fQ.QxWMbd9vcfJL2TemNaZh7U2iStgbbN1H02ndP-Q6A3E
      }
    })
  })
})