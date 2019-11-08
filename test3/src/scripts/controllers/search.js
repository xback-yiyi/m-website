import searchView from '../views/search-list.art'
import searchAllView from '../views/search.art'
import searchMaxView from '../views/search-max.art'

const _=require('lodash')

import searchModel from '../models/postion' 
import search2Model from '../models/searchlist' 
import search3Model from '../models/search-max' 


const BScroll=require('better-scroll')

class Search{
    constructor(){
        this.list=[];
        this.pageNo=1;
        this.pageSize=30;
        this.code='';
        this.price='';
    }

    renderer(list){
        let searchHtml=searchView({
            list
        })
        console.log(list );

        $('main ul').html(searchHtml);

        $('main ul li').on('tap',function(){
            let id=$(this).attr('data-id');
            location.hash=`detail/${id}`;
        })

        for(let i=0;i<$('.price .right').length;i++){
            $('.price .right').eq(i).children('span').eq(0).css('background-position',`-2+0.1*${list[i].price[1][0]}`)
        }

      
    }

    myclick(){
        let that=this;
        let code=' ';
        let price='';
        let index=0;
        let pageNo=this.pageNo;
        let type=11;
        $('.choose li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('.choose-show>div').eq($(this).index()).toggle();
            index=$(this).index();
        })
        $('.choose-show>div a').click(async function(){
            $(this).addClass('now').siblings().removeClass('now');
            $('.choose li').eq(index).html($(this).html());
            $('.choose li').eq(index).addClass('now')
            console.log(index);
            type=$('.choose-show>div').eq(0).children('.now').attr('data-code');
            code=$('.choose-show>div').eq(1).children('.now').attr('data-to');
            price=$('.choose-show>div').eq(2).children('.now').attr('data-id');
            $('.choose-show>div').hide();
            console.log(code);
            let result2=await search2Model.get({
                pageNo:pageNo,
                code:code,
                price:price,
                type:type
            })
            let list=that.list=result2.data.rooms;
            that.renderer(list);
           
        }) 
    }

    mychoose(){
        let pageNo=this.pageNo;
        let that=this;
        let rapid=' ';
        $('.look li').click(async function(){
            $(this).toggleClass('look-in');
            let index=$('.look-in').length;
            rapid=$('.look-in').eq(0).attr('data-v')
            for(let i=1;i<index;i++){
                rapid=rapid.concat('%7C'+$('.look-in').eq(i).attr('data-v'))
            }
            let result2=await search2Model.get({
                pageNo:pageNo,
                rapid:rapid
            })
            let list=that.list=result2.data.rooms;
            that.renderer(list);
        })
    }


    
    async write(){
        let keyword=''
        let that=this
        let city_code=110000;
        let query=''
        query=$('.search-list input').val()

        let result=await search3Model.get({
            city_code: city_code,
            query:query
        })

        let list3=result.data.items
        let searchmaxHtml=searchMaxView({
            list3
        })
        $('.search-list ul').html(searchmaxHtml)

        $('.search-list ul li').on('tap',async function(){
            $('.search-list').css('display','none')
            let html=$(this).children('div').children('h3').html()
            keyword=html
            $('.search').text(html)
            let result=await searchModel.get({
                city_code: city_code,
                keyword:keyword
            })
            let list=that.list=result.data.rooms;
            console.log(list)
            that.renderer(list);
        })
    }

    
    

    async render(){
        let that=this;
        let city_code=110000;
        let keyword=''

        let result=await searchModel.get({
            pageNo:this.pageNo
        })

        let searchHtml=searchAllView({});
        let $header=$('header');
        $header.css('display','flex')
        $header.html(searchHtml);
        // $('footer').html(`
        // <ul>
        // <li data-to="ziru">首页</li>
        // <li data-to="search" class="active">搜索</li>
        // <li data-to="my">我的</li>
        // </ul>
        // `)

        let list=this.list=result.data.rooms;
    
        this.renderer(list);

        let bScroll=new BScroll.default($('main').get(0),{
            probeType:2
        })
       

        this.myclick();
        this.mychoose();


        $('.top-city').on('tap',function(){
            $('.city-list').show()
        })
        $('.city-close').on('tap',function(){
            $('.city-list').hide()
        })
        $('.city-list li').on('tap',async function(){
            console.log(1)
            $('.city-list').hide()
            $('.top-city').text($(this).text())
            city_code=$(this).attr('data-id')
            let result=await searchModel.get({
                pageNo: that.pageNo,
                city_code:city_code
            })
            let list=that.list=result.data.rooms;
            that.renderer(list);
        })

        $('.search').on('tap',async function(){
            $('.search-list').css('display','block')
        })

        $('.search-cancel').on('click',function(){
            $('.search-list').css('display','none')

        }) 

        $('.search-detele').on('click',function(){
            $('.search-list input').val('')
            console.log(8)
        })


        $('.search-list input').on('change',_.debounce(this.write,200).bind(this))



        bScroll.on('scrollEnd', async function(){
            if(this.y<=this.maxScrollY){
                that.pageNo++;

                let result=await searchModel.get({
                    pageNo:that.pageNo,
                    pageSize:that.pageSize
                })
                
                list=result.data.rooms;

                that.list=[...that.list,...list];
                that.renderer(that.list);
                console.log(that.list)

                // bScroll.scrollBy(0, 40)
            }
            this.refresh() 
        })
        
        
        
        
    }
    
}

export default new Search();
