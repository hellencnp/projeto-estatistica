

const nomevariavel = document.getElementById('nomevariavel')
var infovariavel = document.getElementById('dados')
const salve = document.getElementById('calc')
var variavel = document.getElementById('variavel')
var valores = document.getElementById('tamanhosvalor')


function createelement(elemento){
    return document.createElement(elemento)
}


function ordinal(){
    if(variavel.value === 'ordinal'){
        let form = document.getElementById('form')
        let campo = document.createElement('input')
        campo.className = 'form-control'
        campo.placeholder = 'Informe a ordem da variáveis separadas por [;]'
        campo.id = 'dadoOrdinal'
        form.appendChild(campo)
    }else{
        let form = document.getElementById('form').innerHTML = ''

    }
}


function checkelement(){
    if(medidas.value === 'quartil'){
        document.getElementById('tamanhosvalor').innerHTML = ''
        for(let i = 1; i <= 4; i++){
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            valores.appendChild(opcao)
        }
        
    }

    else if(medidas.value === 'quintil'){
        document.getElementById('tamanhosvalor').innerHTML = ''
        for(let i = 1; i <= 5; i++){
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            valores.appendChild(opcao)
            console.log(opcao)
        }
        
    }

    else if(medidas.value === 'decil'){
        document.getElementById('tamanhosvalor').innerHTML = ''
        for(let i = 1; i <= 10; i++){
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            valores.appendChild(opcao)
            console.log(opcao)
        }
 
        
    }

    else if(medidas.value === 'porcentil'){
        document.getElementById('tamanhosvalor').innerHTML = ''
        for(let i = 1; i <= 100; i++){
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            valores.appendChild(opcao)
            console.log(opcao)
        }
        
    }
}


function showtable(){


    let dados = []
    let infosep = []
    let nome = nomevariavel.value 
    var conteudo = infovariavel.value


    if (nome == "" || conteudo == ""){
        swal("Atenção!", "Informe dados validos!", "error");
        nomevariavel.focus()
        return
    }


    if(variavel.value === ''){
        swal("Atenção!", "Selecione uma variável", "error");
        variavel.focus()
        return
    }

    if(variavel.value === 'ordinal' && document.getElementById('dadoOrdinal').value === ''){
        swal("Atenção!", "Informe a ordem das variáveis!", "error");
        return
    }

   


    console.log(medidas.value)


    
    dados.push(conteudo)
    infosep = dados.toString().split(';')


    if((variavel.value === 'nominal' || variavel.value === 'ordinal')  && !isNaN(infosep[0])){
        swal("Atenção!", "Esta variável só aceita palavras", "error");
        nomevariavel.focus()
        return
    }


    if((variavel.value === 'discreta' || variavel.value === 'continua')  && isNaN(infosep[0])){
        swal("Atenção!", "Esta variável só aceita números", "error");
        nomevariavel.focus()
        return
    }


    if(variavel.value === 'discreta' || variavel.value === 'continua'){
        var dadosNum = []

        for(let i = 0; i < infosep.length; i++){
            dadosNum.push(Number(infosep[i]))
        }

        function substitui(vet, i, j) {
            let aux = vet[i]
            vet[i] = vet[j]
            vet[j] = aux
         }
         
         function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
            
            if(posFim > posIni) { 
               const posPivot = posFim  
               let posDiv = posIni - 1    
               for(let i = posIni; i < posFim; i++) { 
                  if(vet[i] < vet[posPivot]) {
                     posDiv++
                     substitui(vet, i, posDiv)  
                  }
               }
               posDiv++
               substitui(vet, posDiv, posPivot)
               quickSort(vet, posIni, posDiv - 1)
               quickSort(vet, posDiv + 1, posFim)
            }
         }

         quickSort(dadosNum)


    } 
   
    let tabela = document.getElementById('tabela').innerHTML = ""
    let tabela2 = document.getElementById('tabela2').innerHTML = ""
    let tabela3 = document.getElementById('tabela3').innerHTML = ""
    let tabela4 = document.getElementById('tabela4').innerHTML = ""

    tabela = document.getElementById('tabela')
    tabela2 = document.getElementById('tabela2')
    tabela3 = document.getElementById('tabela3')
    tabela4 = document.getElementById('tabela4')


    let thead = createelement("thead")
    let tbody = createelement("tbody")

    let thead2 = createelement("thead")
    let tbody2 = createelement("tbody")
    ordinal()
    let thead3 = createelement("thead")
    let tbody3 = createelement("tbody")

    let thead4 = createelement("thead")
    let tbody4 = createelement("tbody")

    let tfoot = createelement("tfoot")

    tabela.appendChild(thead)
    tabela.appendChild(tbody)
    tabela.appendChild(tfoot)

    
    tabela2.appendChild(thead2)
    tabela2.appendChild(tbody2)

    
    tabela3.appendChild(thead3)
    tabela3.appendChild(tbody3)


    
    tabela4.appendChild(thead4)
    tabela4.appendChild(tbody4)
   

    let tableindic1 = [nome, "Frequência", "Frequência (%)", "Frequência Acumulada", "FAC (%)"]
    let tableindic2 = ["Média", "Moda", "Mediana"]
    let tableindic3 = ["Medida Separatriz"]
    let tableindic4 = ["Desvio Padrão", "Coeficiente de Variação (%)"]

    let headline1 = createelement("tr")
    let headline2 = createelement("tr")
    let headline3 = createelement("tr")
    let headline4 = createelement("tr")

    function cellcreate(tag, text) {
        tag = createelement(tag)
        tag.textContent = text
        return tag
    }
    

    for(let i = 0; i <= tableindic1.length -1 ; i++){
        let th = cellcreate("th" , tableindic1[i])
        headline1.appendChild(th)
    }


    for(let i = 0; i <= tableindic2.length -1 ; i++){
        let th = cellcreate("th" , tableindic2[i])
        headline2.appendChild(th)
    }

    
    for(let i = 0; i <= tableindic3.length -1 ; i++){
        let th = cellcreate("th" , tableindic3[i])
        headline3.appendChild(th)
    }

    for(let i = 0; i <= tableindic4.length -1 ; i++){
        let th = cellcreate("th" , tableindic4[i])
        headline4.appendChild(th)
    }
    
    thead.appendChild(headline1)
    thead2.appendChild(headline2)
    thead3.appendChild(headline3)
  
    
    
    
    infosep.sort()
   
    
    
   console.log('dados:' + infosep)
   

    let x, fac = 0
    let freqArray = []
    let facArray = []
    let perArray = []
    let perFac = []
  

