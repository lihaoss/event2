$(function(){
  let layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
// 纵横比
aspectRatio: 1,
// 指定预览区域
preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)

$('#btnChooseImage').on('click',function(){
  $('#file').click()
})
//文件选择框绑定change事件
$('#file').on('change',function(e){
  let fileList = e.target.files
  if(fileList.length === 0){
    return layer.msg('请选择图片')
  }
  let file = e.target.files[0]
  let imgURL = URL.createObjectURL(file)
  $image
.cropper('destroy') // 销毁旧的裁剪区域
.attr('src', imgURL) // 重新设置图片路径
.cropper(options) // 重新初始化裁剪区域

})
$('#btnUpload').on('click',function(){
  var dataURL = $image
.cropper('getCroppedCanvas', {
// 创建一个 Canvas 画布
width: 100,
height: 100
})
.toDataURL('image/png')
$.ajax({
  method:'POST',
  url:'/my/update/avatar',
  data:{
    avatar:dataURL
  },
  success(res){
    if(res.status!==0){
      return layer.msg('更换头像失败')
    }
    layer.msg('更换头像成功')
    console.log(123);
    window.parent.getUserInfo()
  }
})
})
})