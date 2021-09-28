class Grafo {
    //viene creato dall'app  
    constructor() {
        this.nodi = new Map(); //caso peggiore tempo lineare non sufficente
        this.archi = [];
        //implementare lista di nodi con ognuno un puntatore all'elemento della lista
        //stessa cosa per arco

    }

    addNodo(id) {
        if (this.nodi.has(id)) {
            return this.nodi.get(value);
        } else {
            const nodo = new Nodo(id);
            this.nodi.set(id, nodo);
        }
    }

    removeNodo(id) {
        const corrente = this.nodi.get(id);
        if (corrente) {
            for (const nodo of this.nodi.values()) {
                nodo.rimuoviAdiacente(corrente);
            }
        }
        return this.nodi.delete(id);
    }
    addArco(from, to) {
        const arco = new Arco(from, to)
        this.archi.push(arco);
        arco.aggiungiti();
    }

    removeArco(arco) {
        const indice = this.archi.indexOf(arco);
        if (indice > -1) {
            this.archi.splice(indice, 1);
        }

    }

    getArchi() {
        return this.archi;
    }

    getNodi() {
        return this.nodi;
    }

}



class Nodo {
    constructor(id) {
        this.id = id;
        this.adiacenti = []; //lista di adiacenza
    }
    aggiungiAdiacente(nodo) {
        this.adiacenti.push(nodo);
    }
    rimuoviAdiacente(nodo) {
        const indice = this.adiacenti.indexOf(nodo);
        if (indice > -1) {
            this.adiacenti.splice(indice, 1);
        }
    }

    isAdiacente(nodo) {
        return this.adiacenti.indexOf(nodo) > -1;
    }

    getAdiacenti() {
        return this.adiacenti;
    }


    getId() {
        return this.id;
    }
}

class Arco {
    constructor(from, to) {
        //aggiungere riferimento all'elemento della lista degli archi nel grafo
        //same per liste entranti e uscenti dei due nodi from e to
        //può contenere 3 posizioni al nodo from e 3 al nodo to
        this.from = from;
        this.to = to;
    }

    aggiungiti() {
        this.from.aggiungiAdiacente(this.to);
    }
    rimuoviti() {
        //rimuovi da nodo
        const array = this.from.getAdiacenti();
        for (let i; i < array.lenght; i++) { //ciclo su tutto l'array
            if (array[i] == this.to) {
                array[i].rimuoviAdiacente(to);

            }
        }
        grafo.removeArco(this);
    }

    getSource() {
        return this.from;
    }

    getDestination() {
        return this.to;
    }
}



console.log("\n--------------PRIMO TEST CASE--------------\n")
var grafo = new Grafo();
grafo.addNodo(1);
grafo.addNodo(2);
grafo.addArco(grafo.nodi.get(1), grafo.nodi.get(2));


console.log(grafo.nodi);
console.log(grafo.archi);
console.log(grafo.nodi.get(1).getAdiacenti());
console.log(grafo.nodi.get(1).getId() + " ------ [EXPECTED 1]"); //must be 1
console.log((grafo.archi[0].getSource() == grafo.nodi.get(1)) + " ------ [EXPECTED TRUE]"); //must be true
console.log((grafo.archi[0].getDestination() == grafo.nodi.get(2)) + " ------ [EXPECTED TRUE]"); //must be true


console.log("\n--------------SECONDO TEST CASE--------------\n")
grafo.removeNodo(2);
grafo.archi[0].rimuoviti();
console.log(grafo.nodi);
console.log(grafo.nodi.get(1).getAdiacenti());
console.log("^ EXPECTED []");
console.log(grafo.archi);
console.log("^ EXPECTED []");

console.log("\n--------------TERZO TEST CASE--------------\n")
/**
 * 1) carico il file json come stringa in una variabile
 * 2) con parse trasformo la variabile in un oggetto, o array di oggetti
 * 3) stampo l'oggetto
 */

//Cancello tutto il contenuto del grafo
grafo.removeNodo(1);

import {
    readFileSync
} from "fs";



const jsonString = readFileSync("./nodi_salvati.json");
const nodiCaricati = JSON.parse(jsonString);

//aggiungi id nodo al grafo, RICORDATI CHE IN CASO DI PIù NODI NEL JSON è MEGLIO PRIMA CREARE TUTTI I NODI E POI TUTTI GLI ARCHI

nodiCaricati.forEach(nodo => {
    grafo.addNodo(nodo.id);
});

//aggiungi archi al grafo
nodiCaricati.forEach(nodo => {
    nodo.adiacenti.forEach(adiacente => {
        grafo.addArco(grafo.nodi.get(nodo.id), grafo.nodi.get(adiacente));
    });


});
console.log("Nodi da caricare:");
console.log(nodiCaricati);
console.log("Nodi caricati:");
console.log(grafo.nodi);
console.log("Archi caricati:");
console.log(grafo.archi);
console.log("Adiacenza caricate:")
grafo.nodi.forEach(nodo => {
    console.log(nodo.getAdiacenti());
});
//console.log((grafo.nodi.get(3)).getAdiacenti());

console.log("\n--------------QUARTO TEST CASE--------------\n")
//salvataggio file
//Nel nostro file json in ouput non vogliamo i campi superflui come i riferimenti ad altri oggetti


console.log("\n--------------QUINTO TEST CASE--------------\n")
//coerenza nel grafo json, esempio no archi verso nodi che non esistono