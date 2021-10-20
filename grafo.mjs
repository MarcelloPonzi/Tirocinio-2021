import ListaArchi from './listaArchi.mjs';
import ListaNodi from './listaNodi.mjs';
import Nodo from './nodo.mjs';
export default class Grafo {
    constructor() {
        this.nodi = new ListaNodi();
        this.archi = new ListaArchi("listaArchiGrafo");
        this.listaAdiacenze; //TODO
        this.id_max = 1;
    }

    aggiungiNodo() {
        var nuovoNodo = new Nodo(this.id_max);
        this.nodi.inserisciCoda(nuovoNodo);
        console.log("Nodo aggiunto con id " + this.id_max);
        this.id_max++;
        return nuovoNodo;
    }

    rimuoviNodo(nodo) {
        return this.nodi.rimuoviNodo(nodo);
    }

    stampaNodi() {
        //this.nodi.stampaListaNodi();
        this.nodi.stampaListaStringa();
        this.nodi.stampaDimensione();
    }

    aggiungiArco(arco) {
        //aggiunge arco alla lista degli archi del grafo
        this.archi.inserisciCoda(arco, 'nextG', 'prevG');

        //aggiunge arco alla lista degli archi uscenti dal nodo
        arco.from.archiUscenti.inserisciCoda(arco, 'nextUscN', 'prevUscN');

        //aggiunge arco alla lista degli archi entranti nel nodo
        arco.to.archiEntranti.inserisciCoda(arco, 'nextEntrN', 'prevEntrN');

        //aggiunge arco alla lista degli archi adiacenti dei nodi
        arco.from.archiAdiacenti.push(arco);
        arco.to.archiAdiacenti.push(arco);
    }

    rimuoviArco(arco) {
        //rimuove arco alla lista degli archi del grafo
        this.archi.rimuoviArco(arco, 'nextG', 'prevG');

        //aggiunge arco alla lista degli archi uscenti dal nodo
        arco.from.archiUscenti.rimuoviArco(arco, 'nextUscN', 'prevUscN');

        //aggiunge arco alla lista degli archi entranti nel nodo
        arco.to.archiEntranti.rimuoviArco(arco, 'nextEntrN', 'prevEntrN');

        //TODO RIMUOVERE ARCO DA LISTA ARCHI ADIACENTI
    }

    stampaArchi() {
        //this.archi.stampaListaArchi('nextG');
        this.archi.stampaListaStringa('nextG');
        this.archi.stampaDimensione();
    }

    stampaArchiUscentiNodo(nodo) {
        // nodo.archiUscenti.stampaListaArchi('nextUscN');
        nodo.archiUscenti.stampaListaStringa('nextUscN');
        nodo.archiUscenti.stampaDimensione();

    }

    stampaArchiEntrantiNodo(nodo) {
        //nodo.archiEntranti.stampaListaArchi('nextEntrN');
        nodo.archiEntranti.stampaListaStringa('nextEntrN');
        nodo.archiEntranti.stampaDimensione();
    }

    stampaArchiAdiacentiNodo(nodo) {
        nodo.stampaAdiacenti();
    }

    cancellaGrafo() {
        //svuoto la lista di ogni nodo
        let corrente = this.nodi.head;
        while (corrente) {
            corrente.archiUscenti.svuotaLista("nextUscN", "prevUscN");
            corrente.archiEntranti.svuotaLista("nextEntrN", "prevEntrN");
            corrente.archiAdiacenti.svuotaLista("nextAdiaN", "prevAdiaN");
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