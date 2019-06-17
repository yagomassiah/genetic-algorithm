const express = require('express');
const test = require('./services/testServices');
const app = express();
const { Individuo } = require('./services/individuo');
const { IndividuoMulti } = require('./services/IndividuoMulti');
const geneticMethods = require('./services/methods');
const multiGeneticMethods = require('./services/methodosMulti');
const helpers = require('./helpers/helpers');


app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/geneticalgorithm/', async (req, res) => {
    //var ret = await test.funcAnotherTest();
    var populacao = [];
    var arrr = Array.from({ length: 4 }, () => Math.floor(Math.random() * 31));

    arrr.forEach(async (element) => {
        populacao.push(new Individuo(Math.floor(Math.random() * 31)));

    });

    populacao.forEach(async (element) => {
        element.fitnessCalc();
        element.calculaGenotipo();
    });


    var populacaoInicial = []

    populacao.sort(function (a, b) {
        return a.fitness - b.fitness
    });
    populacao.forEach(element => {
        populacaoInicial.push(helpers.clone(element));
    });

    // -------------------------------------------------------

    populacao = populacao.sort(function (a, b) {
        return a.fitness - b.fitness
    });


    for (var i = 0; i < 20; i++) {
        populacao = populacao.sort(function (a, b) {
            return a.fitness - b.fitness
        });
        var elite = populacao[populacao.length - 1];


        var selecionados = geneticMethods.torneio(populacao, 4, 2);
        var pares = geneticMethods.selecionaPares(selecionados);
        var par;
        selecionados = [];
        pares.forEach(element => {
            par = geneticMethods.crossover(element, 0.80);
            selecionados.push(par[0]);
            selecionados.push(par[1]);
        });
        var mutados = [];
        selecionados.forEach(element => {
            mutados.push(geneticMethods.mutation(element, 0.70));
        });

        mutados.forEach(element => {
            element.fitnessCalc();
        });

        mutados = mutados.sort(function (a, b) {
            return a.fitness - b.fitness
        });

        if (mutados[0].fitness < elite.fitness) {
            mutados[mutados.length - 1] = elite;
            mutados[mutados.length - 1].calculaGenotipo();
            mutados[mutados.length - 1].fitnessCalc();
        }

        populacao = mutados;

    }
    var ret = {

        inicio: populacaoInicial,
        resultados: populacao,

    }
    res.send(ret);


});


app.post('/algoritmogenetico/', async (req, res) => {
    //var ret = await test.funcAnotherTest();

    var t0 = new Date().getTime();

    //var ret = req.body;
    var individuo = new Individuo(57);
    var dataset = req.body.parametros;
    individuo.fitnessCalc(dataset);
    individuo.calculaGenotipo();
    console.log(individuo.fitness);
    console.log(req.body.parametros.int[0]);
    var resultadosFinais = [];
    //console.log(req);
    var populacao = [];
    for (var k = 0; k < 100; k++) {

        populacao = [];
        var arrr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 255));

        arrr.forEach(async (element) => {
            populacao.push(new Individuo(element));

        });

        populacao.forEach(async (element) => {
            element.fitnessCalc(dataset);
            element.calculaGenotipo();
        });

        populacao.sort(function (a, b) {
            return a.fitness - b.fitness
        });

        // -------------------------------------------------------

        for (var i = 0; i < 10; i++) {
            populacao = populacao.sort(function (a, b) {
                return a.fitness - b.fitness
            });
            var elite = populacao[populacao.length - 1];


            var selecionados = geneticMethods.torneio(populacao, 6, 2);
            var pares = geneticMethods.selecionaPares(selecionados);
            var par;
            selecionados = [];
            pares.forEach(element => {
                par = geneticMethods.crossover(element, 0.30);
                selecionados.push(par[0]);
                selecionados.push(par[1]);
            });
            var mutados = [];
            selecionados.forEach(element => {
                mutados.push(geneticMethods.mutation(element, 0.95));
            });

            mutados.forEach(element => {
                element.fitnessCalc(dataset);
            });

            mutados = mutados.sort(function (a, b) {
                return a.fitness - b.fitness
            });

            if (mutados[0].fitness < elite.fitness) {
                mutados[mutados.length - 1] = elite;
                mutados[mutados.length - 1].calculaGenotipo();
                mutados[mutados.length - 1].fitnessCalc(dataset);
            }

            populacao = mutados;

        }

        populacao.forEach(element => {
            resultadosFinais.push(element)
        });



    }

    var ret = {
        resultados: resultadosFinais
    };
    var t1 = new Date().getTime();
    console.log("Done! Feito em" + (t0 - t1) / 1000 + " segundos");
    res.send(ret);


});

app.post('/indiMult/', async (req, res) => {
    console.log(req.body);
    var dataset = req.body.dataset;
    var a = new IndividuoMulti([5, 4, 2]);
    a.calculaGenotipo();

    var b = new IndividuoMulti([16, 8, 4]);
    b.calculaGenotipo();

    // var parCross = multiGeneticMethods.crossover([a,b], 0.2);

    var mutado = multiGeneticMethods.mutation(a, 0.5);
    a.fitnessCalc(dataset);
    res.send(mutado);

});

app.post('/gaMulti/', async (req, res) => {
    var t0 = new Date().getTime();
    var dataset = req.body.dataset;
    var a = new IndividuoMulti([5, 4, 2]);
    a.calculaGenotipo();

    var resultadosFinais = [];
    //console.log(req);
    var populacao = [];
    for (var k = 0; k < 100; k++) {
        //    var a; 
        populacao = [];
        for (let i = 0; i < 6; i++) {
            arr = Array.from({ length: 3 }, () => Math.floor(Math.random() * 255));
            populacao.push(new IndividuoMulti(arr));
            populacao[i].calculaGenotipo();
            populacao[i].fitnessCalc(dataset);
        }


        for (var i = 0; i < 10; i++) {
            populacao = populacao.sort(function (a, b) {
                return a.fitness - b.fitness
            });
            var elite = populacao[populacao.length - 1];


            var selecionados = multiGeneticMethods.torneio(populacao, 6, 2);
            var pares = multiGeneticMethods.selecionaPares(selecionados);
            var par;
            selecionados = [];
            pares.forEach(element => {
                par = multiGeneticMethods.crossover(element, 0.30);
                selecionados.push(par[0]);
                selecionados.push(par[1]);
            });
            var mutados = [];
            selecionados.forEach(element => {
                mutados.push(multiGeneticMethods.mutation(element, 0.95));
            });

            mutados.forEach(element => {
                element.fitnessCalc(dataset);
            });

            mutados = mutados.sort(function (a, b) {
                return a.fitness - b.fitness
            });

            if (mutados[0].fitness < elite.fitness) {
                mutados[mutados.length - 1] = elite;
                mutados[mutados.length - 1].calculaGenotipo();
                mutados[mutados.length - 1].fitnessCalc(dataset);
            }

            populacao = mutados;

        }

        populacao.forEach(element => {
            resultadosFinais.push(element);
        });

    }
    var t1 = new Date().getTime();
    console.log("Done! Feito em " + (t1 - t0) / 1000 + " segundos");
    res.send(populacao);

});



app.listen(3000, () => console.log('listening on port 3000'));