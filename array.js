//matriz de numeros
var matriz = [40,530,0,80];

function setup () {
    
    //esta variable va a contener la suma total de los numeros de la matriz
    var suma = 0;
    
    //atravesamos la matriz entera
    for (var i = 0; i < matriz.length; i++) {
        //suma a todos los elementos
        suma += matriz[i];
    }
    //imprimir la suma entre el total de elementos = promedio
    console.log(suma /matriz.length);


}