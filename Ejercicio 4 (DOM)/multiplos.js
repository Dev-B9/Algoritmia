const resultados = document.getElementById("resultado")


function resultado(){
    let multiplos=[];
       
        for (var i =1; i<100; i++)  {
           if (i % 3 ==0){
                multiplos.push(i);
                
            }
               
           }
           resultados.textContent = multiplos
 }
	
 

        
       
        
             