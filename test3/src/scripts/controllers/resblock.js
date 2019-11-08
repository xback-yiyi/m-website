import resblockView from '../views/resblock.art'
import resblockModel from '../models/resblock'


class Resblock{
    async render(){
        let hash=location.hash.substr(1);
        let reg=new RegExp(/(\d+)/,'g')
        let resblock_id=reg.exec(hash)[1];
        console.log(resblock_id)
        let result=await resblockModel.get({
            resblock_id:resblock_id
        })
        let html=resblockView({
            result
         })
         console.log(result)
         $('main ul').html(html)
         $('footer').css('display','none')
         $('header').css('display','none')

         $('.resblock-banner .yo-ico').on('tap',function(){
            window.history.go(-1)
        }) 

    }
}
export default new Resblock;