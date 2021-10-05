"use strict";
import Nodo from './nodo.mjs';
import Arco from './arco.mjs';
import Grafo from './grafo.mjs';

const grafo = new Grafo();
let n1= new Nodo(1);
let n2= new Nodo(2);
let n3= new Nodo(3);
let n4= new Nodo(4);

grafo.aggiungiNodo(n1);
grafo.aggiungiNodo(n1);
grafo.aggiungiNodo(n2);
grafo.aggiungiNodo(n3);
grafo.listaNodi.svuotaLista();
grafo.aggiungiNodo(n1);
grafo.aggiungiNodo(n1);


grafo.stampaNodi();



