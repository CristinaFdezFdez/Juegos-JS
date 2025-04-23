// Diccionario de 100 palabras
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

// Selecciona una palabra al azar del diccionario y la pasa a minúsculas
const palabra = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();

// Calcula el número de oportunidades (50% más que la longitud de la palabra)
const oportunidades = Math.ceil(palabra.length * 1.5);

// Variables de control del juego
let marcador = 0;
let intentos = 0;
let letrasAdivinadas = []; // Almacena las letras que ya se han intentado
let palabraParcial = Array(palabra.length).fill('_'); // Muestra la palabra parcialmente descubierta

// Muestra el estado inicial en pantalla
document.getElementById('palabra-parcial').textContent = palabraParcial.join(' ');
document.getElementById('max-intentos').textContent = oportunidades;

// Función que se ejecuta al adivinar una letra
function adivinarLetra() {
  const input = document.getElementById('input-letra'); // Campo de entrada
  const letra = input.value.toLowerCase(); // Letra en minúscula
  const mensaje = document.getElementById('mensaje');
  input.value = ''; // Limpia el campo de texto

  // Validación debe ser una sola letra válida (expresiones regulares)
  if (letra.length !== 1 || !letra.match(/[a-zñáéíóúü]/i)) {
    mensaje.textContent = "Introduce una sola letra.";
    return;
  }

  // Verifica si ya se ha usado esa letra
  if (letrasAdivinadas.includes(letra)) {
    mensaje.textContent = "Ya has probado esa letra.";
    return;
  }

  // Si ya se acaba el juego, no deja continuar
  if (intentos >= oportunidades || !palabraParcial.includes('_')) {
    mensaje.textContent = "El juego ha terminado. Recarga para volver a jugar.";
    return;
  }


  // Guarda la letra en el array y actualiza 
  letrasAdivinadas.push(letra);
  document.getElementById('letras-usadas').textContent = letrasAdivinadas.join(', ');

  // Si la letra está en la palabra
  if (palabra.includes(letra)) {
    let aciertos = 0;

    // Recorre la palabra para descubrir las letras correctas
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) {
        palabraParcial[i] = letra;
        aciertos++;
      }
    }

    // Suma puntos por cada letra acertada
    marcador += aciertos;
    mensaje.textContent = `¡Bien! "${letra}" aparece ${aciertos} veces.`;
  } else {
    // Resta 1 punto si falla, sin bajar de 0
    marcador = Math.max(0, marcador - 1);
    mensaje.textContent = `La letra "${letra}" no está.`;
    document.getElementById('marcador').textContent = marcador; // Actualiza el marcador
  }

  // Incrementa el número de intentos
  intentos++;

  // Actualiza el estado actual
  document.getElementById('palabra-parcial').textContent = palabraParcial.join(' ');
  document.getElementById('intentos').textContent = intentos;
  document.getElementById('marcador').textContent = marcador;

  // Si adivinas toda la palabra
  if (!palabraParcial.includes('_')) {
    mensaje.textContent = `🎉 ¡Has ganado! La palabra era: "${palabra}". Puntuación final: ${marcador}`;
    input.disabled = true;
  }
  // Si se acaban los intentos
  else if (intentos >= oportunidades) {
    mensaje.textContent = `💀 Se acabaron las oportunidades. La palabra era: "${palabra}".`;
    input.disabled = true;
  }
}
// Eventos: click y tecla enter
document.getElementById('input-letra').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    adivinarLetra();
  }
});