const helpers = require('../helpers/helpers');

class IndividuoMulti {
    constructor(valor) {
        this.fenotipo = valor;
        this.genotipo = [];
        this.fitness = false;
        this.nBits = 10;
        this.dimensoes = this.fenotipo.length;
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


    kernelMulti(arr, dataset) {
        var soma = 0;
        arr.forEach(element => {
            soma += Math.pow(element, 2);
        });
        //soma = helpers.intToReal(dataset, soma, this.nBits);
        soma = (soma * (-0.5));
        var elevado = (-(this.dimensoes)/2);
        var trecho = Math.pow(2*Math.PI, elevado) ;
        var exponencial = Math.exp(soma);
        soma = trecho *(Math.exp(soma));
        return soma;
    }
    fitnessCalc(dataset) {
        //var soma = 0;
        var h = 0.5;
        var aux = [];
        var Xi= [];
        var cont = 0;
        for (let i = 0; i < dataset.datasetInt[0].length; i++) {
            for (let j = 0; j < this.dimensoes; j++) {
                if(typeof dataset.datasetReal[j] == 'undefined')
                    console.log(typeof dataset.datasetReal[j])
                Xi.push(dataset.datasetReal[j][i]);
            }
            for (let j = 0; j < this.dimensoes; j++) {
                aux.push((helpers.intToReal(dataset, this.fenotipo[j], this.nBits) - Xi[j]) / h);
            }
            cont += this.kernelMulti(aux, dataset);
            Xi = [];
            aux= [];
        }

        this.fitness = cont / dataset.datasetInt[0].length * Math.pow(h, this.dimensoes);
    }

}

module.exports = { IndividuoMulti };