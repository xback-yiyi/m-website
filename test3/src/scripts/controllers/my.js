import ziruView from '../views/my.art'

class Person{
    render(){
        let myHtml=ziruView({});
        $('header').css('display','none');
        $('main ul').html(myHtml);

        this.renderer();
    }
    renderer(){
        console.log( $('.login-in'))
        $('.login-in').on('tap',function(){
            console.log(1)
            $(this).addClass('active').siblings().removeClass('active');
            $('.my-text2').addClass('my-show').siblings().removeClass('my-show');
        })
        $('.login-on').on('tap',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('.my-text1').addClass('my-show').siblings().removeClass('my-show');
        })

        $('.my-password').on('focus',function(){
            $('.my-text2 p').show()
        })
        $('.my-password').on('blur',function(){
            $('.my-text2 p').hide()
        })

        $('.my-password').on('input',function(){
            console.log($(this).val())
            let strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g")  //强
            let mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g")  //中
            let enoughRegex = new RegExp("(?=.{6,}).*", "g") //弱
            if(strongRegex.test($(this).val())){
                $('.my-text2 em').html('强')
            }
            else if(mediumRegex.test($(this).val())){
                $('.my-text2 em').html('中')
            }
            else if(enoughRegex.test($(this).val())){
                $('.my-text2 em').html('弱')
            }
        })

        $('.my-text2 .my-submit').on('tap',function(){
            if(localStorage.getItem($('.my-phone'))){
                console.log('该手机号已被注册')
            }
            else{
                localStorage.setItem($('.my-phone').val(),$('.my-password').val());
                console.log('注册成功');
                $('.my-text2').html(`
                <p style="line-height:1rem;color:#ffa000;font-size:20px;">恭喜你，注册成功</p>
                <span class="my-submit">确定</span>
                `)

            }
            
        })
        $('.my-text1 .my-submit').on('tap',function(){
            if($('.login-password').val()==localStorage.getItem($('.login-phone').val())){
                console.log('登录成功');
                $('.my-text1').html(`
                <p style="line-height:1rem;color:#ffa000;font-size:20px;">恭喜你，登录成功</p>
                <span class="my-submit">确定</span>
                `)
            }
            else{
                console.log('用户名或密码不正确')
            }
        })
    }
}

export default new Person();