
module.exports = (rota, user) => {
    if (rota == '/admin' && user.isadmin == false) {
        return { status: 400, msg: "you shall not pass" }
    }else{

    return { status: 200, msg: "belê" }

}
}