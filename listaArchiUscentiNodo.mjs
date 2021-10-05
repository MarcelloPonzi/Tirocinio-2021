export default class ListaArchiUscentiNodo{
    constructor() {
        this.head = null;
        this.tail = null;
        this.dimensione = 0;
    }

    //inserisci in testa
    inserisciTesta(nuovoArco) {

        //se la lista è vuota
        if (!this.dimensione) {
            this.head = nuovoArco;
            this.tail = nuovoArco;
        } else {

            this.head.prevUscN = nuovoArco;
            nuovoArco.nextUscN = this.head;
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
            this.tail.nextUscN = nuovoArco;
            nuovoArco.prevUscN = this.tail;
            this.tail = nuovoArco;



        }
        this.dimensione++;

        return nuovoArco;
    }

    //rimuovi nodo con argomento nodo
    rimuoviNodo(arcoDaRimuovere) {
        if (!this.dimensione) {
            return null;
        } else {
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                arcoDaRimuovere.prevUscN.nextUscN = arcoDaRimuovere.nextUscN;
                arcoDaRimuovere.nextUscN.prevUscN = arcoDaRimuovere.prevUscN;
                arcoDaRimuovere.nextUscN = null;
                arcoDaRimuovere.prevUscN = null;
            }
            this.dimensione--;
            return arcoDaRimuovere;
        }
    }

    //rimuovi testa
    rimuoviTesta() {
        if (!this.dimensione) {
            return null;
        } else {
            let arcoDaRimuovere = this.head;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = arcoDaRimuovere.nextUscN;
                this.head.prevUscN = null;
                arcoDaRimuovere.nextUscN = null;
            }
            this.dimensione--;
            return arcoDaRimuovere;
        }
    }


    //rimuovi coda
    rimuoviCoda() {
        //se vuota non puoi cancellare
        if (!this.dimensione) {
            return null;
        } else {
            let arcoDaRimuovere = this.tail;
            if (this.dimensione === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.tail = arcoDaRimuovere.prevUscN;
                this.tail.nextUscN = null;
                arcoDaRimuovere.prevUscN = null;
            }
            this.dimensione--;
            return arcoDaRimuovere;
        }

    }


    //Svuota lista
    svuotaLista() {
        while(this.head){
            this.rimuoviTesta();
        }
        this.head = null;
        this.tail = null;
        this.dimensione = 0;
        
    }
    //stampa lista
    stampaListaArchi() {
        console.log("\nLista archi uscenti dal nodo: ")
        let corrente = this.head;
        while (corrente) {
            console.log(corrente);
            corrente = corrente.nextUscN;
            
        }
    }
    //stampa dimensione
    stampaDimensione() {
        console.log("\nLa dimensione è: ")
        console.log(this.dimensione);
    }

    stampaListaStringa() {
        if (!this.dimensione) {
            console.log("\nLista archi vuota.");
            
        } else {
            console.log("\nLista Archi Uscenti dal nodo: ")
            let st = "";
            let corrente = this.head
            while (corrente) {
                st += "("
                st += String(corrente.from.id)
                st += ","
                st += String(corrente.to.id);
                st += ")"
                st += " -> ";
                corrente = corrente.nextUscN;
            }
            st+="null";
            console.log(st);
        }
    }
}
