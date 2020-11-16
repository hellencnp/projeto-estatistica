
var a, b, pontos = [], Xmin = undefined, Xmax = undefined, Y = undefined, Ymax = undefined;

let projecao = function(){
    console.log('variavel = ' + variavel.value)
    let regressao = document.getElementById('valor').value
    console.log('regressão = ' + regressao)
    let div_projecao = document.getElementById('div_projecao')
    let projecao = document.createElement('h4')    
    if(variavel.value === 'X'){
        let y = (a * regressao) + b    
        y = Number(y.toFixed(2))
        console.log('Y = ' + y)    
        projecao.innerText = `Y = ${y}`
        div_projecao.innerHTML = ''
        div_projecao.appendChild(projecao)        
    }    
    else if(variavel.value === 'Y'){ 
        let x = (regressao - b) / a    
        x = Number(x.toFixed(2))
        console.log('X = ' + x)    
        projecao.innerText = `X = ${x}`
        div_projecao.innerHTML = ''
        div_projecao.appendChild(projecao)
    }
}
function ResolveEquacao(variavel, retornaX) {
    if (retornaX) {
      return (variavel - b) / a;
    }
    else {
      return a * variavel + b;
    }
  }
$("#idx,#idy").keypress(function (e) {
    var chr = String.fromCharCode(e.which);
    if ("0123456789.-".indexOf(chr) < 0)
      return false;
  });
  $("#idx").keyup(function () {
    if (!$("#idx").val())
      return false;
    var x = parseFloat($('#idx').val());
    $('#idy').val(ResolveEquacao(x, false));
  });
  
  $("#idy").keyup(function () {
    if (!$("#idy").val())
      return false;
    var y = parseFloat($('#idy').val());
    $('#idx').val(ResolveEquacao(y, true));
  });
  
function calcular(){
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
    document.getElementById('div_projecao').innerHTML = ''
    if (dadosVarX == "" || dadosVarY == ""){
        swal("Ops!", "Digite dados váldddidos!", "error");
        document.getElementById('dadosX').focus()
        return
    }
    dadosX.push(dadosVarX)
    dadosSepX = dadosX.toString().split(';')
    for(let i = 0; i < dadosSepX.length; i++){
        dadosNumX.push(Number(dadosSepX[i]))
    }
    somaX = dadosNumX.reduce((acum, n) => acum += n)
    dadosY.push(dadosVarY)
    dadosSepY = dadosY.toString().split(';')
    for(let i = 0; i < dadosSepY.length; i++){
        dadosNumY.push(Number(dadosSepY[i]))
    }
    if(dadosNumX.length !== dadosNumY.length){
        swal("Ops!", "Digite dados válidos!", "error");
        variavel.focus()
        return
    }
    somaY = dadosNumY.reduce((acum, n) => acum += n)
    for(i = 0; i < dadosNumX.length; i++){
        multxy.push(dadosNumX[i] * dadosNumY[i])
    }
    somaMultxy = multxy.reduce((acum, n) => acum += n)
    x2 = dadosNumX.map(x => x ** 2)
    somaX2 = x2.reduce((acum, n) => acum += n)
    y2 = dadosNumY.map(y => y ** 2)
    somaY2 = y2.reduce((acum, n) => acum += n)
    var parte1 = ((dadosNumX.length * somaMultxy) - ((somaX) * (somaY)))
    var parte2 =  Math.sqrt(((dadosNumX.length * somaX2)-(somaX ** 2))*((dadosNumX.length * somaY2)-(somaY ** 2)))
    r =  parte1 / parte2 
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
    // let resultadoEqu = document.createElement('h4')
    // resultadoEqu.innerText = `Equação: y = ${a} . x + ${b}`
     var forca = document.createElement('h4')
    
    if(r == 100){
        forca.innerText = `Perfeita positiva`
    }
    else if(r == -100){
        forca.innerText = `Perfeita positiva`
    }
    else if(r == 0){
        forca.innerText = `Variáveis não relacionadas`
    }
    else if(r > 0 && r < 30){
        forca.innerText = `Fraca`
    }
    else if(r >= 30 && r < 70){
        forca.innerText = `Moderada`
    }
    else{
        forca.innerText = `Forte`
    }    
    function troca(vet, i, j) {
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
    dadosNumX = [ ...new Set( dadosNumX ) ];
    dadosNumY = [ ...new Set( dadosNumY ) ];
    document.getElementById('resultforca').innerHTML = "Correlação " + forca.innerText + "  " + r+"%";
    document.getElementById('valora').innerHTML = a.toFixed(2) + "*";
    document.getElementById('valorb').innerHTML =  "+"  + b.toFixed(2);
    document.getElementById('divprojex').style.display ="block";
    document.getElementById('divprojey').style.display ="block";
 
///fgdff
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
var n = x.length;
var r = ((n * xySoma) - (xSoma * ySoma)) / Math.sqrt((n * x2Soma - Math.pow(xSoma, 2)) * (n * y2Soma - Math.pow(ySoma, 2)));    
    for(let i = 0; i < dadosNumX.length; i++){   
            $(document).ready(function() {   
                Highcharts.chart('graficoCorrelacao', {
                xAxis: {
                  min: Xmin - 1,
                  max: Xmax + 1
                },
                yAxis: {
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
}


