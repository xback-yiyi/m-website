module.exports={
    get({pageNo=1, pageSize=15,code='',price='',rapid='',type=11}) {
        return $.ajax({
          url: `https://m.ziroom.com/wap/room/list.json?city_code=110000&page=${pageNo}&type=${type}&size=${pageSize}&district_code=${code}&price=${price}&rapid=${rapid}`
        })
      }
}