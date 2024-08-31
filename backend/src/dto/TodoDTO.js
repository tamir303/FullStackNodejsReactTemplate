export class TodoDTO {
    constructor(todo) {
        this.title = todo.title
        this.description = todo.description
        this.createdAt = todo.createdAt
        this.complete = todo.complete
    }
}