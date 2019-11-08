module.exports={
    get({id=1}){
        return $.ajax({
            url:`https://m.ziroom.com/wap/detail/room.json?city_code=110000&id=${id}`
        })
    }
}