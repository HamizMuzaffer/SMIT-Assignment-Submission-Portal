const JWT = require("jsonwebtoken")
const secret = "superMan@123"

function createTokenForUser (student){
    const payload = {
        _id : student._id,
        email : student.email,
    }

    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}

