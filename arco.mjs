class Arco {
    constructor(id) {
        this.id = id;
        //riferimenti lista doppiamente concatenata grafo
        this.prevG;
        this.nextG;
        //riferimenti lista doppiamente concatenata grafo
        this.prevN;
        this.nextN;
        this.from;
        this.to;
        //Si potrebbero aggiungere altri riferimenti in caso di liste di archi uscenti ed entranti separate
    }
};