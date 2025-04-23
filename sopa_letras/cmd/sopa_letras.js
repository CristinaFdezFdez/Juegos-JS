import { createInterface } from 'readline';
// Palabras de la sopa de letras
const palabras = ["raton", "sol", "nube", "tren", "vino", "luz", "casa", "gato", "lago", "flor"];
// Tamaño sopa de letras
const SIZE = 20;

// Array para sopa vacia y llenar de letras random
let sopa = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
const letras = "abcdefghijklmnopqrstuvwxyz";

// Lista palabras no encontradas
let palabrasFalladas = [];

// Puntos del jugador
let puntos = 0;
// Configuramos readline para leer entrada del teclado
const teclado = createInterface({
    input: process.stdin,
    output: process.stdout
});

//Función para insertar palabras en la sopa horizontalmente

function insertarPalabras() {
    for (let palabra of palabras) {
        let fila = Math.floor(Math.random() * SIZE);
        let col = Math.floor(Math.random() * (SIZE - palabra.length));

        // Insertamos la palabra
        for (let i = 0; i < palabra.length; i++) {
            sopa[fila][col + i] = palabra[i];
        }
    }
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (!sopa[i][j]) {
                sopa[i][j] = letras[Math.floor(Math.random() * letras.length)];
            }
        }
    }
}

insertarPalabras();


// Función para mostrar la sopa por consola 
function imprimirConsola() {
    process.stdout.write("\x1Bc"); // Limpia la pantalla
    process.stdout.write("\nSOPA DE LETRAS\n");
    sopa.forEach(fila => process.stdout.write(fila.join(" ") + "\n"));
    process.stdout.write("\nPalabras falladas: " + palabrasFalladas.join(", ") + "\n");
    process.stdout.write(`Puntos ganados: ${puntos}\n`);
}

//Función para buscar palabras
function buscarPalabras() {
    for (let fila = 0; fila < SIZE; fila++) {
        const filaTexto = sopa[fila].join("");
        const index = filaTexto.indexOf(palabra);
        if (index !== -1) {
            //Palabra encontrada
            for (let i = 0; i < palabra.length; i++) {
                sopa[fila][index + i] = palabra[i].toUpperCase();
            }
            return true;
        }
    }
    return false;
};

imprimirConsola();
