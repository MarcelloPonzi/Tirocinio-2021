// Uso un set perchè prendo un limitato numero di coppie da un enorme insieme
// di coppie possibili. Ho quindi una bassa probabilità di scartare la stessa 
// coppia.

/**
 * Generatore di coppie random, funziona bene su 1000 nodi presi 10000 coppie
 * @param  {Array.<[Nodo]>} arrayNodi - l'array di nodi del grafo
 * @return {Array.<[Nodo, Nodo]>} Ritorna un'array di coppie di nodi del tipo [Nodo, Nodo]
 */

export default function generatoreCoppieRandom(arrayNodi) {
    // var arrayNum = new Array(arrayNodi.length);
    // for (let i = 0; i < arrayNodi.length; i++) {
    //     arrayNum[i] = i;
    // }
    //la dimensione max dell'arrayCoppie è la disposizione semplice, scelgo a piacere un numero minore di questo
    const numCoppie = 10000;
    var arrayCoppie = new Array(numCoppie);
    for (let i = 0; i <= numCoppie; i++) {
        var coppia = new Array(2);
        coppia[0] = Math.floor(Math.random() * arrayNodi.length);
        coppia[1] = Math.floor(Math.random() * arrayNodi.length);
        arrayCoppie.push(coppia);
    }
    return arrayCoppie;
}


function fattoriale(num) {
    var rval = 1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}