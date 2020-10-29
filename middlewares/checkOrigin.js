module.exports = (req, res, next) => {

    const host = req.headers.host
    if (!host){
        return res.end()
    }
    
    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",")
    let allowed = false
    for (let i = 0; i < allowedOrigins.length; i++){
        if (host === allowedOrigins[i]){
            allowed = true
            break
        }
    }

    if (!allowed){
        return res.end()
    }
    
    next()

}