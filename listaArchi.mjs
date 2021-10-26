import listItem from "./listItem.mjs";

export default class ListaArchi {
    constructor(tipo) {
        this.head = null;
        this.tail = null;
        this.dimensione = 0;
        this.tipo = tipo;
    }

    //inserisci in testa
    inserisciTesta(arco, pos) {
        let item = new listItem(arco);
        arco[pos] = item;
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
    inserisciCoda(arco, pos) {
        let item = new listItem(arco);
        arco[pos] = item;
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

    //rimuovi arco
    rimuoviArco(arco, pos) {
        if (!this.dimensione) {
            return null;
        } else {
            let item = arco[pos];
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                item.prev.next = item.next;
                item.next.prev = item.prev;
            }
            //rimuovo riferimenti dell'item
            item.next = null;
            item.prev = null;
            item.obj = null;
            //rimuovo riferimenti arco
            arco[pos] = null;
            this.dimensione--;
        }
    }

    //rimuovi testa
    rimuoviTesta(pos) {
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
            //rimuovo riferimenti arco
            item.obj[pos] = null;
            //rimuovo riferimenti dell'item
            item.next = null;
            item.prev = null;
            item.obj = null;
            this.dimensione--;
        }
    }


    //rimuovi coda
    rimuoviCoda(pos) {
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
            //rimuovo riferimenti arco
            item.obj[pos] = null;
            //rimuovo riferimenti dell'item
            item.next = null;
            item.prev = null;
            item.obj = null;
            this.dimensione--;
        }
    }


    //Svuota lista
    svuotaLista(pos) {
        while (this.head) {
            this.rimuoviTesta(pos);
        }
    }
    //stampa dimensione
    stampaDimensione() {
        console.log("\nLa dimensione è: ")
        console.log(this.dimensione);
    }

    stampaListaStringa() {
        if (!this.dimensione) {
            switch (this.tipo) {
                case 'archiGrafo': {
                    console.log("\nLista archi nel grafo vuota ");
                    break;
                }
                case 'archiUscenti': {
                    console.log("\nLista archi uscenti dal nodo vuota ");
                    break;
                }
                case 'archiEntranti': {
                    console.log("\nLista archi entranti nel nodo vuota ");
                    break;
                }
                case 'archiAdiacenti': {
                    console.log("\nLista archi adiacenti del nodo vuota ");
                    break;
                }
                default: {
                    console.log("\nTipo lista non specificato");
                    break;
                }

            }
        } else switch (this.tipo) {
            case 'archiGrafo': {
                console.log("\nLista archi nel grafo: ");
                break;
            }
            case 'archiUscenti': {
                console.log("\nLista archi uscenti dal nodo: ");
                break;
            }
            case 'archiEntranti': {
                console.log("\nLista archi entranti nel nodo: ");
                break;
            }
            case 'archiAdiacenti': {
                console.log("\nLista archi adiacenti del nodo: ");
                break;
            }
            default: {
                console.log("\nTipo lista non specificato");
                break;
            }
        }

        let st = "";
        let item = this.head;
        while (item) {
            st += "("
            st += String(item.obj.from.id)
            st += ","
            st += String(item.obj.to.id);
            st += ")"
            if (item.next) {
                st += " --> ";
                item = item.next;
            } else item = item.next;

        }
        console.log(st);
    }
}