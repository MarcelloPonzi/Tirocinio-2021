import Nodo from './nodo.mjs';
export default class listaNodi {
    constructor() {
        this.head = null;
        this.dimensione = 0;
    }

    //inserisci in testa
    inserisciTesta(id) {
        this.head = new Nodo(id, this.head)
        this.dimensione++;
    }

    //inserisci In coda
    inserisciCoda(id) {
        let nodo = new Nodo(id);
        let corrente;

        //se vuoto, allora aggiungi in testa
        if (!this.head) {
            this.head = nodo;
        } else {
            corrente = this.head;

            while (corrente.next) {
                corrente = corrente.next;
            }
            corrente.next = nodo;
        }
        this.dimensione++;
    }
    //inserisci in indice 
    aggiungiIn(id, indice) {
        //indice fuori range
        if (indice > 0 && indice > this.dimensione) {
            return;
        }

        //se primo indice
        if (index === 0) {
            this.inserisciTesta(id);
        }

        const nodo = new Nodo(id);
        let corrente, prev;
        corrente = this.head;

        for (i = 0; i < indice; i++) {
            prev = corrente; //nodo prima dell'indice
            i++;
            corrente = corrente.next; //nodo dopo l'indice
        }
        nodo.next = corrente;
        previous.next = nodo;
        this.dimensione++;
    }
    //prendi a indice
    prendiIn(indice) {
        let corrente = this.head;
        for (let i = 0; corrente; i++) {
            if (i == indice) {
                console.log(corrente.id);
            }
            corrente = corrente.next;
        }


    }

    //rimuovi a indice
    rimuoviIn(indice) {
        if (indice > 0 && indice > this.dimensione) {
            return;
        }

        let corrente = this.head;
        let prev;
        if (indice === 0) {
            this.head = corrente.next;
        } else {
            for (let i = 0; i < indice; i++) {
                prev = corrente;
                corrente = corrente.next;
            }
            prev.next = corrente.next;
        }
        this.dimensione--;

    }
    //Svuota lista
    svuotaLista() {
        this.head = null;
        this.dimensione = 0;
        //come rimuovere lista?
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

const ln = new listaNodi();
ln.inserisciTesta(100);
ln.inserisciTesta(200);
ln.inserisciTesta(300);
ln.inserisciCoda(400);
ln.stampaListaNodi();

ln.rimuoviIn(2);
ln.stampaListaNodi();