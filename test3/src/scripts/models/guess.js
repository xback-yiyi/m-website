module.exports={
    get({id=1,house_id=2}){
        return $.ajax({
            url:`/api/v7/room/detail-promotion.json?city_code=110000&id=${id}&house_id=${house_id}`
        })
    }
}