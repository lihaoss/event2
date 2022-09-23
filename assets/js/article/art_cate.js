$(function () {
  let layer = layui.layer
  let form = layui.form
  initArtCateList()
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        console.log(res);
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  let indexadd = null

  $('#btnAddCate').on('click', function () {
    indexadd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类'
      , content: $('#dialog-add').html()
    });
  })

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    console.log('ok');
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success(res) {
        // console.log(1);
        // console.log(res);
            if(res.status!==0){
           return layer.msg('新增分类失败')
            }
          initArtCateList()
        layer.msg('新增分类成功')
        layer.close(indexadd)
      }
    })
  })
  let indexEidt = null
  $('tbody').on('click','.btn-edit',function(){
    //弹出一个修改文章分类信息的层
    indexEidt = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类'
      , content: $('#dialog-edit').html()
    });
    let id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
      method:'GET',
      url:'/my/article/cates/'+ id,
      success(res){
form.val('form-edit',res.data)
      }
    })
  })
  $('body').on('submit','#form-edit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/article/updatecate',
      data:$(this).serialize(),
      success(res){
        if(res.status!==0){
          return layer.msg('更新数据失败')
        }
        layer.msg('更新数据成功')
        layer.close(indexEidt)
        initArtCateList()

      }
    })
  })
  $('tbody').on('click', '.btn-delete', function() {
    let id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        }
      })
    })
})
})