// 实现公共部分的功能
// 什么时候开始 什么时候停
// 当ajax请求开始的时候显示进度条
// 当ajax请求结束的时候影藏进度条
// jqery.ajax的全局事件
// jquer的全局事件会在任意一个ajax请求执行的时候触发
// 6个全局事件
// ajaxStart 开始进度条
// ajaxSend :
// ajaxSuccess :
// ajaxError :
// ajaxComplete
// ajaxStop: 结束进度条
// NProgress.start()
// NProgress.done()

$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500)
})

// 二级菜单的显示和隐藏
$('.second').prev().on('click', function () {
    $(this).next().stop().slideToggle()
})

$('.topbar .left').click(function () {
    $('.lt_aside,.lt_main,.topbar').toggleClass('now')
})


$('.topbar .right').on('click', function () {
    $('#logoutModal').modal('show')
})

$('.confirm').on('click', function () {
    $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        success: function (info) {


            if (info.success) {
                location.href = 'login.html'
            }
        }
    })
})

// 分页插件封装函数
function paginator(info, render) {
    $('#paginator').bootstrapPaginator({
        // bootstrap 版本
        bootstrapMajorVersion: 3
        //大小
        ,size: 'normal'
        //当前页
        ,currentPage : info.page
        //总页数
        ,totalPages : Math.ceil(info.total / info.size)
        //显示多少页
        ,numberOfPages : 10
        //控制每一个按钮的显示内容
        ,itemTexts : function(type,page,current){
            switch(type){
                case 'first':
                return '首页'
                case 'prev':
                return '上一页'
                case 'next':
                return '下一页'
                case 'last':
                return '尾页'
                default:
                return page
            }
        }
        // 使用bootstrap的tooltip组件 提示插件
        ,useBootstrapTooltip: true,
        onPageClicked: function(a,b,c,p){
            render(p)
        }
    })
}