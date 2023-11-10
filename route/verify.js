const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next)=>{
    const token = req.headers.token
    if(token){
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken,"MySecretKey",(err,user)=>{
            if (err){
                return  res.status(403).json("Token is not valid")
            }
            req.user= user
            next();
        })
    }else{
        return   res.status(401).json("You're not authenticated")
    }
}

const verifyTokenAndCheckAdmin=(req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id==req.params.id || req.user.role=="admin"){
            next();
        }else
        res.status(403).json("Youre not allowed to do this")
    })
}

module.exports = verifyToken
