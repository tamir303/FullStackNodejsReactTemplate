import db from "../database/database.js"

const userSchema = new db.mongoose.Schema({
    username: { 
        type: String,
        required: true ,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = db.mongoose.model('User', userSchema)

export default User