const layoutView=require('../views/layout.art');

class Index{
    binkClick(){
        location.hash=$(this).attr('data-to')
    }

    render(){
        let html=layoutView()
        $('#root').html(html)    

        $('footer li').on('tap',this.binkClick)
        console.log(2)
    }
    renderer(){
        console.log(1)
    }
}

export default new Index();