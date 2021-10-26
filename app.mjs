import testCancellazioneOggetti from "./Test/testCancellazioneOggetti.mjs";
import testCreazioneOggetti from "./Test/testCreazioneOggetti.mjs";
import calcolatoreKCore from "./batagelj.mjs";
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
        let item = grafo.nodi.head;
        while (item) {
            //COERENZA GRAFO

            if (arco.from == item.obj.id) nodoFrom = item.obj;
            if (arco.to == item.obj.id) nodoTo = item.obj;
            item = item.next;
        }
        //trovati i nodi corretti e ottenuti i riferimenti a questi, aggiungo l'arco
        //se e solo se possiede entrambi i riferimenti ai nodi (Coerenza del grafo, 
        //non posso avere un arco tra nodi non esistenti)
        if (nodoFrom !== null && nodoTo !== null) {
            grafo.aggiungiArco(nodoFrom, nodoTo);
        }
    });
}

function salvaJsonGrafo() {
    //converto i nodi
    let item = grafo.nodi.head;
    var json = "{\"nodi\":[";
    while (item) {
        json = json + item.obj.inJson();
        if (item.next !== null) { //PROBLEMA: QUA FUNZIONA CORRETTAMENTE E PUNTA A NULL
            json = json + ",";
        }
        item = item.next;
    }
    //converto gli archi
    json = json + "],\"archi\":[";
    item = grafo.archi.head;
    while (item) {
        json = json + item.obj.inJson();
        if (item.next !== undefined) { //PROBLEMA: QUA NON FUNZIONA CORRETTAMENTE SE PUNTA A NULL, L'ULTIMO DELLA LISTA PUNTA A UNDEFINED
            json = json + ",";
        }
        item = item.next;
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
    grafo.aggiungiNodo(new Nodo(grafo.max_id_nodi));
}

function nuovoArcoUtente(nodoFrom, nodoTo) {
    grafo.aggiungiArco(new Arco(grafo.max_id_archi, nodoFrom, nodoTo));
}

//                             TEST                    
console.log("\n -------------TEST---------------")
console.log("Nodi da caricare:");
console.log(grafoDaCaricare);
jsonAGrafo(grafoDaCaricare);
grafo.stampaNodi();
grafo.stampaArchi();
console.log("\n--------------------------------")
let item = grafo.nodi.head;
while (item) {
    console.log("NODO: " + item.obj.id);
    grafo.stampaArchiUscentiNodo(item.obj);
    grafo.stampaArchiEntrantiNodo(item.obj);
    grafo.stampaArchiAdiacentiNodo(item.obj);
    item = item.next;
}
grafo.calcolatoreMaxGrado();
console.log("Il grado massimo è " + grafo.max_grado);
console.log("\nCalcolo K core dei nodi")
calcolatoreKCore(grafo);

//Converto gli oggetti in file json
salvaJsonGrafo();