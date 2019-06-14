const express = require('express');
const test = require('./services/testServices');
const app = express();
const { Individuo } = require('./services/individuo');
const geneticMethods = require('./services/methods');
const helpers = require('./helpers/helpers');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




//a.fitnessCalc();
/* console.log(a);
var populacao = [];
var arrr = Array.from({ length: 4 }, () => Math.floor(Math.random() * 31));
console.log(arrr);

arrr.forEach(async (element) => {
    //populacao.push(Math.floor(Math.random()*31));
    populacao.push(new Individuo(Math.floor(Math.random() * 31)));

});

populacao.forEach(async (element) => {
    element.fitnessCalc();
    element.calculaGenotipo();
}) */

/* populacao.sort(function (a, b) {
    return a.fitness - b.fitness
});
console.log(populacao);

 */


app.get('/apigenetica/', async (req, res) => {
    //var ret = await test.funcAnotherTest();
    var a = new Individuo(8, 3);
    console.log(a.genotipo);

    res.send(geneticMethods.torneio(populacao, 4, 2));


});

app.get('/teste/', async (req, res) => {
    //var ret = await test.funcAnotherTest();
    var a = new Individuo(22);
    a.calculaGenotipo();
    a.fitnessCalc();

    var b = new Individuo(4);
    b.calculaGenotipo();
    b.fitnessCalc();

    var par = [a, b];
    var ret = geneticMethods.crossover(par, 0.8);


    res.send(ret);


});

app.get('/testesoma/', async (req, res) => {
    //var ret = await test.funcAnotherTest();
  /*   var a = new Individuo(req.query.a);
    a.fitnessCalc();
    a.calculaGenotipo();
 */

    
    var calculado = helpers.calculaFenotipo(5, [1,1,1,1,1]);
    /* var ret = {
        individuo: a,
        calculado: calculado
    }; */
    var obj = {
        calculado:calculado
    }
    res.send(obj);


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

    populacao.sort(function (a, b) {
        return a.fitness - b.fitness
    });

    var populacaoInicial = populacao;
    // -------------------------------------------------------

    populacao = populacao.sort(function (a, b) {
        return a.fitness - b.fitness
    });


    for (var i = 0; i < 10; i++) {
        populacao = populacao.sort(function (a, b) {
            return a.fitness - b.fitness
        });
        var elite = populacao[populacao.length - 1];


        var selecionados = geneticMethods.torneio(populacao, 4, 2);
        var pares = geneticMethods.selecionaPares(selecionados);
        var par;
        selecionados = [];
        pares.forEach(element => {
            par = geneticMethods.crossover(element, 0.7);
            selecionados.push(par[0]);
            selecionados.push(par[1]);
        });
        var mutados = [];
        selecionados.forEach(element => {
            mutados.push(geneticMethods.mutation(element, 0.89));
        });

        mutados.forEach(element => {
            element.fitnessCalc();
        });

        mutados = mutados.sort(function (a, b) {
            return a.fitness - b.fitness
        });

        if(mutados[0].fitness < elite.fitness){
            mutados[mutados.length-1] = elite;
            mutados[mutados.length-1].calculaGenotipo();
            mutados[mutados.length-1].fitnessCalc();
        }

        populacao = mutados;
        
    }
    var ret = {
        inicio : populacaoInicial,
        resultados: populacao,
        
    }
    res.send(ret);


});

app.get('/testamutacao/', async (req, res) => {
    //var ret = await test.funcAnotherTest();

    var individuo = new Individuo(17);
    individuo.calculaGenotipo();

    individuo = geneticMethods.mutation(individuo, 0.50);



    res.send(individuo);


});

app.get('/testasort/', async (req, res) => {
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

    populacao.sort(function (a, b) {
        return a.fitness - b.fitness
    });

    res.send(populacao);


});


app.listen(3000, () => console.log('listening on port 3000'));