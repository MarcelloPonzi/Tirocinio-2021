//funzione che calcolca il k-core dei nodi del grafo passato come parametro
//e riorienta il grafo
export default function calcolatoreKCore(grafo) {
    grafo.calcolatoreMaxGrado();
    console.log("Il grado massimo è " + grafo.max_grado);
    //codice che controlla gli id siano uniformi e si sosseguano senza "salti"(condizione necessaria)
    //e in caso non lo siano li aggiusta
    let item = grafo.nodi.head;
    var idNodi = new Array(grafo.max_id_nodi).fill(0);
    while (item) {
        idNodi[item.obj.id] = item.obj;
        item = item.next;
    }
    let m = 0; //mancanti
    idNodi.forEach(nodo => {

        if (nodo == 0) {
            m++;
        } else {
            nodo.id = nodo.id - m;
        }
    })

    //STEP 1 misurazione grado dei nodi attraverso lunghezza lista adiacenze
    item = grafo.nodi.head;
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
    console.log("Sort: ");
    console.log(sort);

    //STEP 3
    //creo un array di nodi
    let arrayNodi = grafo.creaArrayNodi();
    //svuoto le liste entranti ed uscenti di ogni nodo
    arrayNodi.forEach(nodo => {
        nodo.archiUscenti.svuotaLista("uscPos");
        nodo.archiEntranti.svuotaLista("entrPos");
    });
    for (let i = 0; i < sort.length - 1; i++) {
        //n è oggetto nodo del grafo
        let n = arrayNodi[sort[i]];

        //a è arco adiacente al nodo n
        let a = n.archiAdiacenti.head;
        //u è oggetto nodo adiacente
        let u;
        while (a) {
            if (a.obj.from.id == n.id) {
                u = a.obj.to
            } else {
                u = a.obj.from
            };
            if (deg[u.id] > deg[n.id]) {
                deg[u.id] = deg[u.id] - 1;
                //riordina i nodi di G come nelle slides
                let temp = pos[sort[bin[deg[u.id] + 1]]]
                pos[sort[bin[deg[u.id] + 1]]] = pos[u.id];
                pos[u.id] = temp;
                temp = sort[pos[u.i]];
                sort[pos[u.i]] = sort[pos[temp]];
                sort[pos[temp]] = temp;
                bin[deg[u.id] + 1] + 1;
                //modifico l'arco
                //from è il nodo che sto eliminando, in modo da avere l'arco orientato uscendo
                a.obj.from = n;
                a.obj.to = u;
            }

            //passo al prossimo u adiacente a n
            a = a.next;
        }

    }
    item = grafo.archi.head;
    while (item) {
        //aggiunge arco alla lista degli archi uscenti dal nodo
        item.obj.from.archiUscenti.inserisciCoda(item.obj, 'uscPos');

        //aggiunge arco alla lista degli archi entranti nel nodo
        item.obj.to.archiEntranti.inserisciCoda(item.obj, 'entrPos');
        item = item.next;
    }


    return deg;
}