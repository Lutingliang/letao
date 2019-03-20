// 实现公共部分的功能

// NProgress.start();


// NProgress.done();

$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500)   
})