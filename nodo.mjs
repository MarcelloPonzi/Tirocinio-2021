import ListaArchi from "./listaArchi.mjs";

export default class Nodo {
    constructor(id) {
        this.id = id;
        this.prev = null;
        this.next = null;
        this.archiUscenti = new ListaArchi("listaUscenti");
        this.archiEntranti = new ListaArchi("listaEntranti");
    }

    inJson() {
        var st = "{\"id\":" + this.id + "}";
        return st;
    }
}