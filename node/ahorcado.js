// Importamos el módulo readline para poder leer entradas del usuario desde la terminal
import { createInterface } from 'readline';

// Diccionario de 100 palabras para seleccionar aleatoriamente
const palabras = [
  "animal", "barco", "calle", "diente", "elefante", "fuego", "guitarra", "hombre", "iglesia", "jirafa",
  "kilo", "luz", "montaña", "nube", "oso", "pantalla", "queso", "ratón", "sol", "tigre",
  "uva", "viento", "wafle", "xilófono", "yate", "zapato", "abeja", "bola", "cielo", "dedo",
  "estrella", "foca", "granja", "hielo", "isla", "jabón", "koala", "lago", "mar", "nieve",
  "ojo", "piedra", "quinto", "rosa", "silla", "taza", "único", "valle", "web", "xenón",
  "yogur", "zanahoria", "alce", "bote", "camión", "dado", "eco", "faro", "gato", "hoja",
  "idea", "jugo", "kilómetro", "luna", "mano", "nido", "oro", "parque", "química", "rey",
  "solapa", "tren", "uña", "vaca", "wifi", "xilófono", "yema", "zorro", "ángel", "bebé",
  "carro", "dama", "enano", "fresa", "gol", "harina", "imagen", "jinete", "karma", "lente",
  "mesa", "nariz", "ola", "pato", "quesadilla", "robot", "sombra", "teléfono", "unicornio", "vampiro"
];

// Configuramos readline para leer entrada del teclado
const entrada = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Elegimos una palabra aleatoria del diccionario
const palabra = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();

// Calculamos las oportunidades: 150% del tamaño de la palabra
const oportunidades = Math.ceil(palabra.length * 1.5);

// Inicializamos el marcador del jugador
let marcador = 0;

// Contador de intentos usados
let intentos = 0;

// Lista para guardar letras que ya se adivinaron
let letrasAdivinadas = [];

// Lista para guardar la palabra parcialmente adivinada
let palabraParcial = new Array(palabra.length).fill('_');

// Mensajes del juego 
console.clear();
console.log(`\x1b[36m=== JUEGO DEL AHORCADO ===\x1b[0m`);
console.log(`\x1B[36m¡Bienvenido al juego! La palabra tiene ${palabra.length} letras.\x1B[0m`);
console.log(`\x1B[36mTienes ${oportunidades} oportunidades.\x1B[0m`);

// Función para pedir letras al jugador
function pedirLetra() {
  // Si gastas todas las oportunidades, termina el juego
  if (intentos >= oportunidades) {
    console.log(`\x1B[31m¡Fin del juego! La palabra era: ${palabra}\x1B[0m`);
    entrada.close();
    return;
  }

  // Preguntamos una letra
  entrada.question("Introduce una letra: ", (letra) => {
    letra = letra.toLowerCase(); // minúscula

    // Si la letra ha sido usada se avisa
    if (letrasAdivinadas.includes(letra)) {
      console.log(`\x1B[33mYa has probado esa letra.\x1B[0m`);
    } else {
      // Si es nueva, se guarda en la lista de letras usadas
      letrasAdivinadas.push(letra);

      // Verificamos si la letra está en la palabra
      if (palabra.includes(letra)) {
        // Contamos cuántas veces aparece la letra
        const cantidad = palabra.split('').filter(l => l === letra).length;

        // Sumamos esa cantidad al marcador
        marcador += cantidad;

         // Actualizamos la palabra parcialmente adivinada
         for (let i = 0; i < palabra.length; i++) {
          if (palabra[i] === letra) {
            palabraParcial[i] = letra;
          }
        }

        console.log(`\x1B[32m¡Bien! La letra "${letra}" está en la palabra. +${cantidad} puntos\x1B[0m`);
      } else {
        // Si no está, se resta un punto (sin bajar de 0)
        marcador = Math.max(0, marcador - 1);
        console.log(`\x1B[31mLa letra "${letra}" no está en la palabra. -1 punto\x1B[0m`);
      }

      // Aumentamos el número de intentos
      intentos++;
    }

    // Mostramos el estado actual del juego
    console.log(`\x1B[36mMarcador: ${marcador} | Intentos usados: ${intentos}/${oportunidades}\x1B[0m`);
    console.log(`\x1B[36mPalabra: ${palabraParcial.join(' ')}\x1B[0m`);

    // Verificamos si el jugador ha adivinado la palabra
    if (!palabraParcial.includes('_')) {
      console.log(`\x1B[32m¡Felicidades! Has adivinado la palabra: ${palabra}.Puntuación final: ${marcador}\x1B[0m`);
      entrada.close();
      return;
    }

    // Repetimos el proceso
    pedirLetra();
  });
}

// Iniciamos el juego
pedirLetra();
