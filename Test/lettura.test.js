import * from '../app';
//test lettura del file nodiArchi.json corretta

//lettura file json
const jsonString = readFileSync("./nodiArchiTest.json");
//creazione array di oggetti da json
const grafoDaCaricare = JSON.parse(jsonString);
jsonAGrafo(grafoDaCaricare);
test('Controllo dimensione lista nodi', () => {
    expect(grafo.nodi.dimensione).toBe(8);
});
test('Controllo dimensione lista archi', () => {
    expect(grafo.archi.dimensione).toBe(10);
});