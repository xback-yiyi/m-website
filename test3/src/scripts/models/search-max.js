module.exports={
    get({city_code=110000,query=''}){
        return $.ajax({
            url:`https://m.ziroom.com/v7/setting/suggestion.json?city_code=${city_code}&query=${query}`
        })
    }
}