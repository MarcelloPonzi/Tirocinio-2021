import ListaArchi from "./listaArchi.mjs";
import ListaNodi from "./listaNodi.mjs";

export default class Nodo {
    constructor(id) {
        this.id = id;
        this.grado = null;
        this.pos = null;
        this.archiUscenti = new ListaArchi("archiUscenti");
        this.archiEntranti = new ListaArchi("archiEntranti");
        this.archiAdiacenti = new ListaArchi("archiAdiacenti");
    }

    inJson() {
        var st = "{\"id\":" + this.id + "}";
        return st;
    }
}