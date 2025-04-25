// Definición de constantes y variables
const palabras = ["raton", "sol", "nube", "tren", "vino", "luz", "casa", "gato", "lago", "flor"];
const SIZE = 20; 
const letras = "abcdefghijklmnopqrstuvwxyz"; 
let sopa = []; 
let puntos = 0; 
const palabrasAcertadas = [];
const palabrasFalladas = []; 

/**
 * Función que genera la sopa de letras
 */
function generarSopa() {
    // Inicializa la matriz de la sopa de letras con null
    sopa = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

    // Inserta las palabras en la sopa de letras
    for (let palabra of palabras) {
        let colocada = false;
        while (!colocada) {
            // Selecciona una dirección aleatoria para colocar la palabra
            const direccion = Math.floor(Math.random() * 6);
            let fila, col, dx, dy;

            // Establece la dirección y la posición inicial de la palabra
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

            // Verifica si se puede colocar la palabra en la posición seleccionada
            let puedeColocar = true;
            for (let i = 0; i < palabra.length; i++) {
                const f = fila + dy * i;
                const c = col + dx * i;
                if (sopa[f][c] !== null && sopa[f][c] !== palabra[i]) {
                    puedeColocar = false;
                    break;
                }
            }

            // Si se puede colocar la palabra, la coloca en la sopa de letras
            if (puedeColocar) {
                for (let i = 0; i < palabra.length; i++) {
                    sopa[fila + dy * i][col + dx * i] = palabra[i];
                }
                colocada = true;
            }
        }
    }

    // Rellena los espacios vacíos de la sopa de letras con letras aleatorias
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (!sopa[i][j]) sopa[i][j] = letras[Math.floor(Math.random() * letras.length)];
        }
    }

    // Renderiza la sopa de letras en el HTML
    renderizarSopa();
}

/**
 * Función que renderiza la sopa de letras en el HTML
 */
function renderizarSopa() {
    const container = document.getElementById("sopa-de-letras-container");
    container.innerHTML = "";
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            const celda = document.createElement("div");

            let contenido = sopa[i][j];
            if (typeof contenido === "object" && contenido.encontrada) {
                celda.textContent = contenido.letra.toUpperCase();
                celda.style.color = "green";
                celda.style.fontWeight = "bold";
            } else if (typeof contenido === "object") {
                celda.textContent = contenido.letra;
            } else {
                celda.textContent = contenido;
            }

            container.appendChild(celda);
        }
    }
}


/**
 * Función que busca una palabra en la sopa de letras
 * @param {string} palabra - La palabra a buscar
 * @returns {boolean} - True si la palabra se encuentra en la sopa de letras, false en caso contrario
 */
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

// Evento que se dispara cuando se hace clic en el botón de enviar
document.getElementById("enviar").addEventListener("click", () => {
    const entrada = document.getElementById("entrada").value.toLowerCase();

    if (!palabras.includes(entrada)) {
        document.getElementById("palabras-falladas").innerHTML += `<li>${entrada}</li>`;
        return;
    }
    
    if (palabrasAcertadas.includes(entrada)) {
        alert("Ya encontraste esa palabra.");
        return;
    }

    if (buscarPalabras(entrada)) {
        palabrasAcertadas.push(entrada);
        puntos += entrada.length;
        document.getElementById("palabras-encontradas").innerHTML += `<li>${entrada}</li>`;
    } else {
        palabrasFalladas.push(entrada);
        puntos = Math.max(0, puntos - entrada.length);
        document.getElementById("palabras-falladas").innerHTML += `<li>${entrada}</li>`;
    }

    // Actualiza puntos y limpia entrada
    document.getElementById("puntos-actuales").textContent = puntos;
    document.getElementById("entrada").value = "";

    // Renderiza de nuevo la sopa para mostrar palabras en mayúsculas
    renderizarSopa();

       // Comprueba si se encontraron todas las palabras
       if (palabrasAcertadas.length === palabras.length) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "¡Has encontrado todas las palabras!";
        mensaje.style.fontWeight = "bold";
        mensaje.style.color = "blue";
        document.getElementById("mensaje").appendChild(mensaje);
    }
});


// Genera la sopa de letras inicial
generarSopa();
