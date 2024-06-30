// const jwt = require("jsonwebtoken");
// const { CreateError } = require("../utilis/createError")

// const verifyToken = (req, res, next) => {
  
//   const token = req.cookies.accessToken;
//   console.log("verifyToken middleware reached");
//   console.log(req.cookies);
// console.log("Token parsed from cookie:", req.cookies.accessToken);
//   if (!token) return next(CreateError(401, "You are not authenticated!"));



//   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    
//     if (err) return next(CreateError(403, "Token is not valid!"));
//     req.userId = payload.id;
//     // req.isSeller = payload.isSeller;
//     next();
//   });
// };

// module.exports = {
//   verifyToken,
// };


// const jwt = require("jsonwebtoken");
// require("dotenv").config()
// const { CreateError } = require("../utilis/createError")

// const verifyToken = (req, res, next) => {
  
//   const token = req.cookies.accessToken;
//   console.log("token: ", token)
//   if (!token) return next(CreateError(401, "You are not authenticated!"));

//   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    
//     if (err) return next(CreateError(403, "Token is not valid!"));
//     req.userId = payload.id;
//     next();
//   });
// };

// module.exports = {
//   verifyToken,
// };

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { CreateError } = require("../utilis/createError");

const verifyToken = (req, res, next) => {
    // Check if Authorization header is present
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) return next(CreateError(401, "You are not authenticated!"));

    // Extract token from Authorization header
    const token = authorizationHeader.split(" ")[1];
    if (!token) return next(CreateError(401, "Token is missing!"));

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(CreateError(403, "Token is not valid!"));
        req.userId = payload.id;
        next();
    });
};

module.exports = {
    verifyToken,
};
