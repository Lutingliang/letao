$(function(){
var pageSize = 5
render(1)

$('.btn_add').on('click',function(){
    $('#addModal').modal('show');
})

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
//  给表单注册表单校验成功的事件
$form.on('success.form.bv',function(e){
    // 阻止浏览器的默认行为
    e.preventDefault();
    $.ajax({
        type:'post'
        ,url:'/category/addTopCategory'
        ,data:$form.serialize()
        ,success:function(info){
          console.log(info);
          if(info.success){
              $('#addModal').modal('hide')
              $form.data('bootstrapValidator').resetForm(true)
              render(1)
          }
          
        }
    })
    

})




function render(page){

$.ajax({
    type:'get'
    ,url:'/category/queryTopCategoryPaging'
    ,data:{
        page:page
        ,pageSize:pageSize
    }
    ,success:function(info){
        // console.log(info);
        $('tbody').html(template('tpl',info))
        paginator(info,render)
    }
})

}

})