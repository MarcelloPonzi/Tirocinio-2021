export default class ListaArchi {
    constructor(tipo) {
        this.head = null;
        this.tail = null;
        this.dimensione = 0;
        this.tipo = tipo; //3 tipi: listaArchiGrafo, archiUscenti, archiEntranti (potrei definire costanti globali per il tipo)
    }

    //inserisci in testa
    inserisciTesta(nuovoArco, next, prev) {

        //se la lista è vuota
        if (!this.dimensione) {
            this.head = nuovoArco;
            this.tail = nuovoArco;
        } else {

            this.head[prev] = nuovoArco;
            nuovoArco[next] = this.head;
            this.head = nuovoArco;

        }
        this.dimensione++;
    }

    //inserisci In coda
    inserisciCoda(nuovoArco, next, prev) {



        //se vuoto, allora aggiungi in testa
        if (!this.dimensione) {
            this.head = nuovoArco;
            this.tail = nuovoArco;
        } else {
            this.tail[next] = nuovoArco;
            nuovoArco[prev] = this.tail;
            this.tail = nuovoArco;



        }
        this.dimensione++;
    }

    //rimuovi nodo con argomento nodo
    rimuoviNodo(arcoDaRimuovere, next, prev) {
        if (!this.dimensione) {
            return null;
        } else {
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                arcoDaRimuovere[prev][next] = arcoDaRimuovere[next];
                arcoDaRimuovere[next][prev] = arcoDaRimuovere[prev];
                arcoDaRimuovere[next] = null;
                arcoDaRimuovere[prev] = null;
            }
            this.dimensione--;
        }
    }

    //rimuovi testa
    rimuoviTesta(next, prev) {
        if (!this.dimensione) {
            return null;
        } else {
            let arcoDaRimuovere = this.head;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = arcoDaRimuovere[next];
                this.head[prev] = null;
                arcoDaRimuovere[next] = null;
            }
            this.dimensione--;
        }
    }


    //rimuovi coda
    rimuoviCoda(next, prev) {
        //se vuota non puoi cancellare
        if (!this.dimensione) {
            return null;
        } else {
            let arcoDaRimuovere = this.tail;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.tail = arcoDaRimuovere[prev];
                this.tail[next] = null;
                arcoDaRimuovere[prev] = null;
            }
            this.dimensione--;
        }

    }


    //Svuota lista
    svuotaLista(next, prev) {
        while (this.head) {
            this.rimuoviTesta(next, prev);
        }
        this.head = null;
        this.tail = null;
        this.dimensione = 0;

    }
    //stampa lista
    stampaListaArchi(next) {
        if (this.tipo == "listaArchiGrafo") console.log("\nLista archi nel grafo: ");
        if (this.tipo == "archiUscenti") console.log("\nLista archi uscenti dal nodo: ");
        if (this.tipo == "archiEntranti") console.log("\nLista archi entranti nel nodo: ");

        let corrente = this.head;
        while (corrente) {
            console.log(corrente);
            corrente = corrente[next];

        }
    }
    //stampa dimensione
    stampaDimensione() {
        console.log("\nLa dimensione è: ")
        console.log(this.dimensione);
    }

    stampaListaStringa(next) {
        if (!this.dimensione) {
            if (this.tipo == "listaArchiGrafo") console.log("\nLista archi nel grafo vuota ");
            if (this.tipo == "archiUscenti") console.log("\nLista archi uscenti dal nodo vuota ");
            if (this.tipo == "archiEntranti") console.log("\nLista archi entranti nel nodo vuota ");

        } else {
            if (this.tipo == "listaArchiGrafo") console.log("\nLista archi nel grafo: ");
            if (this.tipo == "archiUscenti") console.log("\nLista archi uscenti dal nodo: ");
            if (this.tipo == "archiEntranti") console.log("\nLista archi entranti nel nodo: ");
            let st = "";
            let corrente = this.head;
            while (corrente) {
                st += "("
                st += String(corrente.from.id)
                st += ","
                st += String(corrente.to.id);
                st += ")"
                if (corrente[next]) {
                    st += " --> ";
                    corrente = corrente[next];
                } else corrente = corrente[next];

            }
            console.log(st);
        }
    }

}