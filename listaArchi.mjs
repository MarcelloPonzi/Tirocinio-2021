export default class ListaArchi {
    constructor(tipo) {
        this.head = null;
        this.tail = null;
        this.dimensione = 0;
        this.tipo = tipo; //3 tipi: listaArchiGrafo, listaUscenti, listaEntranti (potrei fare variabili globali per il tipo)
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
        return nuovoArco;
    }

    //inserisci In coda
    inserisciCoda(nuovoArco) {



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

        return nuovoArco;
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
            return arcoDaRimuovere;
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
            return arcoDaRimuovere;
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
            return arcoDaRimuovere;
        }

    }


    //Svuota lista
    svuotaLista() {
        while (this.head) {
            this.rimuoviTesta();
        }
        this.head = null;
        this.tail = null;
        this.dimensione = 0;

    }
    //stampa lista
    stampaListaArchi(next) {
        if (this.tipo == "listaArchiGrafo") console.log("\nLista archi nel grafo: ");
        if (this.tipo == "listaArchiUscenti") console.log("\nLista archi uscenti dal nodo: ");
        if (this.tipo == "listaArchientranti") console.log("\nLista archi uscenti dal nodo: ");

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
            if (this.tipo == "listaArchiGrafo") console.log("\nLista archi nel grafo: ");
            if (this.tipo == "listaArchiUscenti") console.log("\nLista archi uscenti dal nodo: ");
            if (this.tipo == "listaArchientranti") console.log("\nLista archi uscenti dal nodo: ");

        } else {
            if (this.tipo == "listaArchiGrafo") console.log("\nLista archi nel grafo: ");
            if (this.tipo == "listaArchiUscenti") console.log("\nLista archi uscenti dal nodo: ");
            if (this.tipo == "listaArchientranti") console.log("\nLista archi uscenti dal nodo: ");
            let st = "";
            let corrente = this.head
            while (corrente) {
                st += "("
                st += String(corrente.from.id)
                st += ","
                st += String(corrente.to.id);
                st += ")"
                st += " -> ";
                corrente = corrente[next];
            }
            st += "null";
            console.log(st);
        }
    }

}