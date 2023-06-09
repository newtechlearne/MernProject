const jwt = require("jsonwebtoken");

const User = require("../models/user.js");
//auth middleware function
//bearer token unique for each signs up for each session
//remember space 
const auth = async(req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.NOTER_JWT_SECRET);
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ Error: "Unauthenticated" });
    }
};

module.exports = auth;