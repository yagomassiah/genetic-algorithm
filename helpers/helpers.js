const { Individuo } = require("../services/individuo");
const { generalIndividual } = require("../services/generalIndividual");
const { individuoLabirinto } = require("../services/individuoLabirinto");
const matrizLab = [
  [0, 0, 1, 1],
  [1, 0, 1, 0],
  [1, 0, 0, 3]
];
module.exports = {
  calculaFenotipo(Nbits, genotipo) {
    var maxValue = Math.pow(2, Nbits - 1);
    var soma = 0;

    for (var i = 0; i < genotipo.length; i++) {
      if (genotipo[i] == 1) {
        soma += maxValue;
      }
      maxValue = parseInt(maxValue / 2);
    }
    /*    if (soma > 31)
            console.log("wtf"); */
    return soma;
  },

  clone(indivi) {
    var copy = new Individuo(indivi.fenotipo);
    //    copy.calculaGenotipo(dataset);
    copy.calculaGenotipo();
    //  copy.fitnessCalc();
    return copy;
  },
  clone2(indivi) {
    var copy = new generalIndividual(indivi.fenotipo);
    //    copy.calculaGenotipo(dataset);
    copy.calculaFenotipo();
    //  copy.fitnessCalc();
    return copy;
  },
  cloneLab(indivi) {
    var copy = new individuoLabirinto(this.copiaArrayDuplo(indivi.genotipo), this.copiaArrayDuplo(indivi.encruzilhadas), this.copiaArrayDuplo(indivi.labirinto), indivi.posicaoVitoriosa);
    //    copy.calculaGenotipo(dataset);
    copy.calculaGenotipo();
    //  copy.fitnessCalc();
    return copy;
  },

  realToInt(dataset, numero, Nbits) {
    var rangeVal = Math.pow(2, Nbits) - 1;
    var bigArray = [];
    dataset.forEach(element => {
      bigArray = bigArray.concat(element);
    });
    var Max = Math.max(...bigArray);
    var Min = Math.min(...bigArray);
    var inc = (Max - Min) / rangeVal;

    for (var i = 0; i < rangeVal; i++) {
      if (numero <= Min + i * inc) return i - 1;
    }

    return false;
  },

  intToReal(dataset, numero, Nbits) {
    var x = numero;
    var rangeVal = Math.pow(2, Nbits) - 1;
    var bigArray = [];
    dataset.datasetReal.forEach(element => {
      bigArray = bigArray.concat(element);
    });
    var Max = Math.max(...bigArray);
    var Min = Math.min(...bigArray);
    var inc = (Max - Min) / rangeVal;
    x = Min + x * inc;
    return x;
  },

  kernelMulti(x) {
    var soma = 0;
    for (var i = 0; i < dimensoes; i++) {}
  },
  celulasDisponiveis(matriz) {
    let colunas = matriz[0].length;
    let linhas = matriz.length;
    let celulasDisponiveis = [];

    for (let i = 0; i < linhas; i++) {
      for (let j = 0; j < colunas; j++) {
        if (matriz[i][j] != 1 && matriz[i][j] != 2)
          celulasDisponiveis.push([i, j]);
      }
    }
  
  },
  geradorDeIndividuo(matrizOrigem, posicao) {
    let continua = true;
    let matriz = this.copiaArrayDuplo(matrizOrigem);
    let posicaoAtual = this.copiaArraySimples(posicao);
   // let fim = [];
    let genotipo = [];
   // let posicaoFinal = [6, 4];
   let posicaoFinal = this.encontraPosicaoVitoriosa(matriz); 
   let encruzilhadas= [];
    genotipo.push(posicaoAtual);
    matriz[posicaoAtual[0]][posicaoAtual[1]] = 5;
    
    let celulasDisponiveis = this.checaVizinhanca(posicaoAtual, matriz);
    do {
      if (celulasDisponiveis.length == 1) {
        matriz[posicaoAtual[0]][posicaoAtual[1]] = 4;
        posicaoAtual = celulasDisponiveis[0];
        genotipo.push(posicaoAtual);
        if (matriz[posicaoAtual[0]][posicaoAtual[1]] == 3) {
          fim = posicaoAtual;
          continua = false;
          matriz[posicaoAtual[0]][posicaoAtual[1]] = 5;
        } else {
          matriz[posicaoAtual[0]][posicaoAtual[1]] = 5;
          celulasDisponiveis = this.checaVizinhanca(posicaoAtual, matriz);
          if (celulasDisponiveis.length == 0) {
            fim = posicaoAtual;
            continua = false;
          }
        }
      } else if (celulasDisponiveis.length > 1) {
        encruzilhadas.push(this.copiaArraySimples(posicaoAtual));
        matriz[posicaoAtual[0]][posicaoAtual[1]] = 4;
        let indiceSorteado = this.randomInteiro(
          0,
          celulasDisponiveis.length - 1
        );
        posicaoAtual = celulasDisponiveis[indiceSorteado];
        genotipo.push(posicaoAtual);
        matriz[posicaoAtual[0]][posicaoAtual[1]] = 5;
        celulasDisponiveis = this.checaVizinhanca(posicaoAtual, matriz);
        if (celulasDisponiveis.length == 0) {
          fim = posicaoAtual;
          continua = false;
        }

        if (posicaoAtual == posicaoFinal) {
          fim = posicaoAtual;
          continua = false;
        }
      } else if (celulasDisponiveis.length == 0) {
     
        continua = false;
      }
    } while (continua);

    
    let obj = {
      genotipo: genotipo,
      encruzilhadas:encruzilhadas
    };
   // this.printLab(matriz);
    return obj;
  },

  randomInteiro(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  /* preencheFenotipo(genotipo, matriz) {
    let nGenotipo = this.copiaArrayDuplo(genotipo);
    let nMatriz = this.copiaArrayDuplo(matriz);
    for (let i = 0; i < genotipo.length; i++) {
      const element = genotipo[i];
      nMatriz[element[0]][element[1]] = 1;
      
    }
  }, */
  encontraPosicaoVitoriosa(matriz){
    let posicaoVencedora;
    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[0].length; j++) {
        if (matriz[i][j] == 3) {
          posicaoVencedora = [i, j];
        }
      }
    }

    return posicaoVencedora;
  },
  encontraPosicaoInicial(matriz){
    let posicaoInicial;
    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[0].length; j++) {
        if (matriz[i][j] == 2) {
          posicaoInicial = [i, j];
        }
      }
    }

    return posicaoInicial;
  },
  printLab(matriz) {
    console.log("-------------------------");
    for (let i = 0; i < matriz.length; i++) {
      let linha = "";
      for (let j = 0; j < matriz[0].length; j++) {
        if (matriz[i][j] == 1) {
          linha = linha + "\x1b[31m" + matriz[i][j];
        } else if (matriz[i][j] == 4) {
          linha = linha + "\x1b[32m" + matriz[i][j];
        } else if (matriz[i][j] == 5) {
          linha = linha + "\x1b[33m" + matriz[i][j];
        } else if (matriz[i][j] == 0) {
          linha = linha + "\x1b[37m" + matriz[i][j];
        } else if (matriz[i][j] == 3) {
          linha = linha + "\x1b[36m" + matriz[i][j];
        }
      }

      console.log(linha);
    }
  },
  checaVizinhanca(posicao, matriz) {
    let linha = posicao[0];
    let coluna = posicao[1];
    let disponiveis = [];
    let saida = [];
    if (typeof matriz[linha - 1] != "undefined") {
      if (matriz[linha - 1][coluna] == 0 || matriz[linha - 1][coluna] == 3) {
        if (matriz[linha - 1][coluna] == 3) {
          saida.push([linha - 1, coluna]);
        }
      
        
        disponiveis.push([linha - 1, coluna]);
      }
    }
    if (typeof matriz[linha + 1] != "undefined") {
      if (matriz[linha + 1][coluna] == 0 || matriz[linha + 1][coluna] == 3) {
        if (matriz[linha + 1][coluna] == 3) {
          saida.push([linha + 1, coluna]);
        }
      
        disponiveis.push([linha + 1, coluna]);
      }
    }
    if (typeof matriz[linha][coluna - 1] != "undefined") {
      if (matriz[linha][coluna - 1] == 0 || matriz[linha][coluna - 1] == 3) {
        if (matriz[linha][coluna - 1] == 3) {
          saida.push([linha, coluna - 1]);
        }
       
        disponiveis.push([linha, coluna - 1]);
      }
    }

    if (typeof matriz[linha][coluna + 1] != "undefined") {
      if (matriz[linha][coluna + 1] == 0 || matriz[linha][coluna + 1] == 3) {
        if (matriz[linha][coluna + 1] == 3) {
          saida.push([linha, coluna + 1]);
        }
     
        disponiveis.push([linha, coluna + 1]);
      }
    }
    if (saida.length > 0) return saida;
    else return disponiveis;
  },

  copiaArrayDuplo(arr) {
    let novoArray = [];
    arr.forEach(element => {
      let elementoInterno = [];
      element.forEach(element2 => {
        elementoInterno.push(element2);
      });
      novoArray.push(elementoInterno);
    });

    return novoArray;
  },
  copiaArraySimples(arr) {
    let novoArray = [];
    arr.forEach(element => {
      novoArray.push(element);
    });

    return novoArray;
  }
};
