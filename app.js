//Estructura que mantiene las palabras del juego
let bd = new Array(4);
bd[0] = ['PERA', 'BANANO', 'MELON', 'SANDIA', 'MANDARINA', 'KIWI'];
bd[1] = ['PIANO', 'GUITARRA', 'VIOLIN', 'BAJO', 'TROMPETA', 'SAXOFON', 'BATERIA'];
bd[2] = ['LEON', 'GALLINA', 'PERRO', 'GATO', 'MURCIELAGO', 'MONO', 'ELEFANTE'];
bd[3] = ['ARGENTINA', 'PERU', 'CHILE', 'COLOMBIA', 'ESPAÑA', 'MEXICO', 'ECUADOR'];

//Categorias
let categorias =['FRUTAS', 'MUSICA', 'ANIMALES', 'PAISES'];

//Cantidad de palabras con las que jugará cada categoría
const cantidadPalabras = 5;

//Este arreglo guarda las 5 palabras para jugar
let palabras = [];

//Este arreglo guarda las palabras desordenadas del arreglo de palabras
let desordenadas = [];

//Mantengo el nivel actual
let pos = 0;

//Tomo una categoria y selecciono 5 palabras random para jugar
function agregarPalabra(categoria){
    for(i=0; i < cantidadPalabras; i++){
        let x = Math.floor(Math.random()*categoria.length);
        palabras.push(categoria[x]);
        //Elimino del arreglo categoria para que la proxima ya no este para elegir
        categoria.splice(x,1);
    }
}
//La primera vez le envio la categoria frutas
agregarPalabra(bd[pos]);

//Función para desordenar las palabras
//Quedaran guardadas en el arreglo desordenadas
function desordenarPalabras(){
    for(i=0;i<palabras.length;i++){
        //Convertimos en un arreglo
        let palabra = palabras[i];
        palabra = palabra.split('');

        let palabraDesordenada;
        palabraDesordenada = palabra.sort(function(){return Math.random()-0.5});
        //Convertimos el arreglo a string (ya que nos quedo letra y coma)
        palabraDesordenada = palabraDesordenada.toString();
        //Quitamos las comas
        palabraDesordenada = palabraDesordenada.replace(/,/g,"");

        //Controlamos que la palabra desordenada no haya quedado igual que la ordenada
        if(palabraDesordenada==palabra[i]){
            i=i-1
        }else{
            //Guardamos la palabra desordenada
            desordenadas.push(palabraDesordenada);
        }
    }
}

//Función para agregar la palabra y el input
function agregarPalabras(){
    //Agregamos el titulo
    let h2 = document.createElement("h2");
    h2.textContent = categorias[pos];
    document.querySelector("#container").appendChild(h2);
    for(var i = 0; i<desordenadas.length;i++){
        let div = document.createElement("div");
        div.className = "fila";
        let palabra = document.createElement("div");
        palabra.textContent = desordenadas[i];
        palabra.className = "palabra";
        div.appendChild(palabra);
        let input = document.createElement("input");
        input.id = i;
        //Al input le agrego el evento onkeyup para detectar cuando se presiona una tecla
        input.setAttribute("onkeyup", "corregir("+i+")");
        div.appendChild(input);
        document.querySelector("#container").appendChild(div);
    }
}

desordenarPalabras();
agregarPalabras();

//Función para corregir las palabras hasta el momento ingresadas
function corregir(i){
    p = document.getElementById(i).value;
    //En caso que no se haya ingresado nada
    if(p==""){
        return;
    }
    //En caso de que coincidan las palabras
    if(p==palabras[i]){
        document.getElementById(i).className = "correcta";
        //Controlamos di termino
        controlFin();
    }else{
        document.getElementById(i).className = "";
    }
}

let btnCreado = false;
function controlFin(){
    //Obtengo la cantidad de clases "correcta" que hay hasta el momento
    let total = document.getElementsByClassName("correcta").length;
    if(total == cantidadPalabras && btnCreado == false){//Se completaron las palabras
        let button = document.createElement("button");
        button.textContent = "Siguiente";
        button.setAttribute("onclick", "siguiente()");
        document.querySelector("#container").appendChild(button);
        btnCreado = true;

        //Desbloqueamos el nivel
        let niveles = document.getElementsByClassName("nivel");
        niveles[pos].classList = "nivel completado";
    }
}

function siguiente(){
    //Así limpio los arreglos palabras y desordenadas, para cargarlo con las nuevas
    palabras.length = 0;
    desordenadas.length = 0;
    document.querySelector("#container").textContent = "";
    pos++;
    //Controlo si termino el juego
    if(pos < bd.length){//No termino
        btnCreado = false;
        agregarPalabra(bd[pos]);
        desordenarPalabras();
        //efectoNivel();
        agregarPalabras();
    }else{//Termino
        let h2 = document.createElement("h2");
        h2.textContent = "JUEGO FINALIZADO! MUY BIEN!!";
        document.querySelector("#container").appendChild(h2);
    }
}