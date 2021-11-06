import Grafo from "./grafo.mjs";
import Nodo from "./nodo.mjs";
import Arco from "./arco.mjs";
import calcolatoreKCore from "./batagelj.mjs";
import {
    readFileSync,
    writeFile
} from "fs";


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

function salvaJsonGrafo(grafo) {
    //converto i nodi
    let item = grafo.nodi.head;
    var json = "{\"nodi\":[";
    while (item) {
        json = json + item.obj.inJson();
        if (item.next !== null) {
            json = json + ",";
        }
        item = item.next;
    }
    //converto gli archi
    json = json + "],\"archi\":[";
    item = grafo.archi.head;
    while (item) {
        json = json + item.obj.inJson();
        if (item.next !== null) {
            json = json + ",";
        }
        item = item.next;
    }
    json = json + "]}";

    //salvo in nuovo file
    writeFile("salvato.json", json, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function nuovoNodoUtente(grafo) {
    grafo.aggiungiNodo(new Nodo(grafo.max_id_nodi));
}

function nuovoArcoUtente(grafo, nodoFrom, nodoTo) {
    grafo.aggiungiArco(new Arco(grafo.max_id_archi, nodoFrom, nodoTo));
}


//Test per scrittura corretta

console.log("\n -------------TEST---------------")
//lettura file json
const jsonString = readFileSync("./nodiArchiTest.json");
//creazione array di oggetti da json
const grafoDaCaricare = JSON.parse(jsonString);
console.log("Nodi da caricare:");
console.log(grafoDaCaricare);
//crezione grafo
const grafo = new Grafo();
// console.log(grafoDaCaricare);
jsonAGrafo(grafoDaCaricare);
// grafo.stampaNodi();
// grafo.stampaArchi();
console.log("\n--------------------------------")
let item = grafo.nodi.head;
// while (item) {
//     console.log("NODO: " + item.obj.id);
//     grafo.stampaArchiUscentiNodo(item.obj);
//     grafo.stampaArchiEntrantiNodo(item.obj);
//     grafo.stampaArchiAdiacentiNodo(item.obj);
//     item = item.next;
// }
console.log("\nCalcolo K core dei nodi")
let core = calcolatoreKCore(grafo);
console.log("Core number dei nodi: ")
console.log(core);
salvaJsonGrafo(grafo);