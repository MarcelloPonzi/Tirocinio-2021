import Nodo from './nodo.mjs';
export default class listaConcatenata {
    constructor() {
        this.head = null;
        this.tail = null;
        this.dimensione = 0;
    }

    //inserisci in testa
    inserisciTesta(id) {
        let nuovoNodo = new Nodo(id);

        //se la lista è vuota
        if (!this.dimensione) {
            this.head = nuovoNodo;
            this.tail = nuovoNodo;
        } else {

            this.head.prev = nuovoNodo;
            nuovoNodo.next = this.head;
            this.head = nuovoNodo;

        }
        this.dimensione++;
        return newNodo;
    }

    //inserisci In coda
    inserisciCoda(id) {
        const nuovoNodo = new Nodo(id);


        //se vuoto, allora aggiungi in testa
        if (!this.dimensione) {
            this.head = nuovoNodo;
            this.tail = nuovoNodo;
        } else {
            this.tail.next = nuovoNodo;
            nuovoNodo.prev = this.tail;
            this.tail = nuovoNodo;



        }
        this.dimensione++;

        return newNodo;
    }

    //rimuovi nodo con argomento nodo
    rimuoviNodo(nodoDaRimuovere) {
        if (!this.dimensione) {
            return null;
        } else {
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                nodoDaRimuovere.prev.next = nodoDaRimuovere.next;
                nodoDaRimuovere.next.prev = nodoDaRimuovere.prev;
                nodoDaRimuovere.next = null;
                nodoDaRimuovere.prev = null;
            }
            this.dimensione--;
            return nodoDaRimuovere;
        }
    }

    //rimuovi testa
    rimuoviTesta() {
        if (!this.dimensione) {
            return null;
        } else {
            const nodoDaRimuovere = this.head;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = nodoDaRimuovere.next;
                this.head.prev = null;
                nodoDaRimuovere.next = null;
            }
            this.dimensione--;
            return nodoDaRimuovere;
        }
    }


    //rimuovi coda
    rimuoviCoda() {
        //se vuota non puoi cancellare
        if (!this.dimensione) {
            return null;
        } else {
            const nodoDaRimuovere = this.tail;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.tail = nodoDaRimuovere.prev;
                this.tail.next = null;
                nodoDaRimuovere.prev = null;
            }
            this.dimensione--;
            return nodoDaRimuovere;
        }

    }


    //Svuota lista
    svuotaLista() {
        this.head = null;
        this.tail = null;
        this.dimensione = 0;
        //come rimuovere lista dalla memoria?
    }
    //stampa lista
    stampaListaNodi() {
        let corrente = this.head;
        while (corrente) {
            console.log(corrente.id);
            corrente = corrente.next;
        }
    }
    //stampa dimensione
    stampaDimensione() {
        console.log(this.dimensione);
    }

}