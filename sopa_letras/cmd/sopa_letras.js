const readline = require('readline');
//Palabras de la sopa de letras
const palabras = ["raton", "sol", "nube", "tren", "vino", "luz", "casa", "gato", "lago", "flor"];
 //Tamaño sopa de letras
 const SIZE = 20;

 //Array para sopa vacia y llenar de letras random
 let sopa = Array.from({length:SIZE}, ()=>Array(SIZE).fill(null));
 const letras = "abcdefghijklmnopqrstuvwxyz";
 
 //Lista palabras no encontradas
 let palabrasFalladas=[];

