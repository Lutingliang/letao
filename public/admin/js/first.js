$(function(){
var pageSize = 5

render(1)

// 给按钮注册点击事件 点击显示模态框
$('.btn_add').on('click',function(){
    $('#addModal').modal('show')
})

// 表单校验
var $form = $('form')
$form.bootstrapValidator({
    fields:{
        // 对categoryName进行校验
        categoryName :{
            validators:{
                notEmpty:{
                    message : '一级分类名不能为空'
                }
            }
        }
        
    }
    ,feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-thumbs-down',
        validating: 'glyphicon glyphicon-refresh'
      }
})

$form.on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
        type:'post'
        ,url:'/category/addTopCategory'
        ,data:$form.serialize()
        ,success:function(info){
            if(info.success){
                // 模态框隐藏
                $('#addModal').modal('hide')
                // 重置表单
                $form.data('bootstrapValidator').resetForm(true)
                //重新渲染
                render(1)
            }
        }
    })

})



// 渲染页面
 function render(page){
// 发送ajax请求
     $.ajax({
         type:'get'
         ,url:'/category/queryTopCategoryPaging'
         ,data:{
             page:page
             ,pageSize:pageSize
         }
         ,success:function(info){
             console.log(info);
             // 渲染模板引擎
             $('tbody').html(template('tpl',info))
             // 渲染分页插件
             paginator(info,render) 
         }
     })




 }







})