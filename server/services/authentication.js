const JWT = require("jsonwebtoken")
const secret = "superMan@123"
function createTokenForUser (user){
    const payload = {
        _id : user._id,
        email : user.email,
        name : user.name
    }

    const token = JWT.sign(payload,secret);
    console.log('Created Token',token)
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

async function authenticateToken(req, res, next) {
    const token = req.cookies.token;
  if (!token) {
    console.log('No token found');
    return res.sendStatus(401); 
  }

  JWT.verify(token, secret, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; 
    next();
  });
  }

module.exports = {
    createTokenForUser,
    validateToken,
    authenticateToken
}

