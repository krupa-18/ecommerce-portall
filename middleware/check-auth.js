const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    try {
       
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY= 'secret' );
        req.userData = decoded;
       
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};