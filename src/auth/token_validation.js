const jwt = require('jsonwebtoken');
const secret = "vent-secret-access-token";
const refreshTokenSecret = "vent-secret-refresh-access-token";
module.exports={
    checkToken: (req, res, next)=>{
        const bearerHeader =  req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            const token=bearerHeader;
            jwt.verify(token, secret, (err, decoded)=>{
                if(err){
                    res.status(401).json({
                        success:0,
                        message:"Invalid token"
                    });
                }else{
                    var tokendes = token.split('.')[1];
                    req.rol=tokendes.idrol;
                    next();
                }
            });
        }else{
            res.status(401).json({
                success:0,
                message: "Access denied unautorized user"
            });
        }
    }
}