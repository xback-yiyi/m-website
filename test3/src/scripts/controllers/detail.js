import detailView from '../views/detail.art';
import guessView from '../views/guess.art'
import detailModel from '../models/detaillist'
import guessModel from '../models/guess'


class Detail{
    

    // render(){
    //     let html=detailView();
    //     $('header').css('display','none');
    //     $('footer').css('display','none');

    //     $('main ul').html(html)
    // }
    async render(){
        let hash=location.hash.substr(1);
        let reg=new RegExp(/(\d+)/,'g')
        let id=reg.exec(hash)[1];

        let result=await detailModel.get({
            id:id
        })
        console.log(result);

        let html=detailView({
           result
        });
        $('header').css('display','none');
        $('footer').css('display','none');
        $('main ul').html(html);
        

        let house_id=result.data.house_id;
        let result2=await guessModel.get({
            id:id,
            house_id:house_id
        })

        let list=result2.data;
        let html2=guessView({
           list
        });
        console.log(list)
        $('.detail-guess').html(html2);
        
        console.log($('#room'))
        $('#room .room-name').children().eq(0).addClass('active');
        $('#room .room-in').eq(0).addClass('now');
        $('#room p').eq(0).addClass('show');

        

        $('#room .room-name li').on('tap',function(ev){
            $(this).addClass('active').siblings().removeClass('active');
            let index=$(this).index();
            console.log(index)
            $(this).parent().siblings('ul').eq(index).addClass("now").siblings().removeClass('now');
            $(this).parent().siblings('p').eq(index).addClass("show").siblings().removeClass('show')
        })

        let resblock_id=result.data.resblock.id;
        // let result3=await resblockModel.get({
        //     resblock_id:resblock_id
        // })

        $('.detail-banner .yo-ico').on('tap',function(){
            window.history.go(-1)
        })        

        $('#resblock').on('tap',function(){
            
            location.hash=`resblock/${resblock_id}`
            // let html3=resblockView({
            //     result3
            //  })
            //  $('main ul').html(html3)
        })
    }
}

export default new Detail;