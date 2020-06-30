'use script'
module.exports = function (res, err) {
    res.status(500) //internal server error
    res.json({
        success: false,
        message: err.message ? err.message : err,
    } )
}