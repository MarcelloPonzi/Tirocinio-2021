export default class Arco {
    constructor(id, from, to) {
        this.id = id;
        this.from = from;
        this.to = to;
        //riferimento item list archi del grafo
        this.pos = null;
        //riferimenti item list archi adiacenti dei nodi from e pos
        this.fromPos = null;
        this.toPos = null;
        //riferimento item list archi uscenti nodo from
        this.uscPos = null;
        //riferimento item list archi entranti nodo to
        this.entrPos = null;
    }

    inJson() {
        var st = "{\"id\":" + this.id + "," + "\"from\":" + this.from.id + "," +
            "\"to\":" + this.to.id + "}";
        return st;
    }
};