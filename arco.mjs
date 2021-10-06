export default class Arco {
    constructor(from, to) {
        //riferimenti lista archi grafo
        this.prevG;
        this.nextG;
        //riferimenti lista archi uscenti nodo
        this.prevUscN;
        this.nextUscN;
        //riferimenti lista archi entranti nodo
        this.prevEntrN;
        this.nextEntrN;
        //riferimenti a nodi agli estremi dell'arco
        this.from = from;
        this.to = to;
    }
};