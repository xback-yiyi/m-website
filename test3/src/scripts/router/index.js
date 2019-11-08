import indexController from '../controllers/index'

import searchController from '../controllers/search'
import ziruController  from '../controllers/ziru'
import myController from '../controllers/my'
import detailController from '../controllers/detail'
import resblockController from '../controllers/resblock'


class Router{
    constructor(){
        this.render()
    }
    render(){
        window.addEventListener('load',this.handlePageload.bind(this));
        window.addEventListener('hashchange',this.handleHashchange.bind(this));
    }
    setActiveClass(hash){
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active');
        
    }
    renderer(hash){
        let pageController ={
            ziruController,
            searchController,
            myController,
            detailController,
            resblockController
        }
        pageController[hash+'Controller'].render()
    }

    handlePageload(){
        let hash=location.hash.substr(1)||'ziru';
        indexController.render();
        location.hash=hash;
        
        let reg=new RegExp(/^(\w+)/,'g');
        let path=reg.exec(hash);
        this.renderer(path[1]);
        this.setActiveClass(path[1]);

        this.renderer(path[1]);
        this.setActiveClass(path[1]);
    }

    handleHashchange(){
        let hash=location.hash.substr(1);
        let reg=new RegExp(/^(\w+)/,'g');
        let path=reg.exec(hash);
        this.renderer(path[1]);
        $('footer').css('display','block');
        this.setActiveClass(path[1]);
    }

  
}

new Router;