const helpers = require('../helpers/helpers');

class IndividuoMulti {
    constructor(valor, bits, dataset) {
        this.fenotipo = valor;
        this.genotipo = [];
        this.fitness = false;
        this.nBits = bits;
        this.dimensoes = this.fenotipo.length;
        this.fenotipoReal = [];
        for (let i = 0; i < this.fenotipo.length; i++)
        {
            this.fenotipoReal[i] = helpers.intToReal(dataset, valor[i], bits);
        }
    }

    calculaGenotipo() {

        this.fenotipo.forEach(element => {


            var divisao = element;
            var arr = [];

            if (divisao == 0) {
                arr = [];
                while (arr.length < this.nBits) {
                    arr.unshift(0);
                }

            } else if (divisao == 1) {
                arr = [];
                arr.unshift(1);
                while (arr.length < this.nBits) {
                    arr.unshift(0);
                }

            } else {
                while (divisao != 1) {
                    arr.unshift(divisao % 2);
                    divisao = parseInt(divisao / 2);
                    if (divisao == 1) {
                        arr.unshift(1);
                    }

                }

                if (arr.length < this.nBits) {
                    while (arr.length < this.nBits)
                        arr.unshift(0);
                }
            }
            this.genotipo.push(arr);

        });
        return this.genotipo;
    }


    kernelMulti(arr) {
        var soma = 0;
        arr.forEach(element => {
            soma += Math.pow(element, 2);
        });
        //soma = helpers.intToReal(dataset, soma, this.nBits);
        soma = (soma * (-0.5));
        var elevado = (-(this.dimensoes)/2);
        var trecho = Math.pow(2*Math.PI, elevado) ;
        soma = trecho *(Math.exp(soma));
        return soma;
    }
    fitnessCalc(dataset) {
        //var soma = 0;
        var h = 0.5;
        var aux = [];
        var Xi= [];
        var cont = 0;
        for (let i = 0; i < dataset.datasetReal[0].length; i++) {
            for (let j = 0; j < this.dimensoes; j++) {
                Xi.push(dataset.datasetReal[j][i]);
            }
            for (let j = 0; j < this.dimensoes; j++) {
                aux.push((this.fenotipoReal[j] - Xi[j]) / h);
            }
            cont += this.kernelMulti(aux);
            Xi = [];
            aux= [];
        }

        this.fitness = cont / dataset.datasetReal[0].length * Math.pow(h, this.dimensoes);
    }

}

module.exports = { IndividuoMulti };