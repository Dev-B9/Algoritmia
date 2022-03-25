function calcularHoras(){
    let horas = document.getElementById('horas').value;
    let valorHoras = document.getElementById('valorHoras').value;
    let resultado = horas * valorHoras;

    alert(`el valor que le deben pagar es ${resultado} $`)
}