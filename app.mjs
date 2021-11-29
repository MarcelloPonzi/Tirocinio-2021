import Grafo from "./grafo.mjs";
import Nodo from "./nodo.mjs";
import Arco from "./arco.mjs";
import {
    appendFile,
    appendFileSync,
    readFileSync,
    writeFile,
    writeFileSync
} from "fs";
import {
    GraphMLParser
} from "graphml-js";
import riorientatorePerCore from "./batagelj.mjs";
import generatoreCoppieRandom from "./generatoreCoppieRandom.mjs"
import {
    performance
} from "perf_hooks";
import {
    sumSimple
} from "simple-statistics";

//Tipi di grafo da caricare:
const planare1000n0_5ne = "./planar_1000n_0,5ne.graphml";
const planare1000n1ne = "./planar_1000n_1ne.graphml";
const planare1000n1_5ne = "./planar_1000n_1,5ne.graphml";
const planare1000nmaxe = "./planar_1000n_maxe.graphml";
const albero1000n5d5c = "./tree_1000n_depth5_child5.graphml";
const random1000n1ne = "./random_1000n_1ne.graphml";
const random1000n2ne = "./random_1000n_2ne.graphml";
const random1000n5ne = "./random_1000n_5ne.graphml";
const input = [planare1000n0_5ne, planare1000n1ne, planare1000n1_5ne, planare1000nmaxe, albero1000n5d5c, random1000n1ne, random1000n2ne, random1000n5ne];

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
    let arrayNodi = grafo.creaArrayNodi();
    graph.edges.forEach(arco => {
        //per ogni arco cerco i nodi con l'id uguale al from e al to dell'oggetto json
        let nodoFrom = null; //riferimento a nodo from cercato
        let nodoTo = null; //riferimento a nodo to cercato

        //elimino il char in pos 0 perchè yed stampa gli id in forma n1 (nodi) e1(archi)
        var fromId = new String(arco._source);
        fromId = fromId.slice(1);
        var toId = new String(arco._target);
        toId = toId.slice(1);
        //assegno i Nodo cercandoli in base all'indice nell'array
        nodoFrom = arrayNodi[fromId];
        nodoTo = arrayNodi[toId];
        //trovati i nodi corretti e ottenuti i riferimenti a questi, aggiungo l'arco
        //se e solo se possiede entrambi i riferimenti ai nodi (Coerenza del grafo, 
        //non posso avere un arco tra nodi non esistenti)
        if (nodoFrom !== null && nodoTo !== null) {
            grafo.aggiungiArco(nodoFrom, nodoTo);
        }
    });
    arrayNodi = null;
}

function nuovoNodoUtente(grafo) {
    grafo.aggiungiNodo();
}

