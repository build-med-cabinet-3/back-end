const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.header.authorization;

    if(token){
        const secret = process.env.JWT_SECRET || 'NO SEE'
        jwt.verify(token,secret,(err,decodedToken) => {
            if(err){
                res.status(401).json({message:'invalid credentials'})
            }else{
                req.decodedJwt = decodedToken;
                next();
            }
        })
    }else{
        res.status(401).json({message:'no credentials'})
    }

}