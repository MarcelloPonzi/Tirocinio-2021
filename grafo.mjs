import ListaArchi from './listaArchi.mjs';
import ListaNodi from './listaNodi.mjs';
export default class Grafo {
    constructor() {
        this.nodi = new ListaNodi();
        this.archi = new ListaArchi("listaArchiGrafo");
        this.listaAdiacenze; //TODO
    }

    aggiungiNodo(nuovoNodo) {
        //controllo in tempo costante se il nodo è già inserito(probabilmente inutile se creo due nodi con lo stesso id)
        if (this.nodi.dimensione == 0) {
            this.nodi.inserisciTesta(nuovoNodo);
        } else
        if (this.nodi.dimensione == 1 && !(this.nodi.head == nuovoNodo)) {
            this.nodi.inserisciCoda(nuovoNodo);
        } else {
            //se il nodo non ha prev e next non è già stato inserito
            if (nuovoNodo.next == null && nuovoNodo.prev == null && this.nodi.dimensione > 1) {
                this.nodi.inserisciCoda(nuovoNodo);
            }
        }
    }

    rimuoviNodo(nodo) {
        return this.nodi.rimuoviNodo(nodo);
    }

    stampaNodi() {
        this.nodi.stampaListaNodi();
        this.nodi.stampaListaStringa();
        this.nodi.stampaDimensione();
    }

    aggiungiArco(arco) {
        //aggiunge arco alla lista degli archi del grafo
        this.archi.inserisciTesta(arco, 'nextG', 'prevG');

        //aggiunge arco alla lista degli archi uscenti dal nodo
        arco.from.archiUscenti.inserisciTesta(arco, 'nextUscN', 'prevUscN');

        //aggiunge arco alla lista degli archi entranti nel nodo
        arco.to.archiEntranti.inserisciTesta(arco, 'nextEntrN', 'prevEntrN');
    }

    rimuoviArco(arco) {
        //rimuove arco alla lista degli archi del grafo
        this.archi.rimuoviArco(arco, 'nextG', 'prevG');

        //aggiunge arco alla lista degli archi uscenti dal nodo
        arco.from.archiUscenti.rimuoviArco(arco, 'nextUscN', 'prevUscN');

        //aggiunge arco alla lista degli archi entranti nel nodo
        arco.to.archiEntranti.rimuoviArco(arco, 'nextEntrN', 'prevEntrN');
    }

    stampaArchi() {
        this.archi.stampaListaArchi('nextG');
        this.archi.stampaListaStringa('nextG');
        this.archi.stampaDimensione();
    }

    stampaArchiUscentiNodo(nodo) {
        nodo.listaUscenti.stampaListaArchi('nextUscN');
        nodo.listaUscenti.stampaListaStringa('nextUscN');
        nodo.listaUscenti.stampaDimensione();

    }

    stampaArchiEntrantiNodo(nodo) {
        nodo.listaUscenti.stampaListaArchi('nextEntrN');
        nodo.listaUscenti.stampaListaStringa('nextEntrN');
        nodo.listaUscenti.stampaDimensione();
    }

    cancellaGrafo() {
        //svuoto la lista di ogni nodo
        let corrente = this.nodi.head;
        while (corrente) {
            corrente.archiUscenti.svuotaLista("nextUscN", "prevUscN");
            corrente.archiEntranti.svuotaLista("nextEntrN", "nextEntrN");
            corrente = corrente.next;
        }
        //cancello i riferimenti ai nodi di ogni arco
        corrente = this.archi.head;
        while (corrente) {
            corrente.from = null;
            corrente.to = null;
            corrente = corrente.nextG;
        }
        //cancello la lista di tutti gli archi e i nodi del grafo
        this.nodi.svuotaLista();
        this.archi.svuotaLista("nextG", "prevG");
        console.log("Grafo cancellato.")
    }


}