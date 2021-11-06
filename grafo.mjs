import Arco from './arco.mjs';
import ListaArchi from './listaArchi.mjs';
import ListaNodi from './listaNodi.mjs';
import Nodo from './nodo.mjs';
export default class Grafo {
    constructor() {
        this.nodi = new ListaNodi();
        this.archi = new ListaArchi('archiGrafo');
        this.max_id_nodi = 0;
        this.max_id_archi = 0;
        this.max_grado = 0;
        this.adiacenze = [];
    }
    calcolatoreMaxGrado() {
        let item = this.nodi.head;
        while (item) {
            if (this.max_grado <= item.obj.archiAdiacenti.dimensione) {
                this.max_grado = item.obj.archiAdiacenti.dimensione;
            }
            item = item.next;
        }
    }

    aggiungiNodo() {
        var nuovoNodo = new Nodo(this.max_id_nodi);
        this.nodi.inserisciCoda(nuovoNodo);
        console.log("Nodo aggiunto con id " + this.max_id_nodi);
        this.max_id_nodi++;
    }

    rimuoviNodo(nodo) {
        return this.nodi.rimuoviNodo(nodo);
    }

    stampaNodi() {
        this.nodi.stampaListaStringa();
        this.nodi.stampaDimensione();
    }

    aggiungiArco(nodoFrom, nodoTo) {
        var arco = new Arco(this.max_id_archi, nodoFrom, nodoTo)
        //aggiunge arco alla lista degli archi del grafo
        this.archi.inserisciCoda(arco, 'pos');

        //aggiunge arco alla lista degli archi uscenti dal nodo
        arco.from.archiUscenti.inserisciCoda(arco, 'uscPos');

        //aggiunge arco alla lista degli archi entranti nel nodo
        arco.to.archiEntranti.inserisciCoda(arco, 'entrPos');

        //aggiunge arco alla lista degli archi adiacenti dei nodi
        arco.from.archiAdiacenti.inserisciCoda(arco, 'fromPos');
        arco.to.archiAdiacenti.inserisciCoda(arco, 'toPos');
        console.log("Arco " + arco.from.id + " --> " + arco.to.id + " aggiunto con id " + this.max_id_archi);
        this.max_id_archi++;
    }

    rimuoviArco(arco) {
        //rimuove arco alla lista degli archi del grafo
        this.archi.rimuoviArco(arco, 'pos');

        //rimuove arco alla lista degli archi uscenti dal nodo
        arco.from.archiUscenti.rimuoviArco(arco, 'uscPos');

        //rimuove arco alla lista degli archi entranti nel nodo
        arco.to.archiEntranti.rimuoviArco(arco, 'entrPos');

        //rimuove arco dalla lista degli archi adiacenti dei due nodi
        arco.from.archiAdiacenti.rimuoviArco(arco, 'fromPos');
        arco.to.archiAdiacenti.rimuoviArco(arco, 'toPos');
        console.log("Arco con id " + arco.id + " rimosso")
        this.max_id_archi++;
    }

    stampaArchi() {
        this.archi.stampaListaStringa('pos');
        this.archi.stampaDimensione();
    }

    stampaArchiUscentiNodo(nodo) {
        nodo.archiUscenti.stampaListaStringa();
        nodo.archiUscenti.stampaDimensione();

    }

    stampaArchiEntrantiNodo(nodo) {
        nodo.archiEntranti.stampaListaStringa();
        nodo.archiEntranti.stampaDimensione();
    }

    stampaArchiAdiacentiNodo(nodo) {
        nodo.archiAdiacenti.stampaListaStringa();
        nodo.archiAdiacenti.stampaDimensione();
    }

    cancellaGrafo() {
        //svuoto la lista di ogni nodo
        let item = this.nodi.head;
        while (item) {
            item.obj.archiUscenti.svuotaLista('uscPos');
            item.obj.archiEntranti.svuotaLista('entrPos');
            //TODO Svuotare lista adiacenze del nodo
            item = item.next;
        }
        //cancello i riferimenti ai nodi di ogni arco
        item = this.archi.head;
        while (item) {
            item.obj.from = null;
            item.obj.to = null;
            item = item.next;
        }
        //cancello la lista di tutti gli archi e i nodi del grafo
        this.nodi.svuotaLista();
        this.archi.svuotaLista('pos');
        if (this.nodi.dimensione == 0 && this.archi.dimensione == 0) {
            console.log("Grafo cancellato correttamente")
        } else {
            console.log("Grafo non cancellato correttamente.")
        }

    }

    creaAdiacenze() {
        this.adiacenze.length = this.nodi.dimensione;
        let n = this.nodi.head;
        while (n) {
            this.adiacenze[n.obj.id] = n.obj.archiAdiacenti;
            n = n.next;
        }
        return this.adiacenze;
    }

    creaArrayNodi() {
        var arrayNodi = new Array(this.nodi.dimensione);
        let n = this.nodi.head;
        while (n) {
            arrayNodi[n.obj.id] = n.obj;
            n = n.next;
        }
        return arrayNodi;
    }
}