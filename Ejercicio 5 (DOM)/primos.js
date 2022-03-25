   const respuesta = document.getElementById("respuesta")
   const numero = document.getElementById("rango")
   

   function calcularPrimos() {
       let primos = [];
        
        for(let i = 2; i <= numero.value; i++){ 
            for(b9 = 2;b9 < i && ( i % b9 !== 0); b9++);
                if(b9 === i){
                    primos.push(i);
                    respuesta.textContent = primos
                }
                
} 

if(numero.value  < 2){
    respuesta.textContent = "No Hay Números Primos En Ese Rango"
    }
    
   }