//-------------------------------------------------------------------------------------------------------------------------------------------------------
 
    if(variavel.value === 'nominal'){

        var freqTot = 0

        for (let i = 0; i < infosep.length; i = x) {  
            let freqCont = 1
            let freqPer = 0
            for (x = i + 1; x < infosep.length; x++) { 
                if (infosep[i] == infosep[x]) {
                    freqCont++;
                    freqPer = (freqCont / (infosep.length)) * 100
                } else {
                break;
                }

            }
            freqTot += freqCont
            fac += freqCont
            facArray.push(fac)
            freqArray.push(freqCont)

                
        }

        for(let i = 0; i < freqArray.length; i++){
            per = Math.round((freqArray[i] / infosep.length) * 100)
            perArray.push(per)
        }
    
        
        for(let i = 0; i < facArray.length; i++){
            per = Math.round((facArray[i] / infosep.length) * 100)
            perFac.push(per)
        }
        
        
    }
    
    
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    

    if(variavel.value === 'ordinal'){

        
        let dadoOrdinal = document.getElementById('dadoOrdinal')
        let dadosOrdinal = dadoOrdinal.value

        console.log(dadosOrdinal)

        var vetorOrdinal = []
        let dadosOrd = []
        var arrayOrdinal = []

        dadosOrd.push(dadosOrdinal)
        vetorOrdinal = dadosOrd.toString().split(';')

        for(let i = 0; i <= vetorOrdinal.length; i++){
            for(let x = 0; x < infosep.length; x++){
                if(vetorOrdinal[i] === infosep[x]){
                    arrayOrdinal.push(infosep[x])
                }
            }
        }

        console.log(arrayOrdinal)


        
    
    


        var freqTot = 0

        for (let i = 0; i < arrayOrdinal.length; i = x) {  
            let freqCont = 1
            let freqPer = 0
            for (x = i + 1; x < arrayOrdinal.length; x++) { 
                if (arrayOrdinal[i] == arrayOrdinal[x]) {
                    freqCont++;
                    freqPer = (freqCont / (arrayOrdinal.length)) * 100
                } else {
                break;
                }

            }
            freqTot += freqCont
            fac += freqCont
            facArray.push(fac)
            freqArray.push(freqCont)

                
        }


        for(let i = 0; i < freqArray.length; i++){
            per = Math.round((freqArray[i] / arrayOrdinal.length) * 100)
            perArray.push(per)
        }

        
        for(let i = 0; i < facArray.length; i++){
            per = Math.round((facArray[i] / arrayOrdinal.length) * 100)
            perFac.push(per)
        }
        
        
    }


//-------------------------------------------------------------------------------------------------------------------------------------------------------

    if(variavel.value === 'discreta'){

        var freqTot = 0


        for (let i = 0; i < dadosNum.length; i = x) {  
            let freqCont = 1
            let freqPer = 0
            for (x = i + 1; x < dadosNum.length; x++) { 
                if (dadosNum[i] == dadosNum[x]) {
                    freqCont++;
                    freqPer = (freqCont / (dadosNum.length)) * 100
                } else {
                break;
                }
            }
            fac += freqCont
            freqTot += freqCont
            facArray.push(fac)
            freqArray.push(freqCont)
      
            }
           
        
        
        
        for(let i = 0; i < freqArray.length; i++){
            per = Math.round((freqArray[i] / dadosNum.length) * 100)
            perArray.push(per)
        }
    
        
        for(let i = 0; i < facArray.length; i++){
            per = Math.round((facArray[i] / dadosNum.length) * 100)
            perFac.push(per)
        }
    


    }
    
    
