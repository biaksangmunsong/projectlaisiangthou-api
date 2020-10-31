module.exports = (req, res, next) => {

    const requestOrigin = req.headers.origin
    if (!requestOrigin){
        return res.end()
    }
    
    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",")
    let allowed = false
    for (let i = 0; i < allowedOrigins.length; i++){
        if (requestOrigin === allowedOrigins[i]){
            allowed = true
            break
        }
    }

    if (!allowed){
        return res.end()
    }
    
    next()

}