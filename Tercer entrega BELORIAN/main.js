// Declaración de variables  
const tabla = document.getElementById('game-board');  
const cuadroMensaje = document.getElementById('message');  
const botonReiniciar = document.getElementById('restart');  
const entradaNombre = document.getElementById('player-name');  
const botonGuardarNombre = document.getElementById('save-name');  
let cartas = [];  
let primeraCarta = null;  
let segundaCarta = null;  
let tableroBloqueado = false;  
let partidasGanadas = 0;  
let victoriasConsecutivas = 0;  
let erroresConsecutivos = 0;  
let nombreJugador = "";  

// Función para inicializar el juego  
function inicializarJuego() {  
    cartas = [];  
    for (let i = 1; i <= 8; i++) {  
        cartas.push(i, i); // Crear pares  
    }  
    cartas.sort(() => Math.random() - 0.5); // Barajar  
    renderizarCartas();  
    cuadroMensaje.textContent = ""; // Reiniciar mensajes  
}  

// Función para guardar el nombre del jugador  
function guardarNombreJugador() {  
    nombreJugador = entradaNombre.value || "Jugador"; // Guardar el nombre o usar "Jugador"  
    cuadroMensaje.textContent = `Bienvenido, ${nombreJugador}!`;  
}  

// Función para renderizar las cartas en el DOM  
function renderizarCartas() {  
    tabla.innerHTML = '';  
    cartas.forEach((valor, indice) => {  
        const carta = document.createElement('div');  
        carta.classList.add('card');  
        carta.setAttribute('data-value', valor);  
        carta.setAttribute('data-index', indice);  
        carta.addEventListener('click', voltearCarta);  
        tabla.appendChild(carta);  
    });  
}  

// Función para manejar el evento de voltear la carta  
function voltearCarta() {  
    if (tableroBloqueado) return;  
    const cartaClicada = this;  

    if (cartaClicada === primeraCarta) return;  

    cartaClicada.classList.add('flipped');  
    cartaClicada.textContent = cartaClicada.getAttribute('data-value');  

    if (!primeraCarta) {  
        primeraCarta = cartaClicada;  
        return;  
    }  

    segundaCarta = cartaClicada;  
    tableroBloqueado = true;  

    verificarPareja();  
}  

// Función para verificar si hay un par  
function verificarPareja() {  
    const esPar = primeraCarta.dataset.value === segundaCarta.dataset.value;  
    cuadroMensaje.textContent = esPar ? `¡Buen trabajo, ${nombreJugador}!` : "Intenta de nuevo";  

    if (esPar) {  
        primeraCarta.removeEventListener('click', voltearCarta);  
        segundaCarta.removeEventListener('click', voltearCarta);  
        partidasGanadas++;  
        victoriasConsecutivas++; // Incrementar victorias consecutivas  
        erroresConsecutivos = 0; // Reiniciar errores  
        reiniciar();  
        verificarFinJuego();  
    } else {  
        erroresConsecutivos++; // Incrementar errores  

        if (erroresConsecutivos >= 2) {  
            victoriasConsecutivas = 0; // Reiniciar victorias consecutivas  
        }  

        setTimeout(() => {  
            primeraCarta.textContent = '';  
            segundaCarta.textContent = '';  
            primeraCarta.classList.remove('flipped');  
            segundaCarta.classList.remove('flipped');  
            reiniciar();  
        }, 1000);  
    }  
}  

// Función para reiniciar el estado del juego  
function reiniciar() {  
    [primeraCarta, segundaCarta] = [null, null];  
    tableroBloqueado = false;  
}  

// Función para verificar el fin del juego  
function verificarFinJuego() {  
    if (partidasGanadas === 8) {  
        cuadroMensaje.textContent = `¡Has ganado, ${nombreJugador}!`;  
        verificarPremio();  
        partidasGanadas = 0; // Reiniciar el contador de partidas ganadas  
    }  
}  

// Función para verificar si el jugador ha ganado 3 veces seguidas  
function verificarPremio() {  
    if (victoriasConsecutivas === 3) {  
        alert(`¡GANASTE UN PREMIO, ${nombreJugador}!`);  
        victoriasConsecutivas = 0; // Reiniciar conteo de victorias  
    }  
}  

// Manejo del evento de reiniciar el juego  
botonReiniciar.addEventListener('click', inicializarJuego);  
botonGuardarNombre.addEventListener('click', guardarNombreJugador);  

// Inicializar el juego al cargar la página  
inicializarJuego();   