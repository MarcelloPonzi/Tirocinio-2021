import ListaArchiEntrantiNodo from "./listaArchiEntrantiNodo.mjs";
import ListaArchiUscentiNodo from "./listaArchiUscentiNodo.mjs";

export default class Nodo {
    constructor(id) {
        this.id = id;
        this.prev = null;
        this.next = null;
        this.archiUscenti=new ListaArchiUscentiNodo();
        this.archiEntranti=new ListaArchiEntrantiNodo(); //per il momento solo uscenti,aggiungere la creazione della lista
    }

}