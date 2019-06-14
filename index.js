const express = require('express');
const test = require('./services/testServices');
const app = express();
const { Individuo } = require('./services/individuo');
const geneticMethods = require('./services/methods');
const helpers = require('./helpers/helpers');
var a = new Individuo(20);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



a.calculaGenotipo();
a.fitnessCalc();
//a.fitnessCalc();
console.log(a);
var populacao = [];
var arrr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 31));
console.log(arrr);

arrr.forEach(async (element) => {
    //populacao.push(Math.floor(Math.random()*31));
    populacao.push(new Individuo(Math.floor(Math.random() * 31)));

});

populacao.forEach(async (element) => {
    element.fitnessCalc();
    element.calculaGenotipo();
})

populacao.sort(function (a, b) {
    return a.fitness - b.fitness
});
console.log(populacao);




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
    var ret= geneticMethods.crossover(par, 0.8);
    
    
    res.send(ret);


});

app.get('/testesoma/', async (req, res) => {
    //var ret = await test.funcAnotherTest();
    var a = new Individuo(3);
    a.fitnessCalc();
    a.calculaGenotipo();

    var calculado = helpers.calculaFenotipo(a.nBits,a.genotipo);
    var ret = {
        individuo: a,
        calculado: calculado
    };

    res.send(ret);


});


app.get('/geneticalgorithm/', async (req, res) => {
    //var ret = await test.funcAnotherTest();
    
    var selecionados =geneticMethods.torneio(populacao, 4, 2);

    
    res.send(ret);


});


app.listen(3000, () => console.log('listening on port 3000'));