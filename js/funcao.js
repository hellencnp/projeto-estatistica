// Declaracao de variaveis
const nomevariavel = document.getElementById('nomevariavel')
var infovariavel = document.getElementById('dados')
const salve = document.getElementById('calc')
var variavel = document.getElementById('variavel')
var valores = document.getElementById('tamanhosvalor')
// Funcao cria elemento inicio
function createelement(elemento) {
    return document.createElement(elemento)
}
// Funcao cria elemento fim

// Funcao para criar campos de acordo com o item selecionado ordinal incio
function ordinal() {
    if (variavel.value === 'ordinal') {
        let form = document.getElementById('form')
        let campo = document.createElement('input')
        campo.className = 'form-control'
        campo.placeholder = 'Informe a ordem da variáveis separadas por [;]'
        campo.id = 'dadoOrdinal'
        form.appendChild(campo)
    } else {
        let form = document.getElementById('form').innerHTML = ''
    }
}
// Funcao para criar campos de acordo com o item selecionado ordinal fim

// Funcao para criar campos de acordo com o item selecionado separatriz inicio
function checkelement() {
    if (medidas.value === 'quartil') {
        document.getElementById('tamanhosvalor').innerHTML = ''
        for (let i = 1; i <= 4; i++) {
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            valores.appendChild(opcao)
        }
    }
    else if (medidas.value === 'quintil') {
        document.getElementById('tamanhosvalor').innerHTML = ''
        for (let i = 1; i <= 5; i++) {
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            valores.appendChild(opcao)
            console.log(opcao)
        }
    }
    else if (medidas.value === 'decil') {
        document.getElementById('tamanhosvalor').innerHTML = ''
        for (let i = 1; i <= 10; i++) {
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            valores.appendChild(opcao)
            console.log(opcao)
        }
    }
    else if (medidas.value === 'porcentil') {
        document.getElementById('tamanhosvalor').innerHTML = ''
        for (let i = 1; i <= 100; i++) {
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            valores.appendChild(opcao)
            console.log(opcao)
        }
    }
}
// Funcao para criar campos de acordo com o item selecionado separatriz fim

