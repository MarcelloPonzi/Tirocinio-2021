import testCancellazioneOggetti from "./Test/testCancellazioneOggetti.mjs";
import testCreazioneOggetti from "./Test/testCreazioneOggetti.mjs";
import Grafo from "./grafo.mjs";
import Nodo from "./nodo.mjs";
import Arco from "./arco.mjs";
import {
    readFileSync,
    writeFile
} from "fs";




//lettura file json
const jsonString = readFileSync("./nodi_e_archi_salvati.json");
//creazione array di oggetti da json
const grafoDaCaricare = JSON.parse(jsonString);

//crezione grafo
const grafo = new Grafo();



//funzione che converte una stringa json in un oggetto e lo aggiunge al grafo
function jsonAGrafo(grafoDaCaricare) {
    grafoDaCaricare.nodi.forEach(nodo => {
        grafo.aggiungiNodo();

    });
    grafoDaCaricare.archi.forEach(arco => {
        //per ogni arco cerco i nodi con l'id uguale al from e al to dell'oggetto json
        let nodoFrom = null; //riferimento a nodo from cercato
        let nodoTo = null; //riferimento a nodo to cercato
        let corrente = grafo.nodi.head;
        while (corrente) {
            //COERENZA GRAFO

            if (arco.from == corrente.id) nodoFrom = corrente;
            if (arco.to == corrente.id) nodoTo = corrente;
            corrente = corrente.next;
        }
        //trovati i nodi corretti e ottenuti i riferimenti a questi, aggiungo l'arco
        //se e solo se possiede entrambi i riferimenti ai nodi (Coerenza del grafo, 
        //non posso avere un arco tra nodi non esistenti)
        if (nodoFrom !== null && nodoTo !== null) {
            grafo.aggiungiArco(new Arco(nodoFrom, nodoTo));
            console.log("Arco " + nodoFrom.id + " -> " + nodoTo.id + " aggiunto");
        }
    });
}

function salvaJsonGrafo() {
    //converto i nodi
    let corrente = grafo.nodi.head;
    var json = "{\"nodi\":[";
    while (corrente) {
        json = json + corrente.inJson();
        if (corrente.next !== null) { //PROBLEMA: QUA FUNZIONA CORRETTAMENTE E PUNTA A NULL
            json = json + ",";
        }
        corrente = corrente.next;
    }
    //converto gli archi
    json = json + "],\"archi\":[";
    corrente = grafo.archi.head;
    while (corrente) {
        json = json + corrente.inJson();
        if (corrente.nextG !== undefined) { //PROBLEMA: QUA NON FUNZIONA CORRETTAMENTE SE PUNTA A NULL, L'ULTIMO DELLA LISTA PUNTA A UNDEFINED
            json = json + ",";
        }
        corrente = corrente.nextG;
    }
    json = json + "]}";

    //salvo in nuovo file
    writeFile("testJson.json", json, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function nuovoNodoUtente() {
    grafo.aggiungiNodo(new Nodo(grafo.id_max));
}

function nuovoArcoUtente(nodoFrom, nodoTo) {
    grafo.aggiungiArco(new Arco(nodoFrom, nodoTo));
}

//                             TEST                    
console.log("\n -------------TEST---------------")
console.log("Nodi da caricare:");
console.log(grafoDaCaricare);
jsonAGrafo(grafoDaCaricare);
grafo.stampaArchi();
grafo.stampaNodi();
console.log("\n--------------------------------")
let corrente = grafo.nodi.head;
while (corrente) {
    console.log("NODO: " + corrente.id);
    //console.log(grafo.stampaArchiUscentiNodo(corrente));
    //console.log(grafo.stampaArchiEntrantiNodo(corrente));
    grafo.stampaArchiAdiacentiNodo(corrente);
    corrente = corrente.next;
}


//Converto gli oggetti in file json
salvaJsonGrafo();