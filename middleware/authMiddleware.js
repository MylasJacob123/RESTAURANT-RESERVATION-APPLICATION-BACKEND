const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    // const token = req.header("Authorization")?.split(" ")[1];  
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    // console.log("Received token:", token);

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Token is not valid" });
    }
};

module.exports = { protect };
