import db, { connectToMongo } from "../src/database/database.js"
import request from "supertest"
import app from "../src/app.js"
import User from "../src/models/User.js"

describe("User API", () => {

    beforeEach(async () => {
        await User.deleteMany()
    })

    afterAll(async () => {
        await db.mongoose.connection.close()
    })

    test('Register new user', async () => {
        const res = await request(app)
            .post("/users/register")
            .send(
                {
                    username: "test",
                    password: "secret" 
                }
            ).expect(201)

        // Assert user is created
        const user = await User.findOne({ username: res.body.username })
        expect(user).not.toBeNull();

        expect(res.body).toMatchObject({
            username: "test",
            password: "secret"
        })
    })

    test("Login user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                usesrname: "test",
                password: "secret"
            }).expect(200)

         // Assert correct user returned
        const user = await User.findOne({ username: res.body.username })
        expect(user).not.toBeNull();

        expect(res.body).toMatchObject({
            username: "test",
            password: "secret"
        })
    })

});