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
const palabra = palabras[Math.floor(Math.random() * palabras.length)].toLowerCase();
const oportunidades = Math.ceil(palabra.length * 1.5);
let marcador = 0;
let intentos = 0;
let letrasAdivinadas = [];
let palabraParcial = Array(palabra.length).fill('_');
document.getElementById('palabra-parcial').textContent = palabraParcial.join(' ');
document.getElementById('max-intentos').textContent = oportunidades;
function adivinarLetra() {
  const input = document.getElementById('input-letra');
  const letra = input.value.toLowerCase();
  const mensaje = document.getElementById('mensaje');
  input.value = '';
  if (letra.length !== 1 || !letra.match(/[a-zñáéíóúü]/i)) {
    mensaje.textContent = "Introduce una sola letra válida.";
    return;
  }
  if (letrasAdivinadas.includes(letra)) {
    mensaje.textContent = "Ya has probado esa letra.";
    return;
  }
  if (intentos >= oportunidades || !palabraParcial.includes('_')) {
    mensaje.textContent = "El juego ha terminado. Recarga para jugar de nuevo.";
    return;
  }
  letrasAdivinadas.push(letra);
  document.getElementById('letras-usadas').textContent = letrasAdivinadas.join(', ');
  if (palabra.includes(letra)) {
    let aciertos = 0;
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) {
        palabraParcial[i] = letra;
        aciertos++;
      }
    }
    marcador += aciertos;
    mensaje.textContent = `¡Bien! "${letra}" aparece ${aciertos} veces.`;
  } else {
    marcador = Math.max(0, marcador - 1);
    mensaje.textContent = `La letra "${letra}" no está.`;
    document.getElementById('marcador').textContent = marcador; 
  }
  intentos++;
  document.getElementById('palabra-parcial').textContent = palabraParcial.join(' ');
  document.getElementById('intentos').textContent = intentos;
  document.getElementById('marcador').textContent = marcador;
  if (!palabraParcial.includes('_')) {
    mensaje.textContent = `🎉 ¡Has ganado! La palabra era: "${palabra}". Puntuación final: ${marcador}`;
    input.disabled = true;
  } else if (intentos >= oportunidades) {
    mensaje.textContent = `💀 Se acabaron las oportunidades. La palabra era: "${palabra}".`;
    input.disabled = true;
  }
}
