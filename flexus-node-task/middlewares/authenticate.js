const jwt = require('jsonwebtoken')
const jwtsecret = 'flexus'



const authenticate = async (req, res, next) => {
    let authToken = req.headers.authorization.split(" ")[1]
    if (authToken) {
        await jwt.verify(authToken, jwtsecret, (err, userpayload) => {
            if(err){
                if (err?.name === 'TokenExpiredError') {
                    res.status(401).send('Token expired.');
                } else {
                    res.status(403).send('Invalid token.');
                }
            }
          
            req.user_id = userpayload.data.user_id
            next()
        });

    }
    else {
        res.json({
            status: false,
            message: 'Access denied,Token is missing'
        })
    }
}




module.exports = authenticate;
