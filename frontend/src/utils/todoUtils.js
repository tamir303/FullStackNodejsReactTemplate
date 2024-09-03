export const getTodoFromTitle = async (todos, title) => {
    return new Promise((resolve, reject) => {
        const todo = todos.find(todo => todo.title === title)
        if (todo) {
        resolve(todo)
        } else {
        reject(null)
        }
    });
}