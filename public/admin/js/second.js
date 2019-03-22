$(function(){
var pageSize = 5

render(1)

$('.btn-add').on('click',function(){
    $('#addModal').modal('show')

    // 动画渲染一级分类 发送ajax请求 获取所有的一级分类
    $.ajax({
        type: 'get'
        ,url: '/category/queryTopCategoryPaging'
        ,data:{
           page:1
           ,pageSize : 100 
        }
        ,success:function(info){
            console.log(info);
            $('.dropdown-menu').html(template('tpl1',info))
        }
    })
})

$('.dropdown-menu').on('click','li',function(){
    var id = $(this).data('id')
    console.log($(this).children());
    $('.dropdown-text').text($(this).children().text())
    
})











function render(page){
    $.ajax({
        type:'get'
        ,url:'/category/querySecondCategoryPaging'
        ,data:{
            page : page
            ,pageSize : pageSize 
        }
        ,success:function(info){
            // console.log(info);
            $('tbody').html(template('tpl',info))
            paginator(info,render)
        }
    })
}











})