export default function calcolatoreKCore(grafo) {
    //STEP 1 misurazione grado dei nodi attraverso lunghezza lista adiacenze
    let item = grafo.nodi.head;
    var deg = [grafo.nodi.dimensione - 1];
    while (item) {
        let nodo = item.obj
        nodo.grado = nodo.archiAdiacenti.dimensione;
        deg[nodo.id] = nodo.grado;
        item = item.next
    }

    //STEP 2 inizializza bin con il numero di elementi che hanno quel grado
    item = grafo.nodi.head;
    var bin = new Array(grafo.max_grado + 1).fill(0);
    for (let i = 0; i <= deg.length - 1; i++) {
        bin[deg[i]]++;
    }
    console.log("Deg e bin step 2: ")
    console.log(deg);
    console.log(bin);
    //STEP 2.1 Modifica l'array bin con il numero degli elementi che hanno i valori
    //inferiori al grado dato
    var start = 0;
    for (let d = 0; d <= deg.lenght - 1; d++) {
        let num = bin[d];
        bin[d] = start;
        start = start + num;
    }
    console.log("Bin step 2.1: ")
    console.log(bin)

    //STEP 3 itera tra gli elementi di deg e inserisci gli id dei nodi nel
    //bin corrispondente
    let sort = [grafo.nodi.dimensione - 1];
    for (let i = 0; i <= deg.length - 1; i++) {
        sort[bin[deg[i]]] = i;
        bin[deg[i]] = bin[deg[i]] + 1
    }
    //STEP 4 resetta i valori di bin all'inizio di ogni blocchetto
    // for (let i = grafo.max_grado; i <= bin.length) {
    //parto dall'ultima cella e vado verso la prima, sostituisco il valore dell'ultima cella
    //con quello precedente
    // }
}