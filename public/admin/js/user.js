$(function(){
    var pageSize = 5;
    render(1);
    var id,isDelete;
    

    // 启用和禁用
    // 1.给启用和禁用注册点击事件
    // 2.弹出模态框
    // 3.给确定注册事件点击事件
    // 4.发送ajax请求 启用获取禁用用户
    $('tbody').on('click','.btn',function(){
        // console.log('哈哈');
        // 弹出模态框
        $('#usermodal').modal('show')
        // 获取到用户的id 以及启用和禁用的状态 this.parentNode.dataset.id
        id = $(this).parent().data('id')
        // console.log($(this).parent().data());
        // isDelete
        isDelete = $(this).hasClass('btn-success') ? 1 : 0
        // console.log(id,isDelete);    
    })
    // 给模态框的update注册点击事件
    $('.update').on('click',function(){
        // console.log('我被点了');
        $.ajax({
            type:'post'
            ,url: '/user/updateUser'
            ,data:{
                id : id
                ,isDelete : isDelete
            }
            ,success : function(info){
                // console.log(info);
                // 关闭模态框
                $('#usermodal').modal('hide')
                // 重新渲染
                render(1)

            }
        })
        
    })
    
    // 渲染
    function render(page){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page: page,
                pageSize: pageSize
            },
            success:function(info){
            //    console.log(info);
            $('tbody').html(template('user-tpl',info));
            paginator(info,render);
            }
        })
    }
})
















