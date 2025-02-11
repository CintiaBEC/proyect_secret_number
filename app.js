// Se establece conexión entre el archivo HTML y cód. JS a través de función document

// let titulo = document.querySelector('h1'); //Se declara variable que contiene función document
// titulo.innerHTML = 'Juego del Número Secreto'; //Se asigna texto que contendrá el título H1

// let parrafo = document.querySelector('p'); //Se declara variable que contiene función document
// parrafo.innerHTML = 'Indica un número del 1 al 10'; //Se asigna texto que contendrá el párrafo

let numeroSecreto = 0;  //variable de alcance global
let intentos = 0;       //Creamos un contador para definir cantidad de intentos
let numeroSorteado = []; //genero lista de números que ya han sido sorteados para que no vuelvan a estar en el juego
let numMaximo = 10;
// Como la asignación de texto a distintos elementos es reiterativa automatizamos

function asignarTextoElemento(elemento, texto) {        //establecemos parámetros
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;                                              //Es buena práctica colocar return en las funciones
}

//Gestión de eventos a través de botones en JS

function verificarIntento() {         //Declaramos función para acción del primer boton
    let numUsuario = parseInt(document.getElementById('valorUsuario').value);     //definimos id en input de html y lo llamamos con getElementById
    // console.log(typeof(numUsuario));
    //console.log(numeroSecreto);
    // console.log(typeof(numeroSecreto));
    // console.log(numUsuario);
    console.log(intentos);
    if (numUsuario === numeroSecreto) {                    // condición de validación si usuario acierta
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos == 1) ? 'vez' : 'veces'}`);  //usamos operador ternario para usar vez o veces según corresponda
        document.getElementById('reiniciar').removeAttribute('disabled');
    }  else {
        //Usuario no acertó
        if (numUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        } 
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {         //limpiamos la caja donde usuario coloca número c/v que no acierta
    document.querySelector('#valorUsuario').value = '';    // uso querySelector('#') en vez de getElementById /definimos valor vacio para la caja
}

function generarNumSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numMaximo) + 1;
    console.log(numeroGenerado);
    console.log(numeroSorteado);
    
    //si ya sorteamos todos los números

    if (numeroSorteado.length == numMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    }

    //si el numero generado está incluido en la lista

    if (numeroSorteado.includes(numeroGenerado)) {
        return generarNumSecreto();
    } else {
        numeroSorteado.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales() {
    asignarTextoElemento('H1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numMaximo}`);
    numeroSecreto = generarNumSecreto();        //generación de número aleatorio
    intentos = 1;                               //inicialización de intentos
}

function reiniciarJuego() {
    limpiarCaja();                      //limpiar caja
    condicionesIniciales();            //mensaje de intervalo de números
    document.querySelector('#reiniciar').setAttribute('disabled','true');      //Deshabilitar botón de nuevo juego
}

condicionesIniciales();
