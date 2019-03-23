$(function () {
    var pageSize = 5
    var page1 = 1;

    render(1)
    var id,isDelete

    $('tbody').on('click','.btn',function(){
        // 弹出模态框
        $('userModal').modal('show')
        id = $(this).parent().data('id')
        isDelete = $(this).hasClass('btn-success') ? 1 : 0 
    })

    $('.update').on('click',function(){
        $.ajax({
            type:'post'
            ,url:'/user/updateUser'
            ,data:{
                id : id 
                ,isDelete : isDelete
            }
            ,success : function(info){
                $('#usermodal').modal('hide')
                render(1)
            }
        })



    })







    function render(page) {
        $.ajax({
            type:'get'
            ,url:'/user/queryUser'
            ,data:{
                page : page
                ,pageSize : pageSize
            }
            ,success : function(info){
                console.log(info);
                $('tbody').html(template('user-tpl',info))
                paginator(info,render)
                page1 = page;
            }
        })
    }









})