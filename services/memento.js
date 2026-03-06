import { TodoList } from "./todoList.js";

const todoList = TodoList.getInstance()

export const TodoHistory = {
    history: [],
    push(state) {
        if(state) {
            this.history.push(new Set([...state])); 
        }
    },
    pop() {
        if(this.history.length > 1) {
            this.history.pop();
            return this.history.pop();
        }

    }
}
todoList.addObserver(() => {
    TodoHistory.push(todoList.items);
})