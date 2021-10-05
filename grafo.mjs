import ListaArchiGrafo from './listaArchiGrafo.mjs';
import ListaNodiGrafo from './listaNodiGrafo.mjs';
export default class Grafo{
    constructor(){
        this.listaNodi = new ListaNodiGrafo();
        this.listaArchi= new ListaArchiGrafo(); //aggiungere la creazione della lista
        this.listaAdiacenze; //TODO
    }

    aggiungiNodo(nuovoNodo) {
        //controllo in tempo costante se il nodo è già inserito(probabilmente inutile se creo due nodi con lo stesso id)
        if(this.listaNodi.dimensione==0){
            this.listaNodi.inserisciTesta(nuovoNodo);
        }

        
        else
            if(this.listaNodi.dimensione==1 && !(this.listaNodi.head==nuovoNodo)){
                this.listaNodi.inserisciCoda(nuovoNodo);
            }
            else{
                //se il nodo non ha prev e next non è già stato inserito
                if(nuovoNodo.next==null && nuovoNodo.prev==null && this.listaNodi.dimensione>1){
                    this.listaNodi.inserisciCoda(nuovoNodo);
                }
            }
        
        
    }

    rimuoviNodo(nodo) {
        return this.listaNodi.rimuoviNodo(nodo);
    }

    stampaNodi() {
       //this.listaNodi.stampaListaNodi();
        this.listaNodi.stampaListaStringa();
        this.listaNodi.stampaDimensione();
    }

}