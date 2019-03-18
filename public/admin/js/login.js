$(function () {
    var $form = $('#form');
    $form.bootstrapValidator({
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    }
                    ,stringLength:{
                        min:3,
                        max:9,
                        message:'用户名长度必须3-9位'
                    }
                
                }
            }
            ,password:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    }
                    ,stringLength:{
                        min:6,
                        max:9,
                        message:'密码长度必须是6-12位'
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
        // 阻止浏览器的默认行为
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data: $form.serialize(),
            success : function(info){
                // console.log(info);
                if(info.error === 1000){
                    alert('用户名不存在')
                }
                if(info.error === 1001){
                    alert('密码错误')
                }
                if(info.success){
                    // 登录成功跳转
                    location.href = "index.html"
                }
            }
        })

    })
    
  
    
})