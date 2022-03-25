
const Dato1 = document.getElementById("Minutos")
const resultado = document.getElementById("resultado")

function MinutosHoras() {
    let Minutos = Number(Dato1.value)
    let Horas = Math.round(Minutos/60)
    let residuo = (Minutos % 60)
 if(Dato1.value >=    60){

     resultado.textContent = ( Horas +" hrs, Con " + residuo +" Minutos")
 }else{
    resultado.textContent = ( residuo +" Minutos")
 }

}