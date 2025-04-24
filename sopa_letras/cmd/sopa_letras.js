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

//Función para insertar palabras 
function insertarPalabras() {
    for (let palabra of palabras) {
        let colocada = false;

        while (!colocada) {
            const direccion = Math.floor(Math.random() * 6); // 0 a 5
            let fila, col, dx, dy;

            switch (direccion) {
                case 0: // Horizontal →
                    dx = 1; dy = 0;
                    fila = Math.floor(Math.random() * SIZE);
                    col = Math.floor(Math.random() * (SIZE - palabra.length));
                    break;
                case 1: // Horizontal ←
                    dx = -1; dy = 0;
                    fila = Math.floor(Math.random() * SIZE);
                    col = Math.floor(Math.random() * (SIZE - palabra.length)) + palabra.length;
                    palabra = palabra.split("").reverse().join(""); // invertir
                    break;
                case 2: // Vertical ↓
                    dx = 0; dy = 1;
                    fila = Math.floor(Math.random() * (SIZE - palabra.length));
                    col = Math.floor(Math.random() * SIZE);
                    break;
                case 3: // Vertical ↑
                    dx = 0; dy = -1;
                    fila = Math.floor(Math.random() * (SIZE - palabra.length)) + palabra.length;
                    col = Math.floor(Math.random() * SIZE);
                    palabra = palabra.split("").reverse().join("");
                    break;
                case 4: // Diagonal ↘
                    dx = 1; dy = 1;
                    fila = Math.floor(Math.random() * (SIZE - palabra.length));
                    col = Math.floor(Math.random() * (SIZE - palabra.length));
                    break;
                case 5: // Diagonal ↖
                    dx = -1; dy = -1;
                    fila = Math.floor(Math.random() * (SIZE - palabra.length)) + palabra.length;
                    col = Math.floor(Math.random() * (SIZE - palabra.length)) + palabra.length;
                    palabra = palabra.split("").reverse().join("");
                    break;
            }

            // Verifica si hay espacio para colocar la palabra sin sobrescribir letras distintas
            let puedeColocar = true;
            for (let i = 0; i < palabra.length; i++) {
                const f = fila + dy * i;
                const c = col + dx * i;
                if (sopa[f][c] !== null && sopa[f][c] !== palabra[i]) {
                    puedeColocar = false;
                    break;
                }
            }

            if (puedeColocar) {
                for (let i = 0; i < palabra.length; i++) {
                    sopa[fila + dy * i][col + dx * i] = palabra[i];
                }
                colocada = true;
            } else {
                palabra = palabra.split("").reverse().join(""); // Revierte de nuevo si no se pudo colocar
            }
        }
    }

    // Rellenar espacios vacíos con letras aleatorias
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
    process.stdout.write("\n\x1B[33mSOPA DE LETRAS\x1B[0m\n");
    process.stdout.write("\x1B[33m-------------------\x1B[0m\n");

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
    process.stdout.write("\n\x1B[31mPalabras falladas: " + palabrasFalladas.join(", ") + "\x1B[0m\n");
    process.stdout.write("\n\x1B[32mPalabras acertadas: " + palabrasAcertadas.join(", ") + "\x1B[0m\n");
    process.stdout.write(`\n\x1B[36mPuntos: ${puntos}\x1B[0m\n`);
}

//Función para buscar palabras
function buscarPalabras(palabra) {
    const direcciones = [
        { dx: 1, dy: 0 },   // derecha 
        { dx: -1, dy: 0 },  // izquierda 
        { dx: 0, dy: 1 },   // abajo 
        { dx: 0, dy: -1 },  // arriba 
        { dx: 1, dy: 1 },   // diagonal ↘
        { dx: -1, dy: -1 }, // diagonal ↖
        { dx: -1, dy: 1 },  // diagonal ↙
        { dx: 1, dy: -1 },  // diagonal ↗
    ];

    const palabraOriginal = palabra;
    const palabraReversa = palabra.split("").reverse().join("");

    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            for (let dir of direcciones) {
                for (let palabraBuscada of [palabraOriginal, palabraReversa]) {
                    let match = true;
                    for (let i = 0; i < palabraBuscada.length; i++) {
                        const nx = x + dir.dx * i;
                        const ny = y + dir.dy * i;

                        if (
                            nx < 0 || nx >= SIZE ||
                            ny < 0 || ny >= SIZE ||
                            sopa[ny][nx].toLowerCase?.() !== palabraBuscada[i]
                        ) {
                            match = false;
                            break;
                        }
                    }

                    if (match) {
                        for (let i = 0; i < palabraBuscada.length; i++) {
                            const nx = x + dir.dx * i;
                            const ny = y + dir.dy * i;
                            sopa[ny][nx] = { letra: palabraBuscada[i].toUpperCase(), encontrada: true };
                        }
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// Lógica principal del juego

function iniciarJuego() {
    imprimirConsola();

    teclado.question("\nEscribe una palabra para buscar (o 'salir'): ", (respuesta) => {
        const palabra = respuesta.toLowerCase();

        if (palabra === 'salir') {
            console.log("\x1B[33mGracias por jugar!\x1B[0m");
            teclado.close();
            return;
        }
        if (palabras.includes(palabra)) {
            if (buscarPalabras(palabra)) {
                puntos += palabra.length;
                console.log(`¡Correcto! +${palabra.length} puntos`);
                palabrasAcertadas.push(palabra);
                // Verifica si se han encontrado todas las palabras
                if (palabrasAcertadas.length === palabras.length) {
                    console.log("\x1B[32m¡Felicidades! Has encontrado todas las palabras.\x1B[0m");
                    console.log(`\x1B[34mTu puntuación final es: ${puntos} puntos\x1B[0m`);
                    console.log("\x1B[35mHas demostrado ser un verdadero/a experto/a en sopas de letras.\x1B[0m");
                    teclado.close();
                    return;
                }

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

        setTimeout(iniciarJuego, 1000); // Esperamos 1 segundo para volver a pedir una palabra
    });

}

imprimirConsola();
iniciarJuego();
