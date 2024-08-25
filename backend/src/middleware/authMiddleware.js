import jwt from "jsonwebtoken"
import config from "../config/index.js"

export const authenticateJWT = (req, res, next) => {
    const token = req.cookies?.token

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).send("Invalid token!")
            }

            req.userId = decoded.id
            next()
        });
    } else {
        res.status(401).send("No token!")
    }
}