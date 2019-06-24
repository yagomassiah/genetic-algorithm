const { Individuo } = require('../services/individuo');
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
        return soma;

    },

    clone(indivi) {
        var copy = new Individuo(indivi.fenotipo);
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
            if (numero <= (Min + (i * inc)))
                return i - 1;

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
        var inc = ((Max - Min) / rangeVal);
        var mult = x * inc;
        x = Min + (x*inc);

        return x;
    },

    kernelMulti(x) {
        var soma = 0;
        for (var i = 0; i < dimensoes; i++) {

        }
    }

}