const mysrv = function (srv) {
    srv.on('myFunc', (req, resp) => {
        return "Welcome " + req.data.msg
    })
    
}

module.exports = mysrv;