
import UserService from "../services/userService.js"
import config from "../config/index.js"
import jwt from "jsonwebtoken"

class UserController {
    static registerUser = async (req, res) => {
        try {
            console.log(`Registering body: ${JSON.stringify(req.body)}`)
            const user = await UserService.registerUser(req.body)
            
            if (!user) 
                res.status(424).send("Failed to create user!")
            
            const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, secure: false });
            res.status(201).json(user) 
        } catch (ex) {
            res.status(500).send("Something went wrong!")
        }
    }

    static loginUser = async (req, res) => {
        try {
            if (!req.cookies?.id) {
                const user = UserService.loginUser(req.body.username, req.body.password)
                if (user) {
                    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
                    res.cookie('token', token, { httpOnly: true, secure: false });
                    res.status(200).send(user)
                }
            }

            const userId = res.cookies.id
            const user = UserService.getUserById(userId)
            if (user)
                res.status(200).send(user)

            res.status(400).send("User not found!")
        } catch (ex) {
            res.status(500).json({ messsage: ex.message })
        }
    }
}

export default UserController