//-------------------------------------------------------------------------------------------------------------------------------------------------------


    
    if(variavel.value === 'continua'){
        let menor = 0
        let maior = 0
        let at = 0 
        var freqTot = 0
        var intervalo = 0
        var linha = 0
        let k1 = 0
        let k2 = 0
        let k3 = 0
        let verif = Boolean

        for(let i = 0; i < dadosNum.length; i++){
            if(i === 0){
                menor = dadosNum[i]
            } else {
                if(dadosNum[i] < menor){
                    menor = dadosNum[i]
                }
            }
            if(dadosNum[i] > maior){
                maior = dadosNum[i]
            }
        }

        at = maior - menor
        at = at + 1  


        for (let i = 0; i < dadosNum.length; i = x) {  
            let freqCont = 1
            for (x = i + 1; x < dadosNum.length; x++) { 
                if (dadosNum[i] == dadosNum[x]) {
                    freqCont++;
                } else {
                break;
                }
            }
            freqTot += freqCont
                
            }
        
            
   

        k2 = Math.floor(Math.sqrt(freqTot)) 
        k1 = k2 - 1
        k3 = k2 + 1
 
        verif = false
        do{
            if(at % k1 === 0){
                intervalo = at / k1
                linha = k1
                verif = true

            } else if (at % k2 === 0){
                intervalo = at / k2
                linha = k2
                verif = true

            } else if(at % k3 === 0){
                intervalo = at / k3
                linha = k3
                verif = true

            } else {
                at = at + 1
            }

        } while(verif === false)





        // // TESTE FUNCIONALIDADE
        // // ---------------------------------------------------------------------------

         var p = []
         for(i = 0; i <= linha - 1; i++){
            p[i] = 1
        }

        p[0] = menor  

         for(i = 1; i <= linha ; i++){
            p[i] = p[i - 1] + intervalo
        }


         var facCont = []
         for(i = 1; i < p.length; i++){
             max = p[i]
             cont = 0
             for(x = 0; x < dadosNum.length; x++){
                 if(dadosNum[x] < max){
                     cont = cont + 1  
                 }
             }
             facCont.push(cont)
             
             
         }
 
         var freq = []
         let pos = facCont.length
         for(let i = 0; i < facCont.length - 1; i++){
             if(i === 0){
                 freq.push(facCont[0])
             } 
             freq.push(facCont[i + 1] - facCont[i])
         }

              
        for(let i = 0; i < freq.length; i++){
            per = Math.round((freq[i] / dadosNum.length) * 100)
            perArray.push(per)
        }

    
        
        for(let i = 0; i < facCont.length; i++){
            per = Math.round((facCont[i] / dadosNum.length) * 100)
            perFac.push(per)
        }
        
 
 

    }
    
    
//-------------------------------------------------------------------------------------------------------------------------------------------------------




    var novoDados = [] 
    if(variavel.value === 'discreta' || variavel.value === 'continua'){
        novoDados = [ ...new Set( dadosNum ) ];
    }

    else if(variavel.value === 'ordinal'){
        novoDados = [ ...new Set( arrayOrdinal ) ];
    }
    
    else{
        novoDados = [ ...new Set( infosep ) ];
        
    }


   
//-------------------------------------------------------------------------------------------------------------------------------------------------------

    
    
    
    if(variavel.value === 'discreta'){
        let soma = 0
        var media = 0
        var m = 0 
        let maior = 0
        let moda = 0
        var modaArray = []
        let meio = 0
        var mediana = 0
        var arrayModa = []


        function substitui(vet, i, j) {
            let aux = vet[i]
            vet[i] = vet[j]
            vet[j] = aux
         }
         
         function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
            
            if(posFim > posIni) { 
               const posPivot = posFim  
               let posDiv = posIni - 1    
               for(let i = posIni; i < posFim; i++) { 
                  if(vet[i] < vet[posPivot]) {
                     posDiv++
                     substitui(vet, i, posDiv)  
                  }
               }
               posDiv++
               substitui(vet, posDiv, posPivot)
               quickSort(vet, posIni, posDiv - 1)
               quickSort(vet, posDiv + 1, posFim)
            }
         }





        for(let i = 0; i < freqArray.length; i++){
            arrayModa.push(freqArray[i])
        }


        quickSort(arrayModa)


       
        let posIni = freqArray[0]

        for(let i = 1; i < freqArray.length - 1; i++){


            var valor = modaArray.length
            for(let i = 0; i < valor;i++){
                if(modaArray[i] === 'Amodal'){
                    modaArray.splice(0,valor)
                }
            }



            if(posIni !== freqArray[i]){
                moda = 'moda'
                i = (freqArray.length - 1)

            } else {
                moda = 'Amodal'
                modaArray.push(moda)
            }
        }

        if(moda === 'moda'){
            let posFim = (freqArray.length - 1)
            


            maior = arrayModa[posFim]
            
            for(let i = 0; i < freqArray.length; i++){
                if(freqArray[i] === maior){
                    modaArray.push(novoDados[i])
                }
            }
        }

        for(let i = 0; i < freqArray.length; i++){
            soma += freqArray[i] * novoDados[i]
        }
        
        media = (soma / freqTot)
        m = media.toFixed(2) 

        meio = (freqTot / 2).toFixed(1)

        for(let i = 0; i < facArray.length; i++){
            if(meio > facArray[i] && meio < facArray[i + 1]){
                mediana = novoDados[i + 1]
            }
        }

        


        console.log('média:' + m)
        console.log('moda:' + moda)
        console.log('moda Vetor:' + modaArray)
        console.log('mediana:' + mediana)

       

    } 
       
