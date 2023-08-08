const jwt = require("jsonwebtoken");


const generateToken = (id) => {
    // return jwt.sign({ id }, process.env.JWTSecret)
    return jwt.sign({ id }, "Ayush", {
        expiresIn: "30d"
    })
}

module.exports = generateToken;