
const edad = document.getElementById("edad")
const respuesta = document.getElementById("resultado")


function Cumplio (){
    calculo = 2022 - edad.value
    respuesta.textContent = calculo
}



function Nocumplio (){
    calculo = 2022 - edad.value - 1
    respuesta.textContent = calculo
}






