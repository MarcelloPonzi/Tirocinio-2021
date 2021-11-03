export default function calcolatoreKCore(grafo) {
    grafo.calcolatoreMaxGrado();
    console.log("Il grado massimo è " + grafo.max_grado);
    //funzione che controlla gli id siano uniformi e si sosseguano senza "salti"
    //TODO
    //creo array di adiacenze
    var adiacenze = grafo.creaAdiacenze();
    //STEP 1 misurazione grado dei nodi attraverso lunghezza lista adiacenze
    let item = grafo.nodi.head;
    var deg = new Array(grafo.nodi.dimensione - 1);
    while (item) {
        let nodo = item.obj
        deg[nodo.id] = nodo.archiAdiacenti.dimensione;
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
    for (let d = 0; d <= bin.length - 1; d++) {
        let num = bin[d];
        bin[d] = start;
        start = start + num;
    }
    console.log("Bin step 2.1: ")
    console.log(bin)

    //STEP 2.3 itera tra gli elementi di deg e inserisci gli id dei nodi nel
    //bin corrispondente
    var sort = new Array(grafo.nodi.dimensione - 1);
    for (let n = 0; n <= deg.length - 1; n++) {
        sort[bin[deg[n]]] = n;
        bin[deg[n]] = bin[deg[n]] + 1
    }
    console.log("Sort a step 2.3: ")
    console.log(sort);
    console.log("Bin a step 2.3:")
    console.log(bin);
    //STEP 2.4 resetta i valori di bin all'inizio di ogni blocchetto
    //errore nelle slides??Deve partire da max_grado e non max_grado-1
    for (let d = grafo.max_grado; d >= 1; d--) {
        bin[d] = bin[d - 1];
    }
    bin[0] = 0;
    console.log("Bin step 2.4 con valori riportati indietro:");
    console.log(bin);
    var pos = new Array(grafo.nodi.dimensione - 1);
    for (let i = 0; i <= grafo.nodi.dimensione - 1; i++) {
        pos[sort[i]] = i;
    }
    console.log("Pos: ");
    console.log(pos);

    //STEP 3
    //n è nodo del grafo
    for (let i = 0; i < sort.length - 1; i++) {
        //a è arco adiacente al nodo n
        let a = adiacenze[sort[i]].head;
        //u è oggetto nodo adiacente
        let u;
        while (a) {
            if (a.obj.from.id == sort[i]) {
                u = a.obj.to
            } else {
                u = a.obj.from
            };
            if (deg[u.id] > deg[sort[i]]) {
                deg[u.id] = deg[u.id] - 1;
                //riordina i nodi di G come nelle slides
                let temp = pos[sort[bin[deg[u.id] + 1]]]
                pos[sort[bin[deg[u.id] + 1]]] = pos[u.id];
                pos[u.id] = temp;
                temp = sort[pos[u.i]];
                sort[pos[u.i]] = sort[pos[temp]];
                sort[pos[temp]] = temp;
                bin[deg[u.id] + 1] + 1;
                //passo al prossimo u adiacente a n
            }
            a = a.next;
        }
    }
    return deg;
}