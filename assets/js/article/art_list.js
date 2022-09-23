$(function(){
  let layer = layui.layer
  let form = layui.form
   let laypage = layui.laypage

  template.defaults.imports.dataFormat = function(data){
    const dt = new Date(Date)
    let y = dt.getFullYear()
    let m = ((dt.getMonth()+1)+'').padStart(2,'0')
    let d = (dt.getDate() + '').padStart(2,'0')
    let hh = (dt.getHours() + '').padStart(2,'0')
    let mm =(dt.getMinutes() +'').padStart(2,'0')
    let ss =(dt.getSeconds() +'').padStart(2,'0')
     return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  //定义一个查询的参数对象
  let q = {
    pagenum:1,//页码值
    pagesize:2,//每页显示的几条数据
    cate_id:'',
    state:'',
  }
  initTable()
  initCate()
  //获取文章列表数据的方法
  function initTable(){
    $.ajax({
      method:'GET',
      url:'/my/article/list',
      data:q,
      success(res){
        console.log(res);
        if(res.status !==0){
          return layer.msg('获取文章列表失败')
        }
        //使用模板引擎渲染页面数据
      let htmlStr = template('tpl-table',res)
      $('tbody').html(htmlStr)
      // console.log(htmlStr);
      renderPage(res.total)
      }
    })
  }
 function initCate(){
  $.ajax({
    method:'GET',
    url:'/my/article/cates',
    success(res){
      if(res.status!==0){
        return layer.msg('获取分类数据失败')
      }
      //调用模板引擎
      let htmlStr = template('tpl-cate',res)
      console.log(htmlStr);
      $('[name=cate_id]').html(htmlStr)
      
       form.render()
    }
  })
 }
 $('#form-search').on('submit',function(e){
  e.preventDefault()
  let cate_id = $('[name=cate_id]').val()
  let state = $('[name=stated]').val()
  q.cate_id = cate_id
  q.state = state
  initTable()
 })
 function renderPage(total){
   laypage.render({
    elem:'pageBox',//分页容器的ID
    count:total,//总数据条数
    limit:q.pagesize,//每页显示几条数据
    curr:q.pagenum,//设置默认被选中的分页
    layout:['count','limit','prev','page','next','skip'],
    limits:[2,3,5,10],
    jump:function(obj,first){
     q.pagenum = obj.curr
    //  
    q.pagesize = obj.limit
    if(!first){
      initTable() 
    }
    }
   })
 }
 //通过代理的形式，为删除按钮绑定点击事件处理函数
 $('tbody').on('click','.btn-delete',function(){
  let len = $('.btn-delete').length
   
  let id =$(this).attr('data-id')
  layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
   $.ajax({
 method:'GET',
 url:'/my/article/delete/' + id,
 success(res){
  if(res.status!==0){
    return layer.msg('删除文章失败')
  }
  layer.msg('删除文章成功')


  if(len ===1){
    q.pagenum = q.pagenum === 1?1:q.pagenum - 1
  }
  initTable()
 }
   })
    
    layer.close(index);
  });
 })
})