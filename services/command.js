// COMANDO
// EJECUTOR DEL COMANDO
// ENUM 

import { TodoHistory } from './memento.js';
import { TodoList, TodoItem } from './todoList.js'
export class Command {
    name;
    args;
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

export const Commands = {
    ADD: "add",
    DELETE: "delete",
    UNDO: "undo"
}

export const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();
        switch(command.name) {
            case Commands.ADD:
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                if(todoText != "") {
                    todoList.add(new TodoItem(todoText)) // CAMBIO, agregando new 
                    todoInput.value = ""                
                }
                break;
            case Commands.DELETE:
                const [textNode] = command.args;
                todoList.delete(textNode);
                break; 
            case Commands.UNDO:
                const todo = TodoHistory.pop();
                todoList.replaceList(todo);
                break;
        }
    }
}