module.exports = {

    fitness(a) {
        var y = a * a;

        var fitness = y / 31;

        return fitness;
    },

    selecao(populacao) {

        populacao.sort(function (a, b) {
            return a.fitness - b.fitness
        });

        

    }

}