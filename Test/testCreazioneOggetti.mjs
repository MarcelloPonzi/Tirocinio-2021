import Grafo from "../grafo.mjs";
import Nodo from "../nodo.mjs";
import Arco from "../arco.mjs";


export default function testCreazioneOggetti() {
    const passed = true;
    const grafo = new Grafo();
    //creazione oggetti
    const n1 = new Nodo(1);
    const n2 = new Nodo(2);
    const n3 = new Nodo(3);
    const a1 = new Arco(n1, n2);
    const a2 = new Arco(n1, n3);
    //aggiunta oggetti alle liste
    grafo.aggiungiNodo(n1);
    grafo.aggiungiNodo(n2);
    grafo.aggiungiNodo(n3);
    grafo.aggiungiArco(a1);
    grafo.aggiungiArco(a2);

    console.log("\nTEST CREAZIONE OGGETTI")
    //controllo dimensioni liste
    console.log("\nlista di tutti i nodi: ")
    if (grafo.nodi.dimensione == 3) console.log("PASS");
    else {
        console.log("FAILED");
        passed = 0;
    };
    console.log("lista di tutti gli archi: ")
    if (grafo.archi.dimensione == 2) console.log("\PASS");
    else {
        console.log("FAILED");
        passed = 0;
    };
    console.log("archi uscenti da n1: ")
    if (n1.archiUscenti.dimensione == 2) console.log("PASS");
    else {
        console.log("FAILED");
        passed = 0;
    };
    console.log("archi uscenti da n2: ")
    if (n2.archiUscenti.dimensione == 0) console.log("PASS");
    else {
        console.log("FAILED");
        passed = 0;
    };
    console.log("archi uscenti da n3: ")
    if (n3.archiUscenti.dimensione == 0) console.log("PASS");
    else {
        console.log("FAILED");
        passed = 0;
    };
    console.log("archi entranti in n1: ")
    if (n1.archiEntranti.dimensione == 0) console.log("PASS");
    else {
        console.log("FAILED");
        passed = 0;
    };
    console.log("archi entranti in n2: ")
    if (n2.archiEntranti.dimensione == 1) console.log("PASS");
    else {
        console.log("FAILED");
        passed = 0;
    };
    console.log("archi entranti in n3: ")
    if (n3.archiEntranti.dimensione == 1) console.log("PASS");
    else {
        console.log("FAILED");
        passed = 0;
    };

    if (passed) console.log("TEST PASSATO");
    else console.log("TEST FALLITO");
}