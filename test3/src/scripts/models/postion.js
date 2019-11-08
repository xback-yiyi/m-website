module.exports={
    get({city_code=110000,pageNo=1, pageSize=30,keyword=''}) {
        return $.ajax({
          url: `https://m.ziroom.com/wap/room/list.json?city_code=${city_code}&page=${pageNo}&type=11&size=${pageSize}&keyword=${keyword}`,
          dataType:'json'
        })
      }
}