export default class Nodo {
    constructor(id, next = null) {
        this.id = id;
        //this.prev = prev;
        this.next = next;
    }
}