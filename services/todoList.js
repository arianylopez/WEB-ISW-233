import { observerMixin } from './mixins.js';
export class TodoItem {
    constructor(text) {
        this.text = text
    }

    equals(other) {
        return this.text === other.text // VALUE OBJECT 
    }
}

export class TodoList {
    #data = new Set() // Almacena objetos, data es privada, no se puede acceder desde fuera de la clase

    get items() { // getter para acceder a los items de la lista
        return this.#data
    }

    // SINGLETON 
    static instance = null;

    static { // Siempre se va a correr, una vez 
        this.instance = new TodoList();
    }

    static getInstance() {
        return this.instance;
    }

    constructor() {
        if(TodoList.instance) {
            throw new Error("Use getInstance");
        }
    }

    add(item) {
        const array = Array.from(this.#data);
        const itemExists = array.filter(el => el.equals(item)).length > 1
        if(!itemExists) {
            this.#data.add(item);
            this.notify()
        }
    }

    delete(text_item) {
        const array = Array.from(this.#data)
        const itemToDelete = array.filter(el => el.text == text_item)
        this.#data.delete(itemToDelete[0])
        this.notify();
        
    }

    find(text_item) {
        const array = Array.from(this.#data)
        return array.find(el => el.text == text_item)
    }

    replaceList(list) {
        this.#data = list;
        this.notify();
    }
}

Object.assign(TodoList.prototype, observerMixin) // MIXIN 