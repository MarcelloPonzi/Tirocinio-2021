import ListaArchi from "./listaArchi.mjs";

export default class Nodo {
    constructor(id) {
        this.id = id;
        this.grado = null;
        this.prev = null;
        this.next = null;
        this.archiUscenti = new ListaArchi("archiUscenti");
        this.archiEntranti = new ListaArchi("archiEntranti");
        this.archiAdiacenti = [];
    }
    stampaAdiacenti() {
        console.log("Lista archi adiacenti al nodo: ")
        let st = new String;
        let i = 0;
        this.archiAdiacenti.forEach(arco => {
            st += "(";
            st += String(arco.from.id);
            st += ",";
            st += String(arco.to.id);
            st += ")";
            if (i !== this.archiAdiacenti.length - 1) {
                st += "-->";
            }
            i++;

        })
        console.log(st);
        console.log("La dimensione è: " + i);
    }

    inJson() {
        var st = "{\"id\":" + this.id + "}";
        return st;
    }
}