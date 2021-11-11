import Grafo from "./grafo.mjs";
import Nodo from "./nodo.mjs";
import Arco from "./arco.mjs";
import calcolatoreKCore from "./batagelj.mjs";
import {
    readFileSync,
    writeFile
} from "fs";
import {
    GraphMLParser
} from "graphml-js";


//FUNZIONI CREAZIONE GRAFO

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

function graphmlAGrafo(graph) {
    graph.nodes.forEach(nodo => {
        grafo.aggiungiNodo();

    });
    graph.edges.forEach(arco => {
        //per ogni arco cerco i nodi con l'id uguale al from e al to dell'oggetto json
        let nodoFrom = null; //riferimento a nodo from cercato
        let nodoTo = null; //riferimento a nodo to cercato
        let item = grafo.nodi.head;
        while (item) {
            //prendo il char in pos 1 perchè yed stampa gli id in forma n1 (nodi) e1(archi)
            if (arco._source[1] == item.obj.id) nodoFrom = item.obj;
            if (arco._target[1] == item.obj.id) nodoTo = item.obj;
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

function nuovoNodoUtente(grafo) {
    grafo.aggiungiNodo(new Nodo(grafo.max_id_nodi));
}

function nuovoArcoUtente(grafo, nodoFrom, nodoTo) {
    grafo.aggiungiArco(new Arco(grafo.max_id_archi, nodoFrom, nodoTo));
}


//FUNZIONI DI SALVATAGGIO

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

function salvaGraphmlGrafo(grafo) {
    //converto i nodi
    let item = grafo.nodi.head;
    var graphml = new String("\<?xml version=\"1.0\" encoding=\"UTF-8\"?\><graphml xmlns=\"http:\//graphml.graphdrawing.org/xmlns\" xmlns:xsi=\"http:\//www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http:\//graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd\"><graph id=\"G\" edgedefault=\"directed\">");
    while (item) {
        graphml = graphml.concat("", item.obj.inGraphml());
        item = item.next;
    }
    //converto gli archi
    item = grafo.archi.head;
    while (item) {
        graphml = graphml.concat("", item.obj.inGraphml());
        item = item.next;
    }
    graphml = graphml.concat("", "</graph></graphml>");
    //salvo in nuovo file
    writeFile("output.graphml", graphml.toString(), function (err) {
        if (err) {
            console.log(err);
        }
    });
}


//FUNZIONI CONTROLLO ADIACENZA

//funzione che controlla l'adiacenza dei nodi dopo che il grafo è stato riordinato
function verificaAdiacenzaRiordinato(nodo1, nodo2) {
    let item = nodo1.archiUscenti.head;
    while (item) {
        if (item.obj.to === nodo2) {
            console.log("I nodi " + nodo1.id + " e " + nodo2.id + " sono adiacenti.");
            return true;
        } else item = item.next;
    }
    item = nodo2.archiUscenti.head;
    while (item) {
        if (item.obj.to === nodo1) {
            console.log("I nodi " + nodo1.id + " e " + nodo2.id + " sono adiacenti.");
            return true
        } else item = item.next;
    }
    console.log("I nodi " + nodo1.id + " e " + nodo2.id + " non sono adiacenti.");
    return false;
}
//-------------------START------------------------
//crezione grafo
const grafo = new Grafo();

//lettura GRAPHML
var graphmlString = readFileSync("./input.graphml")
var parser = new GraphMLParser();
parser.parse(graphmlString, function (err, graph) {
    console.log(graph)
    //creazione array di oggetti da parsed graphml
    graphmlAGrafo(graph);
});

grafo.stampaNodi();
grafo.stampaArchi();


console.log("\nCalcolo K core dei nodi")
//in realtà è un riordinatore
let core = calcolatoreKCore(grafo);
console.log("Core number dei nodi: ")
console.log(core);

let item = grafo.nodi.head;
while (item) {
    console.log("NODO: " + item.obj.id);
    grafo.stampaArchiUscentiNodo(item.obj);
    grafo.stampaArchiEntrantiNodo(item.obj);
    grafo.stampaArchiAdiacentiNodo(item.obj);
    item = item.next;
}

salvaGraphmlGrafo(grafo);