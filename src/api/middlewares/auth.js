const jwt = require('jsonwebtoken')
const dotnenv = require('dotenv')
dotnenv.config()
module.exports = {
    authentication: (user_id) => {
        try {
            return jwt.sign({
                data: user_id
            }, process.env.JWT_SECRET, { expiresIn: '1h' }
            )
        } catch (error) {
            return  null
        }
    },
    authorization: (req, res, next) => {
        try {
            let token = req.get('authorization')
            if(!token){
                throw new Error("UnAuthorized! user !")
            }
            token = token.slice(7)
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    throw new Error("Token Invalid..!")
                }
                req.user = decoded
                next()
            })
        } catch (error) {
            return res.status(401).json({
                success:0,
                message:error.message
            })
        }
    },
    checkToken: (req, res, next) => {
        try {
            let token = req.get('authorization')
            if(!token){
                throw new Error("UnAuthorized! user !")
            }
            token = token.slice(7)
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    throw new Error("Token Invalid..!")
                }
                req.user = decoded
                return res.status(200).json({
                    success:true,
                    message:"Verified"
                })
            })
        } catch (error) {
            return res.status(401).json({
                success:0,
                message:error.message
            })
        }
    }
}