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
            // console.log(info);
            $('.dropdown-menu').html(template('tpl1',info))
        }
    })
})

// 一级分类选择功能
$('.dropdown-menu').on('click','li',function(){
    var id = $(this).data('id')
    // console.log($(this).children());
    // 修改按钮的内容
    $('.dropdown-text').text($(this).children().text())
    // 动态修改name = categoryId 的value
    $('[name=categoryId]').val(id)
    // 手动修改 一级分类校验成功
    $form.data('bootstrapValidator').updateStatus('categoryId', 'VALID') 
})
$('#file').fileupload({
    done: function(e,data){
        // console.log(data);
        var  result = data.result.picAddr
        $('.img_box img').attr('src',result)
        $('[name=brandLogo]').val(result)
        // console.log($('[name=brandLogo]'));
        $form.data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
})
var $form = $('form')
$form.bootstrapValidator({
    excluded: []
    ,fields:{
        categoryId:{
            validators:{
                notEmpty:{
                    message:'请选择一个一级分类'
                }
            }
        }
        ,brandName:{
            validators:{
                notEmpty:{
                    message:'请选择二级分类名称'
                }
            }
        }
        ,brandLogo:{
            validators:{
                notEmpty:{
                    message:'请上传一个分类的图片'
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
        ,url:'/category/addSecondCategory'
        ,data:$form.serialize()
        ,success:function(info){
            if(info.success){
                // 隐藏模态框
                $('#addModal').modal('hide')
                // 重置表单样式
                $form.data('bootstrapValidator').resetForm(true)
                page = 1 
                render(page)
            }

        }
    })
    
    

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