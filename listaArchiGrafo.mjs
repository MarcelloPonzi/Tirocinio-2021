export default class ListaArchiGrafo{
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

            this.head.prevG = nuovoArco;
            nuovoArco.nextG = this.head;
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
            this.tail.nextG = nuovoArco;
            nuovoArco.prevG = this.tail;
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
                arcoDaRimuovere.prevG.nextG = arcoDaRimuovere.nextG;
                arcoDaRimuovere.nextG.prevG = arcoDaRimuovere.prevG;
                arcoDaRimuovere.nextG = null;
                arcoDaRimuovere.prevG = null;
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
                this.head = arcoDaRimuovere.nextG;
                this.head.prevG = null;
                arcoDaRimuovere.nextG = null;
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
                this.tail = arcoDaRimuovere.prevG;
                this.tail.nextG = null;
                arcoDaRimuovere.prevG = null;
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
        console.log("\nLista archi: ")
        let corrente = this.head;
        while (corrente) {
            console.log(corrente);
            corrente = corrente.nextG;
            
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
            console.log("\nLista Archi: ")
            let st = "";
            let corrente = this.head
            while (corrente) {
                st += "("
                st += String(corrente.from.id)
                st += ","
                st += String(corrente.to.id);
                st += ")"
                st += " -> ";
                corrente = corrente.nextG;
            }
            st+="null";
            console.log(st);
        }
    }

}
