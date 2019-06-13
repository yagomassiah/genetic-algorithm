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
            while ( competidores.length < k) {
                competidores.push(populacao[Math.floor(Math.random() * populacao.length)]);
            }
            var res = Math.max.apply(Math,competidores.map(function(o){return o.fitness;}))
            var vencedor = competidores.find(function(o){ return o.fitness == res; })
            
            selecionados.push(vencedor);
            competidores = [];
        }

        var ret = {
            vencedores: selecionados
        };
        return ret;


    }

}