function nuovoArcoUtente(grafo, nodoFrom, nodoTo) {
    grafo.aggiungiArco(nodoFrom, nodoTo);
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
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
//funzione che controlla l'adiacenze dei nodi
function verificaAdiacenza(nodo1, nodo2) {
    const t1 = performance.now();
    let item = nodo1.archiEntranti.head;
    while (item) {
        controlli1++;
        if (item.obj.from === nodo2) {
            //console.log("I nodi " + nodo1.id + " e " + nodo2.id + " sono adiacenti.")
            const t2 = performance.now();
            return t2 - t1;
        } else item = item.next;
    }
    item = nodo1.archiUscenti.head;
    while (item) {
        controlli1++;
        if (item.obj.to === nodo2) {
            //console.log("I nodi " + nodo1.id + " e " + nodo2.id + " sono adiacenti.")
            const t2 = performance.now();
            return t2 - t1;
        } else item = item.next;
    }
    //console.log("I nodi " + nodo1.id + " e " + nodo2.id + " non sono adiacenti."); 
    const t2 = performance.now();
    return t2 - t1;
}
//funzione che controlla l'adiacenza dei nodi dopo che il grafo è stato riorientato usando solo la lista degli uscenti
function verificaAdiacenzaRiorientato(nodo1, nodo2) {
    const t1 = performance.now();
    let item = nodo1.archiUscenti.head;
    while (item) {
        controlli2++;
        if (item.obj.to === nodo2) {
            //console.log("I nodi " + nodo1.id + " e " + nodo2.id + " sono adiacenti.");
            const t2 = performance.now();
            return t2 - t1;
        } else item = item.next;
    }
    item = nodo2.archiUscenti.head;
    while (item) {
        controlli2++;
        if (item.obj.to === nodo1) {
            //console.log("I nodi " + nodo1.id + " e " + nodo2.id + " sono adiacenti.");
            const t2 = performance.now();
            return t2 - t1;
        } else item = item.next;
    }
    //console.log("I nodi " + nodo1.id + " e " + nodo2.id + " non sono adiacenti.");
    const t2 = performance.now();
    return t2 - t1;
}





//-------------------START------------------------
//crezione grafo
var grafo = new Grafo();
var controlli1 = 0;
var controlli2 = 0;
const n = 100;

//lettura GRAPHML
var graphmlString = readFileSync(planare1000n1_5ne);
var parser = new GraphMLParser();
parser.parse(graphmlString, function (err, graph) {
    //creazione array di oggetti da parsed graphml
    graphmlAGrafo(graph);
});

//Creo array di nodi
const arrayNodi = grafo.creaArrayNodi();
//Creo array coppie di num random
var arrayCoppie = generatoreCoppieRandom(arrayNodi);

//misuro il tempo sul grafo non riorientato
var temp = 0;
var tempoPeggiore1 = 0;
const t3 = performance.now();
arrayCoppie.forEach(coppia => {
    for (let i = 0; i < n; i++) {
        temp = temp + verificaAdiacenza(arrayNodi[coppia[0]], arrayNodi[coppia[1]]);
        if (temp > tempoPeggiore1) {
            tempoPeggiore1 = temp;
        }
    }
});
const t4 = performance.now();



//rioriento il grafo
console.log("\nCalcolo K core dei nodi e rioriento il grafo")
let core = riorientatorePerCore(grafo);

//Parametri caratterizzanti il grafo
var coreMassimo = 0;
for (let i = 0; i <= core.length - 1; i++) {
    if (coreMassimo < core[i]) {
        coreMassimo = core[i];
    }
}
var coreMedio = Math.floor(sumSimple(core) / core.length);

var gradoMassimo = grafo.max_grado;
var gradoMedio = (2 * grafo.archi.dimensione) / grafo.nodi.dimensione;

var tempoPeggiore2 = 0;
//misuro il tempo sul grafo riorientato
const a1 = performance.now();
temp = 0;
//misuro ogni coppia n volte per ridurre la latenza
arrayCoppie.forEach(coppia => {
    for (let i = 0; i < n; i++) {
        temp = temp + verificaAdiacenzaRiorientato(arrayNodi[coppia[0]], arrayNodi[coppia[1]]);
        if (temp > tempoPeggiore2) {
            tempoPeggiore2 = temp;
        }
    }

});
const a2 = performance.now();
//Aggiusto controlli e tempi compensando gli n controlli su ogni coppia 
controlli1 = controlli1 / n;
controlli2 = controlli2 / n;
tempoPeggiore1 = tempoPeggiore1 / n;
tempoPeggiore2 = tempoPeggiore2 / n;
//Stampa statistiche
console.log("verificaAdiacenza ha impiegato " + (t4 - t3) + " millisecondi con tempo medio= " + (t4 - t3) / controlli1 + " e con tempo peggiore = " + tempoPeggiore1);
console.log("verificaAdiacenzaRiorientato ha impiegato " + (a2 - a1) + " millisecondi con tempo medio= " + (a2 - a1) / controlli2 + " e con tempo peggiore = " + tempoPeggiore2);

var statistiche1 = '\n\n-Non riorientato    --> Tempo medio: ' + ((t4 - t3) / controlli1).toFixed(5) + ' ms    Tempo peggiore: ' + tempoPeggiore1.toFixed(5) + ' ms';
var statistiche2 = '\n-Riorientato     --> Tempo medio: ' + ((a2 - a1) / controlli2).toFixed(5) + ' ms   Tempo peggiore: ' + tempoPeggiore2.toFixed(5) + ' ms    Archi riorientati: ' + grafo.archiRiorientati;
appendFileSync("Statistiche.txt", "\nInput file graph: " + input + "\nGrado massimo: " + gradoMassimo + " Grado medio: " + gradoMedio + "\nCore massimo: " + coreMassimo + ' Core medio: ' + coreMedio + statistiche1 + statistiche2, "UTF-8", {
    'flags': 'a+'
});

salvaGraphmlGrafo(grafo);