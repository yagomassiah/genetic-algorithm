const express = require('express');
const test = require('./services/testServices');
const app = express();
const { Individuo } = require('./services/individuo');
const geneticMethods = require('./services/methods');
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
var arrr = Array.from({ length: 4 }, () => Math.floor(Math.random() * 31));
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


app.listen(3000, () => console.log('listening on port 3000'));