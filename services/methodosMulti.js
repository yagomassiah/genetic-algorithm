
const helpers = require('../helpers/helpers');
const { Individuo } = require('./individuo');
const { IndividuoMulti } = require('./IndividuoMulti');
module.exports = {

    torneio(populacao, numVencedores, k) {
        var selecionados = [];


        while (selecionados.length < numVencedores) {
            let competidores = [];
            while (competidores.length < k) {
                competidores.push(populacao[Math.floor(Math.random() * populacao.length)]);
            }
            var res = Math.max.apply(Math, competidores.map(function (o) { return o.fitness; }))
            var vencedor = competidores.find(function (o) { return o.fitness == res; })

            selecionados.push(vencedor);
            competidores = [];
        }

        var ret = {
            vencedores: selecionados
        };
        return ret;


    },

    crossover(par, chanceDeCross) {
        var sorteio = Math.random();
        // sorteio = 0.8;
        var pai1 = par[0].genotipo;
        var pai2 = par[1].genotipo;
        var filho1 = [];
        var filho2 = [];
        var z = 0;
        pai1.forEach(element => {

            if (sorteio >= chanceDeCross) {

                var tamanho = element.length - 1;
                console.log("Tamanho: " + tamanho);
                var indice = Math.floor(Math.random() * tamanho);
                console.log("indice: " + indice);

                var fenElement = [];
                for (var i = 0; i < (indice); i++) {
                    fenElement.push(element[i]);
                }
                i = indice;
                for (i; i < element.length; i++) {
                    fenElement.push(pai2[z][i]);
                }


                var fenElement2 = [];
                for (var k = 0; k < (indice); k++) {
                    fenElement2.push(pai2[z][k]);
                    // fenElement2.push(par[1].genotipo[k]);
                }
                k = indice;
                for (k; k < element.length; k++) {
                    fenElement2.push(element[k]);
                }

                filho1.push(fenElement);
                filho2.push(fenElement2);

            } else {
                filho1.push(element)
                filho2.push(pai2[z]);

            }
            sorteio = Math.random();
            z++
        });

        var FenotiposFilho1 = [];
        var FenotiposFilho2 = [];

        filho1.forEach(element => {
            FenotiposFilho1.push(helpers.calculaFenotipo(par[0].nBits, element));
        });

        filho2.forEach(element => {
            FenotiposFilho2.push(helpers.calculaFenotipo(par[0].nBits, element));
        });
        var Individuo1 = new IndividuoMulti(FenotiposFilho1);
        Individuo1.calculaGenotipo();
        var Individuo2 = new IndividuoMulti(FenotiposFilho2);
        Individuo2.calculaGenotipo();

        return [Individuo1, Individuo2];

    },

    selecionaPares(individuos) {
        var naoPareados = individuos.vencedores;
        var indiceSorteado = Math.floor(Math.random() * (naoPareados.length - 1));
        var selecionados = [];
        var k = 0;
        while (naoPareados.length > 0) {
            selecionados[k] = [];
            selecionados[k].push(naoPareados[indiceSorteado]);
            naoPareados.splice(indiceSorteado, 1);
            indiceSorteado = Math.floor(Math.random() * (naoPareados.length - 1));
            selecionados[k].push(naoPareados[indiceSorteado]);
            naoPareados.splice(indiceSorteado, 1);

            k++;
        }
        return selecionados;
    },

    mutation(individuo, rateOfMutation) {
        var sorteio;
        var newGenotipo = individuo.genotipo;
        var newGen = [];

        newGenotipo.forEach(element => {
            newGen = element;
            for (var i = 0; i < newGen.length; i++) {
                sorteio = Math.random();
                if (sorteio > rateOfMutation) {
                    if (newGen[i] == 1) {
                        newGen[i] = 0;
                    } else if (newGen[i] == 0) {
                        newGen[i] = 1;
                    }
                }
            }


        });
        var Fenotipos = [];
        newGenotipo.forEach(element => {
            Fenotipos.push(helpers.calculaFenotipo(individuo.nBits, element));
        });
        var individuoMutado = new IndividuoMulti(Fenotipos);
        individuoMutado.calculaGenotipo();


        return individuoMutado;
    }
}