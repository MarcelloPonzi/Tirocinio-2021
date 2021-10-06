"use strict";
import Nodo from './nodo.mjs';
import Arco from './arco.mjs';
import Grafo from './grafo.mjs';

const grafo = new Grafo();
const n1 = new Nodo(1);
const n2 = new Nodo(2);
const n3 = new Nodo(3);

const a1 = new Arco(n1, n2);
const a2 = new Arco(n1, n3);

grafo.aggiungiNodo(n1);
grafo.aggiungiNodo(n2);
grafo.aggiungiNodo(n3);

grafo.aggiungiArco(a1);
grafo.aggiungiArco(a2);

grafo.stampaNodi();
grafo.stampaArchi();