//-------------------------------------------------------------------------------------------------------------------------------------------------------

    
    if(variavel.value === 'nominal' || variavel.value === 'ordinal'){

        let maior = 0
        var moda = 0
        let meio = 0
        var mediana = 0
        var modaArray = []
        let freqSort = []
        var m = 'Não existe'
        
        for(let i = 0; i < freqArray.length; i++){
            freqSort.push(freqArray[i])
        }

        function substitui(vet, i, j) {
            let aux = vet[i]
            vet[i] = vet[j]
            vet[j] = aux
         }
         
        function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
            
            if(posFim > posIni) { 
               const posPivot = posFim  
               let posDiv = posIni - 1    
               for(let i = posIni; i < posFim; i++) { 
                  if(vet[i] < vet[posPivot]) {
                     posDiv++
                     substitui(vet, i, posDiv)  
                  }
               }
               posDiv++
               substitui(vet, posDiv, posPivot)
               quickSort(vet, posIni, posDiv - 1)
               quickSort(vet, posDiv + 1, posFim)
            }
        }

        quickSort(freqSort)

        

        let posIni = freqArray[0]

        for(let i = 1; i < freqArray.length; i++){
            
            
            var valor = modaArray.length
            for(let i = 0; i < valor;i++){
                if(modaArray[i] === 'Amodal'){
                    modaArray.splice(0,valor)
                }
            }


            if(posIni !== freqArray[i]){
                moda = 'moda'
                i = (freqArray.length - 1)

            } else {
                moda = 'Amodal'
                modaArray.push(moda)
            }
        }

        if(moda === 'moda'){
            

            let posFim = (freqArray.length - 1)
            
            maior = freqSort[posFim]
            console.log('maior:' + maior)

            for(let i = 0; i < freqArray.length; i++){
                if(freqArray[i] === maior){
                    modaArray.push(novoDados[i])
                }
            }
        }

        meio = (freqTot / 2).toFixed(1)

        for(let i = 0; i < facArray.length; i++){
            if(meio > facArray[i] && meio <= facArray[i + 1]){
                mediana = novoDados[i + 1]
            }
        }

        
        console.log('Vetor moda:' + modaArray)
        console.log('moda:' + moda)
        console.log('mediana:' + mediana)
    }



//-------------------------------------------------------------------------------------------------------------------------------------------------------


    if(variavel.value === 'continua'){

        let soma = 0
        let maior = 0
        let moda = 0
        var modaArray = []
        var m = 0
        var media = 0
        var xi = []
        let meio = 0
        var mediana = 0
        let freqSort = []



        function substitui(vet, i, j) {
            let aux = vet[i]
            vet[i] = vet[j]
            vet[j] = aux
         }
         
        function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
            
            if(posFim > posIni) { 
               const posPivot = posFim  
               let posDiv = posIni - 1    
               for(let i = posIni; i < posFim; i++) { 
                  if(vet[i] < vet[posPivot]) {
                     posDiv++
                     substitui(vet, i, posDiv)  
                  }
               }
               posDiv++
               substitui(vet, posDiv, posPivot)
               quickSort(vet, posIni, posDiv - 1)
               quickSort(vet, posDiv + 1, posFim)
            }
        }

    

        for(let i = 0; i < p.length - 1;i++){
            xi.push((p[i] + p[i+1]) / 2)
        }

        for(let i = 0; i < freq.length; i++){
            freqSort.push(freq[i])
        }

        quickSort(freqSort)


        let posIni = freq[0]

        for(let i = 1; i < freq.length - 1; i++){

            var valor = modaArray.length
            for(let i = 0; i < valor;i++){
                if(modaArray[i] === 'Amodal'){
                    modaArray.splice(0,valor)
                }
            }



            if(posIni !== freq[i]){
                moda = 'moda'
                i = (freq.length - 1)

            } else {
                moda = 'Amodal'
                modaArray.push(moda)
            }
        }

        if(moda === 'moda'){
            let posFim = (freqSort.length - 1)
            
            maior = freqSort[posFim]

            for(let i = 0; i < freq.length; i++){
                if(freq[i] === maior){
                    modaArray.push(xi[i])
                }
            }
        }
        

        for(let i = 0; i < freq.length; i++){
            soma += freq[i] * xi[i]
        }
        
        media = (soma / freqTot)
        m = media.toFixed(2) 

        meio = Math.floor(freqTot / 2)



        console.log('p :' + p)
        console.log('freqTot: ' + freqTot)
        console.log('facCont: ' + facCont)
        console.log('freq: ' + freq)
        console.log('intervalo : ' + intervalo)
        console.log('meio : ' + meio)



        
        for(let i = 0; i < facCont.length; i++){
            if(meio > facCont[i] && meio <= facCont[i + 1]){
                mediana = (p[i + 1] + ((((freqTot / 2) - facCont[i]) / freq[i + 1]) * intervalo)).toFixed(2)
            }
        }

        

        console.log('média:' + m)
        console.log('moda:' + moda)
        console.log('moda Vetor:' + modaArray)
        console.log('mediana: ' + mediana)
 
    }
        