// principal funcao, criação da tabela e gráficos inicio 
function CalculaDescritiva() {
    let dados = []
    let infosep = []
    let nome = nomevariavel.value
    var conteudo = infovariavel.value
    if (nome == "" || conteudo == "") {
        swal("Atenção!", "Informe dados validos!", "error");
        nomevariavel.focus()
        return
    }
    if (variavel.value === '') {
        swal("Atenção!", "Selecione uma variável", "error");
        variavel.focus()
        return
    }
    if (variavel.value === 'ordinal' && document.getElementById('dadoOrdinal').value === '') {
        swal("Atenção!", "Informe a ordem das variáveis!", "error");
        return
    }
    dados.push(conteudo)
    infosep = dados.toString().split(';')
    if ((variavel.value === 'nominal' || variavel.value === 'ordinal') && !isNaN(infosep[0])) {
        swal("Atenção!", "Esta variável só aceita palavras", "error");
        nomevariavel.focus()
        return
    }
    if ((variavel.value === 'discreta' || variavel.value === 'continua') && isNaN(infosep[0])) {
        swal("Atenção!", "Esta variável só aceita números", "error");
        nomevariavel.focus()
        return
    }
    if (variavel.value === 'discreta' || variavel.value === 'continua') {
        var dadosNum = []
        for (let i = 0; i < infosep.length; i++) {
            dadosNum.push(Number(infosep[i]))
        }
        function substitui(vet, i, j) {
            let aux = vet[i]
            vet[i] = vet[j]
            vet[j] = aux
        }
        //  ALGORITMO DE ORDENAÇÃO  INICIO  
        function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
            if (posFim > posIni) {
                const posPivot = posFim
                let posDiv = posIni - 1
                for (let i = posIni; i < posFim; i++) {
                    if (vet[i] < vet[posPivot]) {
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
        //  FUNCAO ALGORITMO DE ORDENAÇÃO  FIM  
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
    for (let i = 0; i <= tableindic1.length - 1; i++) {
        let th = cellcreate("th", tableindic1[i])
        headline1.appendChild(th)
    }
    for (let i = 0; i <= tableindic2.length - 1; i++) {
        let th = cellcreate("th", tableindic2[i])
        headline2.appendChild(th)
    }
    for (let i = 0; i <= tableindic3.length - 1; i++) {
        let th = cellcreate("th", tableindic3[i])
        headline3.appendChild(th)
    }
    for (let i = 0; i <= tableindic4.length - 1; i++) {
        let th = cellcreate("th", tableindic4[i])
        headline4.appendChild(th)
    }
    thead.appendChild(headline1)
    thead2.appendChild(headline2)
    thead3.appendChild(headline3)
    infosep.sort()
    let x, fac = 0
    let freqArray = []
    let facArray = []
    let perArray = []
    let perFac = []
    if (variavel.value === 'nominal') {
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
        for (let i = 0; i < freqArray.length; i++) {
            per = Math.round((freqArray[i] / infosep.length) * 100)
            perArray.push(per)
        }
        for (let i = 0; i < facArray.length; i++) {
            per = Math.round((facArray[i] / infosep.length) * 100)
            perFac.push(per)
        }
    }
    if (variavel.value === 'ordinal') {
        let dadoOrdinal = document.getElementById('dadoOrdinal')
        let dadosOrdinal = dadoOrdinal.value
        var vetorOrdinal = []
        let dadosOrd = []
        var arrayOrdinal = []
        dadosOrd.push(dadosOrdinal)
        vetorOrdinal = dadosOrd.toString().split(';')
        for (let i = 0; i <= vetorOrdinal.length; i++) {
            for (let x = 0; x < infosep.length; x++) {
                if (vetorOrdinal[i] === infosep[x]) {
                    arrayOrdinal.push(infosep[x])
                }
            }
        }
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
        for (let i = 0; i < freqArray.length; i++) {
            per = Math.round((freqArray[i] / arrayOrdinal.length) * 100)
            perArray.push(per)
        }
        for (let i = 0; i < facArray.length; i++) {
            per = Math.round((facArray[i] / arrayOrdinal.length) * 100)
            perFac.push(per)
        }
    }
    if (variavel.value === 'discreta') {
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
        for (let i = 0; i < freqArray.length; i++) {
            per = Math.round((freqArray[i] / dadosNum.length) * 100)
            perArray.push(per)
        }
        for (let i = 0; i < facArray.length; i++) {
            per = Math.round((facArray[i] / dadosNum.length) * 100)
            perFac.push(per)
        }
    }
    if (variavel.value === 'continua') {
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
        for (let i = 0; i < dadosNum.length; i++) {
            if (i === 0) {
                menor = dadosNum[i]
            } else {
                if (dadosNum[i] < menor) {
                    menor = dadosNum[i]
                }
            }
            if (dadosNum[i] > maior) {
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
        do {
            if (at % k1 === 0) {
                intervalo = at / k1
                linha = k1
                verif = true

            } else if (at % k2 === 0) {
                intervalo = at / k2
                linha = k2
                verif = true

            } else if (at % k3 === 0) {
                intervalo = at / k3
                linha = k3
                verif = true

            } else {
                at = at + 1
            }
        } while (verif === false)
        var p = []
        for (i = 0; i <= linha - 1; i++) {
            p[i] = 1
        }
        p[0] = menor

        for (i = 1; i <= linha; i++) {
            p[i] = p[i - 1] + intervalo
        }
        var facCont = []
        for (i = 1; i < p.length; i++) {
            max = p[i]
            cont = 0
            for (x = 0; x < dadosNum.length; x++) {
                if (dadosNum[x] < max) {
                    cont = cont + 1
                }
            }
            facCont.push(cont)
        }
        var freq = []
        let pos = facCont.length
        for (let i = 0; i < facCont.length - 1; i++) {
            if (i === 0) {
                freq.push(facCont[0])
            }
            freq.push(facCont[i + 1] - facCont[i])
        }
        for (let i = 0; i < freq.length; i++) {
            per = Math.round((freq[i] / dadosNum.length) * 100)
            perArray.push(per)
        }
        for (let i = 0; i < facCont.length; i++) {
            per = Math.round((facCont[i] / dadosNum.length) * 100)
            perFac.push(per)
        }
    }
    var novoDados = []
    if (variavel.value === 'discreta' || variavel.value === 'continua') {
        novoDados = [...new Set(dadosNum)];
    }
    else if (variavel.value === 'ordinal') {
        novoDados = [...new Set(arrayOrdinal)];
    }
    else {
        novoDados = [...new Set(infosep)];
    }
    if (variavel.value === 'discreta') {
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
            if (posFim > posIni) {
                const posPivot = posFim
                let posDiv = posIni - 1
                for (let i = posIni; i < posFim; i++) {
                    if (vet[i] < vet[posPivot]) {
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
        for (let i = 0; i < freqArray.length; i++) {
            arrayModa.push(freqArray[i])
        }
        quickSort(arrayModa)
        let posIni = freqArray[0]
        for (let i = 1; i < freqArray.length - 1; i++) {
            var valor = modaArray.length
            for (let i = 0; i < valor; i++) {
                if (modaArray[i] === 'Amodal') {
                    modaArray.splice(0, valor)
                }
            }
            if (posIni !== freqArray[i]) {
                moda = 'moda'
                i = (freqArray.length - 1)
            } else {
                moda = 'Amodal'
                modaArray.push(moda)
            }
        }
        if (moda === 'moda') {
            let posFim = (freqArray.length - 1)
            maior = arrayModa[posFim]
            for (let i = 0; i < freqArray.length; i++) {
                if (freqArray[i] === maior) {
                    modaArray.push(novoDados[i])
                }
            }
        }
        for (let i = 0; i < freqArray.length; i++) {
            soma += freqArray[i] * novoDados[i]
        }
        media = (soma / freqTot)
        m = media.toFixed(2)
        meio = (freqTot / 2).toFixed(1)
        for (let i = 0; i < facArray.length; i++) {
            if (meio > facArray[i] && meio < facArray[i + 1]) {
                mediana = novoDados[i + 1]
            }
        }
    }
    if (variavel.value === 'nominal' || variavel.value === 'ordinal') {
        let maior = 0
        var moda = 0
        let meio = 0
        var mediana = 0
        var modaArray = []
        let freqSort = []
        var m = 'Não existe'
        for (let i = 0; i < freqArray.length; i++) {
            freqSort.push(freqArray[i])
        }
        function substitui(vet, i, j) {
            let aux = vet[i]
            vet[i] = vet[j]
            vet[j] = aux
        }
        function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
            if (posFim > posIni) {
                const posPivot = posFim
                let posDiv = posIni - 1
                for (let i = posIni; i < posFim; i++) {
                    if (vet[i] < vet[posPivot]) {
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
        for (let i = 1; i < freqArray.length; i++) {
            var valor = modaArray.length
            for (let i = 0; i < valor; i++) {
                if (modaArray[i] === 'Amodal') {
                    modaArray.splice(0, valor)
                }
            }
            if (posIni !== freqArray[i]) {
                moda = 'moda'
                i = (freqArray.length - 1)
            } else {
                moda = 'Amodal'
                modaArray.push(moda)
            }
        }
        if (moda === 'moda') {
            let posFim = (freqArray.length - 1)
            maior = freqSort[posFim]
            for (let i = 0; i < freqArray.length; i++) {
                if (freqArray[i] === maior) {
                    modaArray.push(novoDados[i])
                }
            }
        }
        meio = (freqTot / 2).toFixed(1)
        for (let i = 0; i < facArray.length; i++) {
            if (meio > facArray[i] && meio <= facArray[i + 1]) {
                mediana = novoDados[i + 1]
            }
        }
    }
    if (variavel.value === 'continua') {
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
            if (posFim > posIni) {
                const posPivot = posFim
                let posDiv = posIni - 1
                for (let i = posIni; i < posFim; i++) {
                    if (vet[i] < vet[posPivot]) {
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
        for (let i = 0; i < p.length - 1; i++) {
            xi.push((p[i] + p[i + 1]) / 2)
        }
        for (let i = 0; i < freq.length; i++) {
            freqSort.push(freq[i])
        }
        quickSort(freqSort)
        let posIni = freq[0]
        for (let i = 1; i < freq.length - 1; i++) {
            var valor = modaArray.length
            for (let i = 0; i < valor; i++) {
                if (modaArray[i] === 'Amodal') {
                    modaArray.splice(0, valor)
                }
            }
            if (posIni !== freq[i]) {
                moda = 'moda'
                i = (freq.length - 1)
            } else {
                moda = 'Amodal'
                modaArray.push(moda)
            }
        }
        if (moda === 'moda') {
            let posFim = (freqSort.length - 1)
            maior = freqSort[posFim]
            for (let i = 0; i < freq.length; i++) {
                if (freq[i] === maior) {
                    modaArray.push(xi[i])
                }
            }
        }
        for (let i = 0; i < freq.length; i++) {
            soma += freq[i] * xi[i]
        }
        media = (soma / freqTot)
        m = media.toFixed(2)
        meio = Math.floor(freqTot / 2)
        for (let i = 0; i < facCont.length; i++) {
            if (meio > facCont[i] && meio <= facCont[i + 1]) {
                mediana = (p[i + 1] + ((((freqTot / 2) - facCont[i]) / freq[i + 1]) * intervalo)).toFixed(2)
            }
        }
    }
    if (variavel.value === 'nominal' || variavel.value === 'ordinal' || variavel.value === 'discreta' || variavel.value === 'continua') {
        var posicao = 0
        var resultado = 0
        var facContMed = []
        if (medidas.value === 'quartil') {
            for (let i = 1; i <= 4; i++) {
                if (valores.value == i) {
                    posicao = freqTot * ((i * 25) / 100)
                }
            }
        }
        else if (medidas.value === 'quintil') {
            for (let i = 1; i <= 5; i++) {
                if (valores.value == i) {
                    posicao = freqTot * ((i * 20) / 100)
                }
            }
        }
        else if (medidas.value === 'decil') {
            for (let i = 1; i <= 10; i++) {
                if (valores.value == i) {
                    posicao = freqTot * ((i * 10) / 100)
                }
            }
        } else {
            for (let i = 1; i <= 100; i++) {
                if (valores.value == i) {
                    posicao = freqTot * (i / 100)
                }
            }
        }
        for (let i = 0; i < facArray.length; i++) {
            if (posicao === 0) {
                resultado = 'Valor não informado'
            }
            else if (posicao <= facArray[0]) {
                resultado = novoDados[0]
            }
            else if (posicao > facArray[i] && posicao <= facArray[i + 1]) {
                resultado = novoDados[i + 1]
            }
        }
    }
    if (variavel.value === 'continua') {
        if (posicao === 0) {
            resultado = 'Valor não informado'
        }
        else {
            for (let i = 0; i < facCont.length; i++) {
                if (posicao < facCont[0]) {
                    facCont.unshift(0)
                    resultado = (p[i] + (((posicao - facCont[i]) / freq[i]) * intervalo)).toFixed(2)
                    facCont.shift(0)
                    i = facCont.length
                }
                else if (posicao > facCont[i] && posicao <= facCont[i + 1]) {
                    resultado = (p[i + 1] + (((posicao - facCont[i]) / freq[i + 1]) * intervalo)).toFixed(2)
                }
            }
        }
    }
    var radio = document.getElementsByName('opcao')
    if (variavel.value === 'discreta') {
        let pot = novoDados.map(f => Math.pow((f - m), 2).toFixed(2))
        let mult = []
        for (let i = 0; i <= pot.length - 1; i++) {
            mult.push((freqArray[i] * pot[i]).toFixed(2))
        }
        let multNumber = mult.map(m => Number(m))
        let soma = multNumber.reduce((acum, b) => acum += b)
        if (radio[0].checked) {
            var dp = 0
            dp = Math.sqrt(soma / freqTot).toFixed(2)
        }
        if (radio[1].checked) {
            var dp = 0
            dp = Math.sqrt(soma / (freqTot - 1)).toFixed(2)
        }
        var cv = 0
        cv = ((dp / m) * 100).toFixed(2)
    }
    else if (variavel.value === 'continua') {
        let pot = xi.map(f => Math.pow((f - m), 2).toFixed(2))
        let mult = []
        for (let i = 0; i <= pot.length - 1; i++) {
            mult.push((freq[i] * pot[i]).toFixed(2))
        }
        let multNumber = mult.map(m => Number(m))
        let soma = multNumber.reduce((acum, b) => acum += b)
        if (radio[0].checked) {
            var dp = 0
            dp = Math.sqrt(soma / freqTot).toFixed(2)
        }
        if (radio[1].checked) {
            var dp = 0
            dp = Math.sqrt(soma / (freqTot - 1)).toFixed(2)
        }
        var cv = 0
        cv = ((dp / m) * 100).toFixed(2)
    }
    var grafico = document.getElementById('grafico');
    grafico.innerHTML = '&nbsp;';
    $('#grafico').append('<canvas id="myChart"><canvas>');
    ctx = $("#myChart").get(0).getContext("2d");
    if (variavel.value === 'nominal' || variavel.value === 'ordinal') {
        let chart = new Chart(document.getElementById("myChart"), {
            type: 'pie',
            data: {
                labels: novoDados,
                datasets: [
                    {
                        label: "Porcentagem",
                        data: perArray,
                        backgroundColor: [
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
            options: {
                title: {
                    display: true,
                    fontSize: 20,
                    text: ''
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
    }
    if (variavel.value === 'discreta') {
        let chart = new Chart(document.getElementById("myChart"), {
            type: 'bar',
            data: {
                labels: novoDados,
                datasets: [
                    {
                        label: "Dados",
                        data: perArray,

                        backgroundColor: [
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
            options: {
                title: {
                    display: true,
                    fontSize: 15,
                    text: ""
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
    }
    if (variavel.value === 'continua') {
        var z = []
        for (let i = 0; i < p.length - 1; i++) {
            z.push(`${p[i]} |--- ${p[i + 1]}`)
        }
        let chart = new Chart(document.getElementById("myChart"), {
            type: 'bar',
            data: {
                labels: z,
                datasets: [
                    {
                        label: "Dados",
                        data: perArray,
                        backgroundColor: [
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
            options: {
                title: {
                    display: true,
                    fontSize: 20,
                    text: ""
                },
                scales: {
                    xAxes: [{
                        display: false,
                        barPercentage: 1.26,
                    }, {
                        display: true,
                    }],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        })
    }
    if (variavel.value === 'nominal' || variavel.value === 'discreta') {
        for (let j = 0; j < novoDados.length; j++) {
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
        if (variavel.value === 'discreta') {
            thead4.appendChild(headline4)
            let linhaBody4 = createelement("tr")
            let cellDp = cellcreate("td", dp)
            let cellCv = cellcreate("td", cv)
            linhaBody4.appendChild(cellDp)
            linhaBody4.appendChild(cellCv)
            tbody4.appendChild(linhaBody4)
        }
    }
    if (variavel.value === 'ordinal') {
        for (let j = 0; j < novoDados.length; j++) {
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
        if (variavel.value === 'discreta') {
            thead4.appendChild(headline4)
            let linhaBody4 = createelement("tr")
            let cellDp = cellcreate("td", dp)
            let cellCv = cellcreate("td", cv)
            linhaBody4.appendChild(cellDp)
            linhaBody4.appendChild(cellCv)
            tbody4.appendChild(linhaBody4)
        }
    }
    if (variavel.value === 'continua') {
        for (let j = 0; j < linha; j++) {
            let linhaBody = createelement("tr")
            let cell = cellcreate("td", `${p[j]} |--- ${p[j + 1]}`)
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
    celulaFoot.setAttribute("colspan", 5)
    linhaFoot.appendChild(celulaFoot)
    tbody.appendChild(linhaFoot)
    document.getElementById('dadoOrdinal').style.display = "none"
}
// principal funcao, criação da tabela e gráficos fim 

//Funcao para a calcular a binomial inicio
function calculaa() {
    let n = Number(document.getElementById('tamanhoamostra').value)
    let p = Number(document.getElementById('tamanhosucesso').value).toFixed(2)
    let q = Number(document.getElementById('tamanhofracasso').value).toFixed(2)
    let resultadofim = document.getElementById('resultado1')
    let valorevent = (document.getElementById('tamanhoevento'))
    let evento = valorevent.value
    let eventvetor = []
    let k = []
    if (n === '' || p === '' || q === '' || evento === '') {
        swal("Atenção", "Informe dados válidos!", "error");
        return
    }
    eventvetor.push(evento)
    let eventoNumber = (eventvetor.toString().split(';'));
    k = eventoNumber.map(num => Number(num))
    const fatorial = (x) => x === 0 || x === 1 ? 1 : x * fatorial(x - 1)
    let probabilidade = []
    let analisecombinatoria = []
    for (let i = 0; i <= k.length - 1; i++) {
        analisecombinatoria[i] = fatorial(n) / (fatorial(n - k[i]) * fatorial(k[i]))
        probabilidade[i] = analisecombinatoria[i] * (p ** k[i]) * (q ** (n - k[i]))
    }
    let calculaprob = probabilidade.reduce((acum, n) => acum += n)
    calculaprob = (calculaprob * 100).toFixed(2)
    let mostraprobabilidade = document.createElement('h2')
    mostraprobabilidade.innerText = `Probabilidade é de ${calculaprob} %`
    document.getElementById('resultado1').innerHTML = ''
    resultadofim.appendChild(mostraprobabilidade)
}

//Funcao para a calcular a binomial fim
// ------------------COMEÇA UNIFORME---------------------------------------
// Funcao para criar elementos de acordo com a selecao inicio
function criaDiv() {
    if (intervalou.value === 'entreu') {
        let div_iniciou = document.getElementById('div_iniciou')
        let iniciou = document.createElement('input')
        iniciou.className = 'form-control'
        iniciou.placeholder = 'Iníciou'
        iniciou.id = 'iniciou'
        let div_fimu = document.getElementById('div_fimu')
        let fimu = document.createElement('input')
        fimu.className = 'form-control'
        fimu.placeholder = 'Fimu'
        fimu.id = 'fimu'
        div_iniciou.appendChild(iniciou)
        div_fimu.appendChild(fimu)
    } else {
        let div_iniciou = document.getElementById('div_iniciou').innerHTML = ''
        let div_fimu = document.getElementById('div_fimu').innerHTML = ''
    }
    if (intervalou.value === 'maioru' || intervalou.value === 'menoru') {
        let div_qtdeu = document.getElementById('div_qtdeu')
        let qtdeu = document.createElement('input')
        qtdeu.className = 'form-control'
        qtdeu.placeholder = 'Quantidade'
        qtdeu.id = 'qtdeu'
        document.getElementById('div_qtdeu').innerHTML = ''
        div_qtdeu.appendChild(qtdeu)
    } else {
        let div_qtdeu = document.getElementById('div_qtdeu').innerHTML = ''
    }
}
// Funcao para criar elementos de acordo com a selecao fim
//---- CRIA ELEMENTO inicio----
function criaTag(elemento) {
    return document.createElement(elemento)
}
//---- CRIA ELEMENTO fim----

// Funcao para calcular a uniforme inicio
function calculauni() {
    let intervalo = document.getElementById('intervalou')
    let pmin = Number(document.getElementById('pmin').value)
    let pmax = Number(document.getElementById('pmax').value)
    let media = (pmax + pmin) / 2
    if (pmin == "" || pmax == "") {
        swal("Digite dados válidos!",);
        document.getElementById('pmin').focus()
        return
    }
    if (pmin === pmax) {
        swal("Digite dados válidos!",);
        document.getElementById('pmin').focus()
        return
    }
    if (intervalou.value == "") {
        swal("Selecione um intervalo!");
        intervalou.focus()
        return
    }
    if (intervalou.value == "entreu" && document.getElementById('iniciou').value == "") {
        swal("Digite dados válidos!");
        document.getElementById('iniciou').focus()
        return
    }
    if (intervalou.value == "entreu" && document.getElementById('fimu').value == "") {
        swal("Digite dados válidos!");
        document.getElementById('fimu').focus()
        return
    }
    if (intervalou.value == "maioru" || intervalou.value == "menoru" && document.getElementById('qtdeu').value == "") {
        swal("Digite dados válidos!");
        document.getElementById('qtdeu').focus()
        return
    }
    let variancia = ((pmax - pmin) ** 2) / 12
    let dp = Math.sqrt(variancia)
    let cv = (dp / mediau) * 100
    var prob = 0
    //---- MAIOR QUE----
    if (intervalou.value === 'maioru') {
        let qtdeu = document.getElementById('qtdeu').value
        var intu = pmax - qtdeu
        prob = (1 / (pmax - pmin)) * int * 100
    }
    else if (intervalou.value === 'menoru') {
        let qtdeu = document.getElementById('qtdeu').value
        var intu = qtdeu - pmin
        prob = (1 / (pmax - pmin)) * int * 100
    }
    else if (intervalou.value === 'entreu') {
        let iniciou = document.getElementById('iniciou').value
        let fimu = document.getElementById('fimu').value
        var intu = fimu - iniciou
        prob = (1 / (pmax - pmin)) * int * 100
    }
    let Prob = prob.toFixed(2)
    let Dp = dp.toFixed(2)
    let Cv = cv.toFixed(2)
    // --------------- CRIAÇÃO DA TABELA ---------------------------
    let tabela = document.getElementById('tabelau').innerHTML = ""
    tabela = document.getElementById('tabelau')
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
    for (let i = 0; i <= indiceTabela.length - 1; i++) {
        let th = criaCelula("th", indiceTabela[i])
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
// Funcao para calcular a uniforme fim
// ------------- COMEÇA NORMAL --------------------------

// funcao calcular normal inicio
function calcularn() {
    let intervalon = document.getElementById('intervalon')
    let median = Number(document.getElementById('median').value)
    let dp = Number(document.getElementById('dp').value)
    let resultadon = document.getElementById('resultadon')
    if (median == "" || dp == "") {
        swal("Ops!", "Digite dados válidos!", "error");
        document.getElementById('median').focus()
        return
    }
    const z = {
        '0': [0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
        '0.1': [0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753],
        '0.2': [0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
        '0.3': [0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
        '0.4': [0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
        '0.5': [0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
        '0.6': [0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2517, 0.2549],
        '0.7': [0.2580, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
        '0.8': [0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
        '0.9': [0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
        '1': [0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
        '1.1': [0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
        '1.2': [0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
        '1.3': [0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
        '1.4': [0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
        '1.5': [0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
        '1.6': [0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
        '1.7': [0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
        '1.8': [0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
        '1.9': [0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
        '2': [0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817],
        '2.1': [0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857],
        '2.2': [0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
        '2.3': [0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
        '2.4': [0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
        '2.5': [0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
        '2.6': [0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
        '2.7': [0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
        '2.8': [0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
        '2.9': [0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
        '3': [0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
        '3.1': [0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
        '3.2': [0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
        '3.3': [0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
        '3.4': [0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
        '3.5': [0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
        '3.6': [0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        '3.7': [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        '3.8': [0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        '3.9': [0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000],
    }
    let z1 = 0
    let z2 = 0
    var prob = 0
    //--------  CONVERTE Z  ---------------------------------
    function conversao(x) {
        var posi = x  // X=Z
        if (posi < 0) {
            posi = (posi * (-1))
        }
        if (posi < 4) {
            var posiVet = posi.toFixed(2) //ARREDONDA 
            var posiObj = Number(posiVet)
            posiObj = Math.trunc(posiObj * 10)
            posiObj = posiObj / 10
            posiObj = posiObj.toString()
            return z[posiObj][posiVet[3]]
        }
        else {
            return 0.5
        }
    }
    //---- MAIOR QUE
    if (intervalon.value === 'maiorn') {
        let qtden = Number(document.getElementById('qtden').value)
        z1 = (qtden - median) / dp
        //---- Z ----- 
        z1 = conversao(z1)
        if (qtden > median) {
            prob = (0.5 - z1) * 100
        }
        else if (qtden < median) {
            prob = (0.5 + z1) * 100
        }
        else {
            alert('Digite um valor maior que a média')
        }
    }
    //---- MENOR QUE -------
    if (intervalon.value === 'menorn') {
        let qtden = Number(document.getElementById('qtden').value)
        z1 = (qtden - median) / dp
        //---- Z ------ 
        z1 = conversao(z1)
        if (qtden > median) {
            prob = (0.5 + z1) * 100
        }
        else if (qtden < median) {
            prob = (0.5 - z1) * 100
        }
        else {
            alert('Digite um valor maior que a média')
        }
    }
    //---- ENTRE ----
    if (intervalon.value === 'entren') {
        let inicio = Number(document.getElementById('inicion').value)
        let fim = Number(document.getElementById('fimn').value)
        if (fim > median && inicion < median) {
            z1 = (inicion - median) / dp
            z2 = (fimn - median) / dp
            // -----Z1/Z2------
            z1 = conversao(z1)
            z2 = conversao(z2)
            prob = (z1 + z2) * 100
        }
        else if (inicion === median) {
            z1 = (fimn - median) / dp
            //---- Z -------
            z1 = conversao(z1)
            prob = z1 * 100
        }
        else if (fimn === median) {
            z1 = (inicion - median) / dp
            //------- Z1 ------
            z1 = conversao(z1)
            prob = z1 * 100
        }
        else if (fimn > median && inicion > median) {
            z1 = (inicion - median) / dp
            z2 = (fimn - median) / dp
            //---Z1/Z2-------
            z1 = conversao(z1)
            z2 = conversao(z2)
            prob = (z2 - z1) * 100
        }
        else if (fimn < median && inicion < median) {
            z1 = (inicion - median) / dp
            z2 = (fimn - median) / dp
            //---Z1/Z2-------
            z1 = conversao(z1)
            z2 = conversao(z2)
            prob = (z1 - z2) * 100
        }
    }
    let Prob = prob.toFixed(2)
    let resultadoProb = document.createElement('h3')
    resultadoProb.innerText = `Probabilidade é de ${Prob} %`
    document.getElementById('resultado').innerHTML = ''
    resultado.appendChild(resultadoProb)
}
// funcao calcular normal fim
var a, b, pontos = [], Xmin = undefined, Xmax = undefined, Y = undefined, Ymax = undefined;
// criar elementos projecao incio
let projecao = function () {
    let regressao = document.getElementById('valor').value
    let elementProjecao = document.getElementById('elementProjecao')
    let projecao = document.createElement('h4')
    if (variavel.value === 'X') {
        let y = (a * regressao) + b
        y = Number(y.toFixed(2))
        projecao.innerText = `Y = ${y}`
        elementProjecao.innerHTML = ''
        elementProjecao.appendChild(projecao)
    }
    else if (variavel.value === 'Y') {
        let x = (regressao - b) / a
        x = Number(x.toFixed(2))
        projecao.innerText = `X = ${x}`
        elementProjecao.innerHTML = ''
        elementProjecao.appendChild(projecao)
    }
}
// criar elementos projecao fim

// funcao calcula variaveis inicio
function ResolveEquacao(variavel, retornaX) {
    if (retornaX) {
        return (variavel - b) / a;
    }
    else {
        return a * variavel + b;
    }
}
// funcao calcula variaveis fim

//eventos keypress é disparado quando uma tecla é pressionada inicio. 
$("#idx,#idy").keypress(function (e) {
    var chr = String.fromCharCode(e.which);
    if ("0123456789.-".indexOf(chr) < 0)
        return false;
});
//eventos keypress é disparado quando uma tecla é pressionada fim. 

// O evento keyup é acionado quando uma tecla é liberada inico.
$("#idx").keyup(function () {
    if (!$("#idx").val())
        return false;
    var x = parseFloat($('#idx').val());
    $('#idy').val(ResolveEquacao(x, false));
});
// O evento keyup é acionado quando uma tecla é liberada fim.

// O evento keyup é acionado quando uma tecla é liberada inico.
$("#idy").keyup(function () {
    if (!$("#idy").val())
        return false;
    var y = parseFloat($('#idy').val());
    $('#idx').val(ResolveEquacao(y, true));
});
// O evento keyup é acionado quando uma tecla é liberada fim.

//funcao para calculo e gerar gradicos correlacao e regressao inico
function calcularCorrelacaoReg() {
    var dadosVarX = document.getElementById('dadosX').value
    var dadosVarY = document.getElementById('dadosY').value
    let resultado = document.getElementById('resultado')
    var dadosX = []
    var dadosSepX = []
    var dadosY = []
    var dadosSepY = []
    var dadosNumX = []
    var dadosNumY = []
    var somaX = 0
    var somaY = 0
    var multxy = []
    var somaMultxy = 0
    var x2 = []
    var somaX2 = 0
    var y2 = []
    var somaY2 = 0
    var r = 0
    document.getElementById('elementProjecao').innerHTML = ''
    if (dadosVarX == "" || dadosVarY == "") {
        swal("Ops!", "Digite dados válidos!", "error");
        document.getElementById('dadosX').focus()
        return
    }
    dadosX.push(dadosVarX)
    dadosSepX = dadosX.toString().split(';')
    for (let i = 0; i < dadosSepX.length; i++) {
        dadosNumX.push(Number(dadosSepX[i]))
    }
    somaX = dadosNumX.reduce((acum, n) => acum += n)
    dadosY.push(dadosVarY)
    dadosSepY = dadosY.toString().split(';')
    for (let i = 0; i < dadosSepY.length; i++) {
        dadosNumY.push(Number(dadosSepY[i]))
    }
    if (dadosNumX.length !== dadosNumY.length) {
        swal("Ops!", "Digite dados válidos!", "error");
        variavel.focus()
        return
    }
    somaY = dadosNumY.reduce((acum, n) => acum += n)
    for (i = 0; i < dadosNumX.length; i++) {
        multxy.push(dadosNumX[i] * dadosNumY[i])
    }
    somaMultxy = multxy.reduce((acum, n) => acum += n)
    x2 = dadosNumX.map(x => x ** 2)
    somaX2 = x2.reduce((acum, n) => acum += n)
    y2 = dadosNumY.map(y => y ** 2)
    somaY2 = y2.reduce((acum, n) => acum += n)
    var parte1 = ((dadosNumX.length * somaMultxy) - ((somaX) * (somaY)))
    var parte2 = Math.sqrt(((dadosNumX.length * somaX2) - (somaX ** 2)) * ((dadosNumX.length * somaY2) - (somaY ** 2)))
    r = parte1 / parte2
    r = r * 100
    r = r.toFixed(2)
    var parte1a = (dadosNumX.length * somaMultxy) - (somaX * somaY)
    var parte2a = (dadosNumX.length * somaX2) - (somaX ** 2)
    a = parte1a / parte2a
    a = Number(a.toFixed(4))
    var parte1b = (somaY / dadosNumY.length)
    var parte2b = (a * (somaX / dadosNumX.length))
    b = parte1b - parte2b
    b = Number(b.toFixed(4))
    var forca = document.createElement('h4')
    if (r == 100) {
        forca.innerText = `Perfeita positiva`
    }
    else if (r == -100) {
        forca.innerText = `Perfeita positiva`
    }
    else if (r == 0) {
        forca.innerText = `Variáveis não relacionadas`
    }
    else if (r > 0 && r < 30) {
        forca.innerText = `Fraca`
    }
    else if (r >= 30 && r < 70) {
        forca.innerText = `Moderada`
    }
    else {
        forca.innerText = `Forte`
    }
    function troca(vet, i, j) {
        let aux = vet[i]
        vet[i] = vet[j]
        vet[j] = aux
    }
    function quickSort(vet, posIni = 0, posFim = vet.length - 1) {
        if (posFim > posIni) {
            const posPivot = posFim
            let posDiv = posIni - 1
            for (let i = posIni; i < posFim; i++) {
                if (vet[i] < vet[posPivot]) {
                    posDiv++
                    troca(vet, i, posDiv)
                }
            }
            posDiv++
            troca(vet, posDiv, posPivot)
            quickSort(vet, posIni, posDiv - 1)
            quickSort(vet, posDiv + 1, posFim)
        }
    }
    quickSort(dadosNumX)
    quickSort(dadosNumY)
    dadosNumX = [...new Set(dadosNumX)];
    dadosNumY = [...new Set(dadosNumY)];
    document.getElementById('resultforca').innerHTML = "Correlação " + forca.innerText + "  " + r + "%";
    document.getElementById('valora').innerHTML = a.toFixed(2) + "*";
    document.getElementById('valorb').innerHTML = "+" + b.toFixed(2);
    document.getElementById('divprojex').style.display = "block";
    document.getElementById('divprojey').style.display = "block";
    var x = $('#dadosX').val().split(';');
    var y = $('#dadosY').val().split(';');
    var xySoma = 0, xSoma = 0, ySoma = 0, x2Soma = 0, y2Soma = 0
    for (var i in x) {
        if (i == 0) {
            Xmin = parseInt(x[i]);
            Xmax = parseInt(x[i]);
            Ymin = parseInt(y[i]);
            Ymax = parseInt(y[i]);
        }
        if (parseInt(x[i]) > Xmax)
            Xmax = parseInt(x[i]);
        if (parseInt(x[i]) < Xmin)
            Xmin = parseInt(x[i]);
        if (parseInt(y[i]) > Ymax)
            Ymax = parseInt(y[i]);
        if (parseInt(y[i]) < Ymin)
            Ymin = parseInt(y[i]);
        pontos.push([parseInt(x[i]), parseInt(y[i])])
        xySoma += parseInt(x[i]) * parseInt(y[i]);
        xSoma += parseInt(x[i]);
        ySoma += parseInt(y[i]);
        x2Soma += Math.pow(parseInt(x[i]), 2);
        y2Soma += Math.pow(parseInt(y[i]), 2);
    }
    var nomevarx = document.getElementById('nomevarX').value;
    var nomevary = document.getElementById('nomevarY').value;
    var n = x.length;
    var r = ((n * xySoma) - (xSoma * ySoma)) / Math.sqrt((n * x2Soma - Math.pow(xSoma, 2)) * (n * y2Soma - Math.pow(ySoma, 2)));
    //   CRIA GRAFICO DE DISPERSAO INICIO
    for (let i = 0; i < dadosNumX.length; i++) {
        $(document).ready(function () {
            Highcharts.chart('graficoCorrelacao', {
                xAxis: {
                    title: {
                        text: nomevarx
                    },
                    min: Xmin - 1,
                    max: Xmax + 1
                },
                yAxis: {
                    title: {
                        text: nomevary
                    },
                    min: Ymin,
                    max: Ymax
                },
                title: {
                    text: 'Gráfico Correlação e Regressão'
                },
                series: [{
                    type: 'line',
                    name: 'Reta Regressão',
                    data: [
                        [Xmin, ResolveEquacao(Xmin, false)],
                        [Xmax, ResolveEquacao(Xmax, false)]
                    ],
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: false
                }, {
                    type: 'scatter',
                    name: 'Pontos',
                    data: pontos,
                    marker: {
                        radius: 4
                    }
                }]
            });
        });
    }
    //   CRIA GRAFICO DE DISPERSAO INICIO 
}
//funcao para calculo e gerar gradicos correlacao e regressao fim

