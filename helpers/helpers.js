const { Individuo } = require("../services/individuo");
const { generalIndividual } = require("../services/generalIndividual");
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
    /*   console.log(celulasDisponiveis);
    console.log(matrizLab); */
    this.printLab(matrizLab);
  },
  geradorDeIndividuo(matriz) {
    /*  let linhas = matriz.length;
    let colunas = matriz[0].length; */
    let continua = true;
    let posicaoAtual = [0, 0];
    let fim = [];
    let genotipo = [];
    let posicaoFinal = [4, 3];
    genotipo.push(posicaoAtual);
    matriz[posicaoAtual[0]][posicaoAtual[1]] = 5;
    this.printLab(matriz);
    let celulasDisponiveis = this.checaVizinhanca(posicaoAtual, matriz);
    do {
      if (celulasDisponiveis.length == 1) {
        matriz[posicaoAtual[0]][posicaoAtual[1]] = 4;
        posicaoAtual = celulasDisponiveis[0];
        genotipo.push(posicaoAtual);
        matriz[posicaoAtual[0]][posicaoAtual[1]] = 5;
        celulasDisponiveis = this.checaVizinhanca(posicaoAtual, matriz);
        this.printLab(matriz);
        if (celulasDisponiveis.length == 0) {
          fim = posicaoAtual;
          continua = false;
        }
        if ((posicaoAtual[0] == posicaoFinal[0])&&(posicaoAtual[1] == posicaoFinal[1] )) {
          fim = posicaoAtual;
          continua = false;
        }
      } else if (celulasDisponiveis.length > 1) {
        matriz[posicaoAtual[0]][posicaoAtual[1]] = 4;
        let indiceSorteado = this.randomInteiro(
          0,
          celulasDisponiveis.length - 1
        );
        posicaoAtual = celulasDisponiveis[indiceSorteado];
        genotipo.push(posicaoAtual);
        matriz[posicaoAtual[0]][posicaoAtual[1]] = 5;
        celulasDisponiveis = this.checaVizinhanca(posicaoAtual, matriz);
        this.printLab(matriz);
        if (celulasDisponiveis.length == 0) {
          fim = posicaoAtual;
          continua = false;
        }

        if (posicaoAtual == posicaoFinal) {
          fim = posicaoAtual;
          continua = false;
        }
      } else if (celulasDisponiveis.length == 0) {
        console.log("wut");
        continua = false;
      }
    } while (continua);

    return matriz;
  },

  randomInteiro(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  preenche(posicao, matriz) {},
  printLab(matriz) {
    console.log("-------------------------");
    for (let i = 0; i < matriz.length; i++) {
      let linha = "";
      for (let j = 0; j < matriz[0].length; j++) {
        linha = linha + "" + matriz[i][j];
      }
      console.log(linha);
    }
  },
  checaVizinhanca(posicao, matriz) {
    let linha = posicao[0];
    let coluna = posicao[1];
    let disponiveis = [];
    if (typeof matriz[linha - 1] != "undefined") {
      if (matriz[linha - 1][coluna] == 0 || matriz[linha - 1][coluna] == 3) {
        console.log("Acima disponivel");
        disponiveis.push([linha - 1, coluna]);
      }
    }
    if (typeof matriz[linha + 1] != "undefined") {
      if (matriz[linha + 1][coluna] == 0 || matriz[linha + 1][coluna] == 3) {
        console.log("Abaixo disponivel");
        disponiveis.push([linha + 1, coluna]);
      }
    }
    if (typeof matriz[linha][coluna - 1] != "undefined") {
      if (matriz[linha][coluna - 1] == 0 || matriz[linha][coluna - 1] == 3) {
        console.log("Esquerda disponivel");
        disponiveis.push([linha, coluna - 1]);
      }
    }

    if (typeof matriz[linha][coluna + 1] != "undefined") {
      if (matriz[linha][coluna + 1] == 0 || matriz[linha][coluna + 1] == 3) {
        console.log("Direita disponivel");
        disponiveis.push([linha, coluna + 1]);
      }
    }

    return disponiveis;
  }
};
