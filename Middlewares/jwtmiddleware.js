const jwt = require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(" ")[1]
        if(token){
            const jwtResponse= jwt.verify(token,process.env.JWT_SECRET)
            req.payload=jwtResponse.userId
            next()

        }else{
            res.status(406).json("Token not Available...")
        }
    } catch {
        res.status(401).json("Please Login..")
    }
}

module.exports = jwtMiddleware