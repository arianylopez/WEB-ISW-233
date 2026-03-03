// COMANDO
// EJECUTOR DEL COMANDO
// ENUM 

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
    DELETE: "delete"
}

export const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();
        switch(command.name) {
            case Commands.ADD:
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                if(todoText != "") {
                    todoList.add(TodoItem(todoText))
                    todoInput.value = ""                
                }
                break
            case Commands.DELETE:
                command [textToDelete] = command.args
                todoList.delete(textToDelete)
                break 
        }
    }
}