export default function calcolatoreKCore(grafo) {
    //STEP 1 misurazione grado dei nodi attraverso lunghezza lista adiacenze
    let corrente = grafo.nodi.head;
    let deg = [];
    while (corrente) {
        corrente.grado = corrente.archiAdiacenti.length;
        deg[corrente.id] = corrente.grado;
        corrente = corrente.next
    }

    //STEP 2 inizializza bin con il numero di elementi che hanno quel grado
    corrente = grafo.nodi.head;
    let bin = new Array(grafo.max_grado).fill(0);
    for (let i = 0; i <= deg.length; i++) {
        bin[deg[i]]++;
    }
    console.log("Def e bin: ")
    console.log(deg);
    console.log(bin);
    //STEP 3 itera tra gli elementi di deg e inserisci gli id dei nodi nel
    //bin corrispondente
    let sort = [];
    for (let i = 0; i <= deg.length; i++) {
        sort[bin[deg[i]]] = i;
        bin[deg[i]] = bin[deg[i]] + 1
    }
    //STEP 4 resetta i valori di bin all'inizio di ogni blocchetto
    // for (let i = grafo.max_grado; i <= bin.length) {
    //parto dall'ultima cella e vado verso la prima, sostituisco il valore dell'ultima cella
    //con quello precedente
    // }
}