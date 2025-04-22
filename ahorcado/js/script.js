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
console.log(palabra);
const oportunidades = Math.ceil(palabra.length * 1.5);
let marcador = 0;
let intentos = 0;
let letrasAdivinadas = [];
let palabraParcial = Array(palabra.length).fill('_');

document.getElementById('palabra-parcial').textContent = palabraParcial.join(' ');

function adivinarLetra() {
  const input = document.getElementById('input-letra');
  const letra = input.value.toLowerCase();
  input.value = '';
  const mensaje = document.getElementById('mensaje');

  if (!letra.match(/[a-zñ]/i)) {
    mensaje.textContent = "Introduce una letra válida.";
    return;
  }

  if (letrasAdivinadas.includes(letra)) {
    mensaje.textContent = "Ya has probado esa letra.";
    return;
  }

  letrasAdivinadas.push(letra);

  if (palabra.includes(letra)) {
    let cantidad = 0;
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) {
        palabraParcial[i] = letra;
        cantidad++;
      }
    }
    marcador += cantidad;
    mensaje.textContent = `¡Bien! La letra "${letra}" aparece ${cantidad} veces.`;
  } else {
    marcador = Math.max(0, marcador - 1);
    mensaje.textContent = `La letra "${letra}" no está.`;
  }

  intentos++;

  document.getElementById('palabra-parcial').textContent = palabraParcial.join(' ');
  document.getElementById('intentos').textContent = intentos;
  document.getElementById('marcador').textContent = marcador;

  if (!palabraParcial.includes('_')) {
    mensaje.textContent = `🎉 ¡Ganaste! La palabra era: ${palabra}`;
    document.getElementById('input-letra').disabled = true;
  } else if (intentos >= oportunidades) {
    mensaje.textContent = `💀 Se acabaron las oportunidades. La palabra era: ${palabra}`;
    document.getElementById('input-letra').disabled = true;
  }
}
