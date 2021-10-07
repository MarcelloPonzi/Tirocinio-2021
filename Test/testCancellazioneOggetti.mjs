import Grafo from "../grafo.mjs";
import Nodo from "../nodo.mjs";
import Arco from "../arco.mjs";

export default function testCancellazioneOggetti() {
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

    console.log("\nTEST CANCELLAZIONE OGGETTI")

    grafo.cancellaGrafo();

    console.log("\nCancellazione liste grafo:")
    console.log("Lista archi vuota:")
    if (grafo.archi.dimensione == 0) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };
    console.log("Lista nodi vuota:")
    if (grafo.nodi.dimensione == 0) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log("\nCancellazione liste dei nodi");
    console.log('N1:');
    if (n1.archiUscenti.dimensione == 0 && n1.archiEntranti.dimensione == 0) console.log("PASS")
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log('N2:');
    if (n2.archiUscenti.dimensione == 0 && n2.archiEntranti.dimensione == 0) console.log("PASS")
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log('N3:');
    if (n3.archiUscenti.dimensione == 0 && n3.archiEntranti.dimensione == 0) console.log("PASS")
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log("\nCancellazione riferimenti degli archi");
    console.log('A1:');
    console.log("Riferimenti lista grafo:")
    if (a1.nextG == null && a1.prevG == null) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log("Riferimenti lista nodo uscente:")
    if (a1.nextUscN == null && a1.prevUscN == null) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log("Riferimenti lista nodo entrante:")
    if (a1.nextEntrN == null && a1.nextEntrN == null) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log("Riferimenti nodo from e to:")
    if (a1.from == null && a1.to == null) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };
    console.log('A2:');
    console.log("Riferimenti lista grafo:")
    if (a2.nextG == null && a2.prevG == null) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log("Riferimenti lista nodo uscente:")
    if (a2.nextUscN == null && a2.prevUscN == null) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log("Riferimenti lista nodo entrante:")
    if (a2.nextEntrN == null && a2.nextEntrN == null) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };

    console.log("Riferimenti nodo from e to:")
    if (a2.from == null && a2.to == null) console.log("PASS");
    else {
        console.log("FAILED");
        passed = false;
    };

    if (passed) console.log("TEST PASSATO");
    else console.log("TEST FALLITO");
}