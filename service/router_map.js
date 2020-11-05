
module.exports = (rota, user) => {
    if (rota == '/admin' && user.isadmin == false) {
        return { status: 400, msg: "you shall not pass" }
    }

    // if (rota == '/profile' && user.isadmin == false) {
    //     return { status: 400, msg: "you shall not pass" }
        
    // }
    // if (rota == '/user/actions' && user.isadmin == false) {
    //     return { status: 400, msg: "you shall not pass" }
    // }
    return { status: 200, msg: "belê" }

}