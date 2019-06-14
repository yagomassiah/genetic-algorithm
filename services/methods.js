
const helpers = require('../helpers/helpers');
const { Individuo } = require('./individuo');
module.exports = {

    fitness(a) {
        var y = a * a;

        var fitness = y / 31;

        return fitness;
    },

    torneio(populacao, numVencedores, k) {

        /* populacao.sort(function (a, b) {
            return a.fitness - b.fitness
        }); */

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
        var sorteio = Math.random() ;
       // sorteio = 0.8;
        if (sorteio >= chanceDeCross) {
        
            var tamanho = par[0].genotipo.length;
            var indice = Math.floor(Math.random() * tamanho);
            console.log(indice);
            // var indice = 4;
            /* var filho1 = par[0].genotipo.slice(0,indice);
            
            filho1.concat(par[1].genotipo.slice(indice, tamanho+1));
 */

            var filho1= [];
            for(var i =0; i<(indice); i++){
                filho1.push(par[0].genotipo[i]);
            }
            i = indice;
            for(i; i< par[0].genotipo.length; i++)
            {
                filho1.push(par[1].genotipo[i]);
            }


            var filho2= [];
            for(var k =0; k<(indice); k++){
                filho2.push(par[1].genotipo[k]);
            }
            k = indice;
            for(k; k< par[0].genotipo.length; k++)
            {
                filho2.push(par[0].genotipo[k]);
            }


            var individuo1= new Individuo(helpers.calculaFenotipo(par[0].nBits, filho1));
            var individuo2= new Individuo(helpers.calculaFenotipo(par[0].nBits, filho2));
            var obj = {
                pais: [par[0], par[1]],
                filhos: [individuo1, individuo2],
                indice: indice
            }
            return obj;

        }else{
            return par;
        }


        return false;
    }
}