module.exports={
    get({resblock_id=1}){
        return $.ajax({
            url:`/api/resblock/detail?resblock_id=${resblock_id}`
        })
    }
}