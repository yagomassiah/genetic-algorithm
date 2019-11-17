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
      console.log("i: " + i);
      for (let j = 0; j < colunas; j++) {
        if (matriz[i][j] != 1 && matriz[i][j] != 2)
          celulasDisponiveis.push([i, j]);
      }
    }
    console.log(celulasDisponiveis);
    console.log(matrizLab);
  },
  geradorDeIndividuo(matriz) {
    /*  let linhas = matriz.length;
    let colunas = matriz[0].length; */
    let celulasDisponiveis = this.celulasDisponiveis(matrizLab);
    return null;
  }
};