//-------------------------------------------------------------------------------------------------------------------------------------------------------

    if(variavel.value === 'nominal' || variavel.value === 'ordinal' || variavel.value === 'discreta' || variavel.value === 'continua'){

        var posicao = 0
        var resultado = 0
        var facContMed = []

        if(medidas.value === 'quartil'){
           
            for(let i = 1; i <= 4; i++){
                if(valores.value == i){
                    posicao = freqTot * ((i*25)/100)
                }
            }

            

        } 
        
        else if (medidas.value === 'quintil'){

            for(let i = 1; i <= 5; i++){
                if(valores.value == i){
                    posicao = freqTot * ((i*20)/100)
                }
            }
                
            
            console.log(posicao)

        } 
        
        else if (medidas.value === 'decil'){
            for(let i = 1; i <= 10; i++){
                if(valores.value == i){
                    posicao = freqTot * ((i*10)/100)
                }
            }
            console.log(posicao)
        }
        
        else{
            for(let i = 1; i <= 100; i++){
                if(valores.value == i){
                    posicao = freqTot * (i/100)
                }
            }
            console.log(posicao)
        }


        for(let i = 0; i < facArray.length; i++){

            if(posicao === 0){
               resultado = 'Valor não informado'
            }

            else if(posicao <= facArray[0]){
                resultado = novoDados[0]
            }

            else if(posicao > facArray[i] && posicao <= facArray[i + 1]){

                resultado = novoDados[i + 1]
            }
        }

       
        console.log('posicao : '+ posicao)
        console.log('resultado : ' + resultado)
        
    }

    if(variavel.value === 'continua'){

        if(posicao === 0){
            resultado = 'Valor não informado'
        }

        else {
            for(let i = 0; i < facCont.length; i++){
                if(posicao < facCont[0]){
                    facCont.unshift(0)
                    resultado = (p[i] + (((posicao - facCont[i]) / freq[i]) * intervalo)).toFixed(2)
                    facCont.shift(0)
                    i = facCont.length
                }
    
                else if(posicao > facCont[i] && posicao <= facCont[i + 1]){
                    resultado = (p[i + 1] + (((posicao - facCont[i]) / freq[i + 1]) * intervalo)).toFixed(2)
                }
            }
    
        }

    }




//-------------------------------------------------------------------------------------------------------------------------------------------------------


    var radio = document.getElementsByName('opcao')

    if(variavel.value === 'discreta'){

        let pot = novoDados.map(f => Math.pow((f - m),2).toFixed(2))

        let mult = []
        for(let i = 0; i <= pot.length - 1; i ++){
            mult.push((freqArray[i] * pot[i]).toFixed(2))
        }

        let multNumber = mult.map(m => Number(m))
       
        let soma = multNumber.reduce((acum, b) => acum += b)
        
        console.log('pot: ' + pot)
        console.log('mult: ' + multNumber)
        console.log('soma: ' + soma)


        if(radio[0].checked){
            var dp = 0
            dp = Math.sqrt(soma / freqTot).toFixed(2)
            console.log(dp)
        }

        if(radio[1].checked){
            var dp = 0
            dp = Math.sqrt(soma / (freqTot - 1)).toFixed(2)
            console.log(dp)
        }

        var cv = 0

        cv = ((dp / m) * 100).toFixed(2)
        console.log(cv)

    }

    else if(variavel.value === 'continua'){

        console.log('xi : ' + xi)

        let pot = xi.map(f => Math.pow((f - m),2).toFixed(2))

        let mult = []
        for(let i = 0; i <= pot.length - 1; i ++){
            mult.push((freq[i] * pot[i]).toFixed(2))
        }

        let multNumber = mult.map(m => Number(m))
       
        let soma = multNumber.reduce((acum, b) => acum += b)
        
        console.log('pot: ' + pot)
        console.log('mult: ' + multNumber)
        console.log('soma: ' + soma)

        if(radio[0].checked){
            var dp = 0
            dp = Math.sqrt(soma / freqTot).toFixed(2)
            console.log('dp populacao: '+ dp)
        }

        if(radio[1].checked){
            var dp = 0
            dp = Math.sqrt(soma / (freqTot - 1)).toFixed(2)
            console.log('dp amostra: ' + dp)
        }

        var cv = 0

        cv = ((dp / m) * 100).toFixed(2)
        console.log('cv: ' + cv)


    }






