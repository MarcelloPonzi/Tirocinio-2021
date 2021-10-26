import listItem from "./listItem.mjs";

export default class ListaNodi {
    constructor() {
        this.head = null;
        this.tail = null;
        this.dimensione = 0;
    }

    //inserisci in testa
    inserisciTesta(nodo) {
        let item = new listItem(nodo);
        nodo.pos = item;
        //se la lista è vuota
        if (!this.dimensione) {
            this.head = item;
            this.tail = item;
        } else {

            this.head.prev = item;
            item.next = this.head;
            this.head = item;
        }
        this.dimensione++;
    }

    //inserisci In coda
    inserisciCoda(nodo) {
        let item = new listItem(nodo);
        nodo.pos = item;

        //se vuoto, allora aggiungi in testa
        if (!this.dimensione) {
            this.head = item;
            this.tail = item;
        } else {
            this.tail.next = item;
            item.prev = this.tail;
            this.tail = item;
        }
        this.dimensione++;
    }

    //rimuovi oggetto nodo
    rimuoviNodo(nodo) {
        if (!this.dimensione) {
            return null;
        } else {
            let item = nodo.pos;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                item.prev.next = item.next;
                item.next.prev = item.prev;
            }
            //elimino riferimenti di list item
            item.prev = null;
            item.next = null;
            item.obj = null;
            //elimino i riferimenti dell'oggetto nodo
            nodo.pos = null;


            this.dimensione--;
        }
    }

    //rimuovi testa
    rimuoviTesta() {
        if (!this.dimensione) {
            return null;
        } else {
            let item = this.head;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = item.next;
                this.head.prev = null;

            }
            //elimino riferimento del nodo
            item.obj.pos = null;
            //elimino riferimenti item
            item.next = null;
            item.prev = null;
            item.obj = null;
            this.dimensione--;
        }
    }


    //rimuovi coda
    rimuoviCoda() {
        //se vuota non puoi cancellare
        if (!this.dimensione) {
            return null;
        } else {
            let item = this.tail;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.tail = item.prev;
                this.tail.next = null;
            }
            //elimino riferimento del nodo
            item.obj.pos = null;
            //elimino riferimenti item
            item.next = null;
            item.prev = null;
            item.obj = null;
            this.dimensione--;
        }

    }


    //Svuota lista
    svuotaLista() {
        while (this.head) {
            this.rimuoviTesta();
        }
    }
    //stampa lista
    stampaListaNodi() {
        console.log("\nLista nodi: ")
        let item = this.head;
        while (item) {
            console.log(item.obj);
            item = item.next;

        }
    }
    //stampa dimensione
    stampaDimensione() {
        console.log("\nLa dimensione è: ")
        console.log(this.dimensione);
    }

    stampaListaStringa() {
        if (!this.dimensione) {
            console.log("\nLista nodi vuota");

        } else {
            console.log("\nLista nodi: ")
            let st = "";
            let item = this.head
            while (item) {
                st += String(item.obj.id);
                if (item.next) {
                    st += " --> ";
                    item = item.next;
                } else item = item.next;
            }
            console.log(st);
        }
    }
}