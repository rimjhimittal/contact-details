const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization; 

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not verified");
            }
            req.user = decoded.user; // Attach the decoded user to the request
            console.log(req.user)
            next(); // Call next() to pass control to the next middleware or route handler
        });
    } else {
        res.status(401);
        throw new Error("Authorization token missing or invalid");
    }
});

module.exports = validateToken;