//-------------------------------------------------------------------------------------------------------------------------------------------------------



    var grafico = document.getElementById('grafico');
    grafico.innerHTML = '&nbsp;';
    $('#grafico').append('<canvas id="myChart"><canvas>');
    ctx = $("#myChart").get(0).getContext("2d"); 


    if(variavel.value === 'nominal' || variavel.value === 'ordinal'){

               
        let chart = new Chart(document.getElementById("myChart"), {
            type: 'pie',
            data:{
                labels: novoDados,
                datasets: [
                {
                    label: "Porcentagem",
                    data: perArray,
                
                    backgroundColor:[

                        '#0000FF',
                        '#00FFFF',
                        '#330099',
                        '#660066',
                        '#993399',
                        '#CC0033',
                        '#CCFF00',
                        '#FF3300',
                        '#66FF00',
                        '#FFCC00',
                        '#e36414',
                        '#FF0099'
                    ],
                    
                    borderWidth: 2
                
                    }
                ]
                
            },
    
            options:{  
    
                title:{
                    display: true,
                    fontSize: 20,
                    text: ''
                },
    
                scales:{
                    yAxes: [
                        {
                            ticks:{
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
    }


    if(variavel.value === 'discreta'){
        let chart = new Chart(document.getElementById("myChart"), {
            type: 'bar',
            data:{
                labels: novoDados,
                datasets: [
                {
                    label: "Dados",
                    data: perArray,
                
                    backgroundColor:[
                        '#0000FF',
                        '#00FFFF',
                        '#330099',
                        '#660066',
                        '#993399',
                        '#CC0033',
                        '#CCFF00',
                        '#FF3300',
                        '#66FF00',
                        '#FFCC00',
                        '#e36414',
                        '#FF0099'
                    ],
                    
                    borderWidth: 2
                
                    }
                ]
                
            },
    
            options:{  
    
                title:{
                    display: true,
                    fontSize: 15,
                    text: ""
                },
    
                scales:{
                    yAxes: [
                        {
                            ticks:{
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
    }

    

    if(variavel.value === 'continua'){
        var z = []
        for(let i = 0; i < p.length - 1; i++){
            z.push(`${p[i]} |--- ${p[i+1]}`)
        }
        let chart = new Chart(document.getElementById("myChart"), {
            type: 'bar',
            data:{
                labels: z,
                datasets: [
                {
                    label: "Dados",
                    data: perArray,
                
                    backgroundColor:[
                        '#0000FF',
                        '#00FFFF',
                        '#330099',
                        '#660066',
                        '#993399',
                        '#CC0033',
                        '#CCFF00',
                        '#FF3300',
                        '#66FF00',
                        '#FFCC00',
                        '#e36414',
                        '#FF0099'
                    ],
                    
                    borderWidth: 2
                
                    }
                ]
                
            },
    
            options:{  
    
                title:{
                    display: true,
                    fontSize: 20,
                    text: ""
                },
    
                scales:{
                    xAxes: [{
                        display: false,
                        barPercentage: 1.26,
                      }, {
                        display: true,
                      }],
                    yAxes: [
                        {   
                            ticks:{
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
    }
    

    if(variavel.value === 'nominal' || variavel.value === 'discreta'){
        for(let j = 0; j < novoDados.length; j++){
            let linhaBody = createelement("tr")
            let cell = cellcreate("td", novoDados[j])
            let cell2 = cellcreate("td", freqArray[j])
            let cell3 = cellcreate("td", `${perArray[j]}%`)
            let cell4 = cellcreate("td", facArray[j])
            let cell5 = cellcreate("td", `${perFac[j]}%`)
            linhaBody.appendChild(cell)
            linhaBody.appendChild(cell2)
            linhaBody.appendChild(cell3)
            linhaBody.appendChild(cell4)
            linhaBody.appendChild(cell5)
            tbody.appendChild(linhaBody)
    
        }

        let linhaBody = createelement("tr")
        let cell = cellcreate("td", m)
        let cell2 = cellcreate("td", modaArray)
        let cell3 = cellcreate("td", mediana)
        linhaBody.appendChild(cell)
        linhaBody.appendChild(cell2)
        linhaBody.appendChild(cell3)
        tbody2.appendChild(linhaBody)

        let linhaBody3 = createelement("tr")
        let cellMed = cellcreate("td", resultado)
        linhaBody3.appendChild(cellMed)
        tbody3.appendChild(linhaBody3)

        if(variavel.value === 'discreta'){
            thead4.appendChild(headline4)
            let linhaBody4 = createelement("tr")
            let cellDp = cellcreate("td", dp)
            let cellCv = cellcreate("td", cv)
            linhaBody4.appendChild(cellDp)
            linhaBody4.appendChild(cellCv)
            tbody4.appendChild(linhaBody4)
        }
        


    }

    if(variavel.value === 'ordinal'){
        for(let j = 0; j < novoDados.length; j++){
            let linhaBody = createelement("tr")
            let cell = cellcreate("td", novoDados[j])
            let cell2 = cellcreate("td", freqArray[j])
            let cell3 = cellcreate("td", `${perArray[j]}%`)
            let cell4 = cellcreate("td", facArray[j])
            let cell5 = cellcreate("td", `${perFac[j]}%`)
            linhaBody.appendChild(cell)
            linhaBody.appendChild(cell2)
            linhaBody.appendChild(cell3)
            linhaBody.appendChild(cell4)
            linhaBody.appendChild(cell5)
            tbody.appendChild(linhaBody)
    
        }

        let linhaBody = createelement("tr")
        let cell = cellcreate("td", m)
        let cell2 = cellcreate("td", modaArray)
        let cell3 = cellcreate("td", mediana)
        linhaBody.appendChild(cell)
        linhaBody.appendChild(cell2)
        linhaBody.appendChild(cell3)
        tbody2.appendChild(linhaBody)

        let linhaBody3 = createelement("tr")
        let cellMed = cellcreate("td", resultado)
        linhaBody3.appendChild(cellMed)
        tbody3.appendChild(linhaBody3)

        if(variavel.value === 'discreta'){
            thead4.appendChild(headline4)
            let linhaBody4 = createelement("tr")
            let cellDp = cellcreate("td", dp)
            let cellCv = cellcreate("td", cv)
            linhaBody4.appendChild(cellDp)
            linhaBody4.appendChild(cellCv)
            tbody4.appendChild(linhaBody4)
        }
        


    }

    if(variavel.value === 'continua'){
        for(let j = 0; j < linha; j++){
            let linhaBody = createelement("tr")
            let cell = cellcreate("td", `${p[j]} |--- ${p[j+1]}`)
            let cell2 = cellcreate("td", freq[j])
            let cell3 = cellcreate("td", `${perArray[j]}%`)
            let cell4 = cellcreate("td", facCont[j])
            let cell5 = cellcreate("td", `${perFac[j]}%`)
            linhaBody.appendChild(cell)
            linhaBody.appendChild(cell2)
            linhaBody.appendChild(cell3)
            linhaBody.appendChild(cell4)
            linhaBody.appendChild(cell5)
            tbody.appendChild(linhaBody)
        }

        let linhaBody = createelement("tr")
        let cell = cellcreate("td", m)
        let cell2 = cellcreate("td", modaArray)
        let cell3 = cellcreate("td", mediana)
        linhaBody.appendChild(cell)
        linhaBody.appendChild(cell2)
        linhaBody.appendChild(cell3)
        tbody2.appendChild(linhaBody)


        let linhaBody3 = createelement("tr")
        let cellMed = cellcreate("td", resultado)
        linhaBody3.appendChild(cellMed)
        tbody3.appendChild(linhaBody3)

        thead4.appendChild(headline4)
        let linhaBody4 = createelement("tr")
        let cellDp = cellcreate("td", dp)
        let cellCv = cellcreate("td", cv)
        linhaBody4.appendChild(cellDp)
        linhaBody4.appendChild(cellCv)
        tbody4.appendChild(linhaBody4)


    }
    


    let linhaFoot = createelement("tr")
    let celulaFoot = cellcreate("td", "")
    celulaFoot.setAttribute("colspan",5)
    
    linhaFoot.appendChild(celulaFoot)
    tbody.appendChild(linhaFoot)
    document.getElementById('dadoOrdinal').style.display = "none"

}
// comeca funcao binomial


function calculaa(){
    let n = Number(document.getElementById('tamanhoamostra').value)   
    let p = Number(document.getElementById('tamanhosucesso').value).toFixed(2) 
    let q = Number(document.getElementById('tamanhofracasso').value).toFixed(2) 
    let resultadofim = document.getElementById('resultado1')
    let valorevent = (document.getElementById('tamanhoevento'))   
    let evento = valorevent.value
    let eventvetor = []
    let k = []
    if(n === '' || p === '' || q === '' || evento === ''){
        swal("Atenção", "Informe dados válidos!", "error");
        return
    }
    eventvetor.push(evento)
    let eventoNumber = (eventvetor.toString().split(';'));
    k = eventoNumber.map(num => Number(num))
   const fatorial = (x) => x === 0 || x === 1 ? 1 : x * fatorial(x - 1)
    let probabilidade = []
    let analisecombinatoria = []
    for(let i = 0; i <= k.length - 1; i++){
        analisecombinatoria[i] = fatorial(n) / (fatorial(n - k[i]) * fatorial(k[i]))
        probabilidade[i] = analisecombinatoria[i] * (p**k[i]) * (q**(n - k[i]))
    }
    let calculaprob = probabilidade.reduce((acum, n) => acum += n)
    calculaprob = (calculaprob * 100).toFixed(2)
    let mostraprobabilidade = document.createElement('h2')
    mostraprobabilidade.innerText = `Probabilidade é de ${calculaprob} %`
    document.getElementById('resultado1').innerHTML = ''
    resultadofim.appendChild(mostraprobabilidade)
    
}

// TESTE---------------------------------------


function criaDiv(){
    if(intervalo.value === 'entre'){
        let div_inicio = document.getElementById('div_inicio')
        let inicio = document.createElement('input')
        inicio.className = 'form-control'
        inicio.placeholder = 'Início'
        inicio.id = 'inicio'

        let div_fim = document.getElementById('div_fim')
        let fim = document.createElement('input')
        fim.className = 'form-control'
        fim.placeholder = 'Fim'
        fim.id = 'fim'


        div_inicio.appendChild(inicio)
        div_fim.appendChild(fim)

    }else{
        let div_inicio = document.getElementById('div_inicio').innerHTML = ''
        let div_fim = document.getElementById('div_fim').innerHTML = ''
        
    }

    if(intervalo.value === 'maior' || intervalo.value === 'menor'){
        let div_qtde = document.getElementById('div_qtde')
        let qtde = document.createElement('input')
        qtde.className = 'form-control'
        qtde.placeholder = 'Quantidade'
        qtde.id = 'qtde'

        document.getElementById('div_qtde').innerHTML = ''
        div_qtde.appendChild(qtde)

    }else{
        let div_qtde = document.getElementById('div_qtde').innerHTML = ''
    }

}


//Criação de um elemento
function criaTag(elemento){
    return document.createElement(elemento)
}

function calcular(){

    let intervalo = document.getElementById('intervalo')
    let pmin = Number(document.getElementById('pmin').value)
    let pmax = Number(document.getElementById('pmax').value)
    let media = (pmax + pmin) / 2


    if (pmin == "" || pmax == ""){
        swal("Digite dados válidos!",);
        document.getElementById('pmin').focus()
        return
    }

    if (pmin === pmax){
        swal("Digite dados válidos!",);
        document.getElementById('pmin').focus()
        return
    }

    if (intervalo.value == ""){
        swal("Selecione um intervalo!");
        intervalo.focus()
        return
    }

    if (intervalo.value == "entre" && document.getElementById('inicio').value == ""){
        swal("Digite dados válidos!");
        document.getElementById('inicio').focus()
        return
    }

    if (intervalo.value == "entre" && document.getElementById('fim').value == ""){
        swal("Digite dados válidos!");
        document.getElementById('fim').focus()
        return
    }
    
    if (intervalo.value == "maior" || intervalo.value == "menor" && document.getElementById('qtde').value == ""){
        swal( "Digite dados válidos!");
        document.getElementById('qtde').focus()
        return
    }
  
    console.log('media '+ media)

    let variancia = ((pmax - pmin) ** 2) / 12
    let dp = Math.sqrt(variancia)
    let cv = (dp / media) * 100
    var prob = 0

    //Maior que
    if(intervalo.value === 'maior') {
        let qtde = document.getElementById('qtde').value
        var int = pmax - qtde
        prob = (1 / (pmax - pmin)) * int * 100
    }
    else if(intervalo.value === 'menor') {
        let qtde = document.getElementById('qtde').value
        var int = qtde - pmin
        prob = (1 / (pmax - pmin)) * int * 100
    }
    else if(intervalo.value === 'entre') {
        let inicio = document.getElementById('inicio').value
        let fim = document.getElementById('fim').value
        var int = fim - inicio
        prob = (1 / (pmax - pmin)) * int * 100
    }
    

    let Prob = prob.toFixed(2)
    let Dp = dp.toFixed(2)
    let Cv = cv.toFixed(2)
   

    console.log('variancia '+ variancia)
    console.log('dp '+ dp)
    console.log('cv '+ cv)





    // Tabela
    let tabela = document.getElementById('tabela').innerHTML = ""
    tabela = document.getElementById('tabela')

    let thead = criaTag("thead")
    let tbody = criaTag("tbody")
    let tfoot = criaTag("tfoot")

    tabela.appendChild(thead)
    tabela.appendChild(tbody)
    tabela.appendChild(tfoot)

    let indiceTabela = ["Probabilidade", "Média", "Desvio Padrão", "Coeficiente de Variação"]


    let linhaHead = criaTag("tr")

    function criaCelula(tag, text) {
        tag = criaTag(tag)
        tag.textContent = text
        return tag
    }
    

    for(let i = 0; i <= indiceTabela.length -1 ; i++){
        let th = criaCelula("th" , indiceTabela[i])
        linhaHead.appendChild(th)
    }
   
    thead.appendChild(linhaHead)


    let linhaBody = criaTag("tr")
    let probCell = criaCelula("td", `${Prob} %`)
    let mediaCell = criaCelula("td", media)
    let dpCell = criaCelula("td", `${Dp} %`)
    let cvCell = criaCelula("td", `${Cv} %`)
    linhaBody.appendChild(probCell)
    linhaBody.appendChild(mediaCell)
    linhaBody.appendChild(dpCell)
    linhaBody.appendChild(cvCell)
    tbody.appendChild(linhaBody)

}



