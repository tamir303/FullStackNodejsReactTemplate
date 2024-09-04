import db from "../src/database/database.js"
import request from "supertest"
import app from "../src/app.js"
import User from "../src/models/User.js"

describe("User API", () => {

    beforeAll(async () => {
        await User.deleteMany()
    })

    afterAll(async () => {
        await User.deleteOne({ username: "testuser" })
        await db.mongoose.connection.close()
    })

    test('Register new user', async () => {
        const res = await request(app)
            .post("/auth/register")
            .send(
                {
                    username: "testuser",
                    password: "secret" 
                }
            ).expect(201)

        // Assert user is created
        const user = await User.findOne({ username: res.body.user.username })
        expect(user).not.toBeNull();

        expect(res.body.user.username).toEqual("testuser");
    })

    test("Login user", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                username: "testuser",
                password: "secret" 
            }).expect(200)

         // Assert correct user returned
        const user = await User.findOne({ username: res.body.user.username })
        expect(user).not.toBeNull();

        expect(res.body.user.username).toEqual("testuser")
    })

});