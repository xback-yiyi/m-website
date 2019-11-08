import ziruView from '../views/ziru.art'
import Swiper from 'swiper';    


class Ziru{
    render(){
        let ziruHtml=ziruView({});
        $('header').css('display','none');
        $('main ul').html(ziruHtml);
        let mySwiper = new Swiper('.swiper-container', { 
            direction: 'horizontal',
            loop: true, // 循环模式选项
            autoplay:true,
            autoplay:{

                disableOnInteraction: false
           
           },
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            },
        });
    }
    renderer(){
        
    }
}

export default new Ziru();