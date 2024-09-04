import db from "../src/database/database.js";
import request from "supertest";
import app from "../src/app.js";
import TodoItem from "../src/models/TodoItem.js";
import TodoList from "../src/models/TodoList.js";
import User from "../src/models/User.js"

describe("Todo API", () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Create a user for testing
        const userResponse = await request(app)
            .post("/auth/register")
            .send({
                username: "testtodo",
                password: "password"
            });
        
        userId = userResponse.body.user._id;

        // Login to get a token
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                username: "testtodo",
                password: "password"
            });

        token = loginResponse.body.token; // Store token for authenticated requests
    });

    beforeEach(async () => {
        // Clean the TodoItem and TodoList collections before each test
        await TodoItem.deleteMany();
        await TodoList.deleteMany();
    });

    afterAll(async () => {
        // Close the database connection
        await User.deleteOne({ username: "testtodo" })
        await TodoItem.deleteMany();
        await TodoList.deleteMany();
        await db.mongoose.connection.close();
    });

    test("Create a new todo", async () => {
        const res = await request(app)
            .post("/todo/create")
            .set("Cookie", `token=${token}`)
            .send({
                title: "Test Todo",
                description: "This is a test todo"
            })
            .expect(201);

        // Assert that the todo is created
        expect(res.body.todo).toMatchObject({
            title: "Test Todo",
            description: "This is a test todo",
            complete: false,
        });
    });

    test("Edit an existing todo", async () => {
        // First create a todo
        const createRes = await request(app)
            .post("/todo/create")
            .set("Cookie", `token=${token}`)
            .send({
                title: "Test Todo",
                description: "This is a test todo"
            });

        // Now edit the todo
        const editRes = await request(app)
            .post("/todo/edit")
            .set("Cookie", `token=${token}`)
            .send({
                title: "Test Todo",
                description: "Updated description",
                complete: true
            })
            .expect(200);

        // Assert that the todo is updated
        expect(editRes.body.todo).toMatchObject({
            title: "Test Todo",
            description: "Updated description",
            complete: true,
        });
    });

    test("Delete a todo", async () => {
        // Create a todo to delete
        const createRes = await request(app)
            .post("/todo/create")
            .set("Cookie", `token=${token}`)
            .send({
                title: "Test Todo",
                description: "This is a test todo"
            });

        const deleteRes = await request(app)
            .post("/todo/delete")
            .set("Cookie", `token=${token}`)
            .send({
                title: "Test Todo"
            })
            .expect(200);

        // Assert that the delete response is as expected
        expect(deleteRes.body).toEqual({ message: "Deleted Todo Test Todo" });
    });

    test("Get all todos", async () => {
        // Create multiple todos
        await request(app)
            .post("/todo/create")
            .set("Cookie", `token=${token}`)
            .send({
                title: "First Todo",
                description: "This is the first todo"
            });

        await request(app)
            .post("/todo/create")
            .set("Cookie", `token=${token}`)
            .send({
                title: "Second Todo",
                description: "This is the second todo"
            });

        const res = await request(app)
            .get("/todo/getAll")
            .set("Cookie", `token=${token}`)
            .expect(200);

        // Assert that the correct number of todos is returned
        expect(res.body.todo.length).toBe(2);
        expect(res.body.todo).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: "First Todo" }),
                expect.objectContaining({ title: "Second Todo" }),
            ])
        );
    });
});
