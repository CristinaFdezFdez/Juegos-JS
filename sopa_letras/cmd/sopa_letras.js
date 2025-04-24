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

// Lista palabras encontradas
let palabrasAcertadas = [];

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
    process.stdout.write("-------------------\n");

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (typeof sopa[i][j] === 'object') {
                process.stdout.write(`\x1B[32m${sopa[i][j].letra}\x1B[0m `); // Pintamos la letra de verde
            } else {
                process.stdout.write(`${sopa[i][j]} `);
            }
        }
        process.stdout.write("\n");
    }
    process.stdout.write("\nPalabras falladas: " + palabrasFalladas.join(", ") + "\n");
    process.stdout.write("\nPalabras acertadas: " + palabrasAcertadas.join(", ") + "\n");
    process.stdout.write(`\nPuntos: ${puntos}\n`);
}

//Función para buscar palabras
function buscarPalabras(palabra) {
    let encontrada = false;
    for (let fila = 0; fila < SIZE; fila++) {
        const filaTexto = sopa[fila].join("");
        const index = filaTexto.indexOf(palabra);
        if (index !== -1) {
            //Palabra encontrada
            for (let i = 0; i < palabra.length; i++) {
                sopa[fila][index + i] = { letra: palabra[i].toUpperCase(), encontrada: true };
            }
            encontrada = true;
        }
    }
    // Buscamos en columnas
    for (let col = 0; col < SIZE; col++) {
        let columnaTexto = "";
        for (let fila = 0; fila < SIZE; fila++) {
            columnaTexto += sopa[fila][col];
        }
        const index = columnaTexto.indexOf(palabra);
        if (index !== -1) {
            //Palabra encontrada
            for (let i = 0; i < palabra.length; i++) {
                sopa[index + i][col] = { letra: palabra[i].toUpperCase(), encontrada: true };
            }
            encontrada = true;
        }
    }
    return encontrada;
};

// Lógica principal del juego

function iniciarJuego(){
    imprimirConsola();

    teclado.question("\nEscribe una palabra para buscar (o 'salir'): ", (respuesta) => {
    const palabra = respuesta.toLowerCase();

    if (palabra === 'salir') {
      console.log("Gracias por jugar!");
      teclado.close();
      return;
    }
    if (palabras.includes(palabra)) {
        if (buscarPalabras(palabra)) {
            puntos += palabra.length;
            console.log(`¡Correcto! +${palabra.length} puntos`);
            palabrasAcertadas.push(palabra);

        } else {
            puntos = Math.max(0, puntos - palabra.length);
            console.log(`Incorrecto. -${palabra.length} puntos`);
            palabrasFalladas.push(palabra);
        }
    } else {
        puntos = Math.max(0, puntos - palabra.length);
        console.log(`Incorrecto. -${palabra.length} puntos`);
        palabrasFalladas.push(palabra);
    }
  
      setTimeout(iniciarJuego, 1000); // Esperamos 1 segundo y volvemos a pedir palabra
    });
  
}

imprimirConsola();
iniciarJuego();
